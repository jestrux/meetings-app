import { useRef, useState } from "react";
import * as Airtable from "airtable";
import { useMutation, useQuery } from "@tanstack/react-query";
import airtableFilter from "./airtable-filter";

const randomId = () => Math.random().toString(36).slice(2);
const API_KEY = "key7rYj7BDKm9wwS2";
const DB_ID = "app86cU3NYXNZOvcA";
const db = new Airtable({ apiKey: API_KEY }).base(DB_ID);

window.DEV_MODE = false;

export class AirtableService {
	records = [];

	constructor({ table, appContext } = {}) {
		this.table = table;
		this.appContext = appContext;
		this.cacheKey = "CROTCHET_CACHE_" + table;
	}

	set __cachedData(value) {
		if (!window.DEV_MODE) return;
		localStorage[this.cacheKey] = JSON.stringify([value, Date.now()]);
	}

	get __cachedData() {
		if (!window.DEV_MODE) return null;

		// Localstorage fails in incognito mode
		try {
			const [records, lastCacheTime] = JSON.parse(
				localStorage[this.cacheKey] || "[]"
			);
			if (records?.length && lastCacheTime?.toString().length) {
				const cacheAge =
					(Date.now() - new Date(lastCacheTime)) / 1000 / 60;
				if (cacheAge > 10) localStorage.removeItem(this.cacheKey);

				return records;
			}
		} catch (error) {}

		return null;
	}

	all() {
		return this.records;
	}

	filterByType(typeFilter) {
		if (!typeFilter?.length) return this.records;

		return this.records.filter(({ Type }) => typeFilter == Type);
	}

	async fetch({ filters, orderBy } = {}) {
		// console.log(`Fetching data for ${this.table}...`);

		return new Promise((resolve, reject) => {
			// Basic caching to prevent rate limiting from Airtable
			// during development

			try {
				const cachedRecords = this.__cachedData;
				if (cachedRecords?.length) {
					resolve(cachedRecords);
					return;
				}

				db(this.table)
					.select({
						...(!orderBy.length
							? {}
							: {
									sort: orderBy
										.split(",")
										.reduce((agg, entry) => {
											const [field, direction] =
												entry.split("|");
											return [
												...agg,
												{ field, direction },
											];
										}, []),
							  }),
						filterByFormula: airtableFilter({
							filters,
							appContext: this.appContext,
						}),
					})
					.firstPage((err, records) => {
						if (err) {
							console.error(
								`Error etching data for ${this.table}...`,
								err
							);
							reject(err);
							return;
						}

						records = records
							.map((record) => {
								const fields = record?.fields || record;
								return {
									...fields,
									_rowId: record.id,
								};
							})
							.map((entry) => {
								return Object.entries(entry).reduce(
									(agg, [key, value]) => {
										if (
											value &&
											Array.isArray(value) &&
											value.length === 1 &&
											(key.indexOf("_") !== -1 ||
												value[0].indexOf("recd") === 0)
										)
											value = value[0];

										return {
											...agg,
											[key]: value,
										};
									},
									{}
								);
							});

						this.__cachedData = JSON.stringify([
							records,
							Date.now(),
						]);
						resolve(records);
					});
			} catch (error) {
				reject(error);
			}
		});
	}

	async create(payload) {
		const url = `https://api.airtable.com/v0/appnobMFeViOdmZsV/${this.table}?api_key=${API_KEY}`;
		const body = JSON.stringify({
			records: [
				{
					fields: {
						...payload,
						created_at: Date.now(),
						updated_at: Date.now(),
					},
				},
			],
		});
		// console.log(this.table, url, body);

		const res = await fetch(url, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body,
		});
		return await res.json();
	}

	async update(rowId, payload) {
		const url = `https://api.airtable.com/v0/appnobMFeViOdmZsV/${this.table}/${rowId}?api_key=${API_KEY}`;
		const body = JSON.stringify({
			fields: {
				...payload,
				updated_at: Date.now(),
			},
		});
		// console.log(this.table, url, body);

		const res = await fetch(url, {
			method: "PATCH",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body,
		});
		return await res.json();
	}

	async delete(rowId) {
		const url = `https://api.airtable.com/v0/appnobMFeViOdmZsV/${this.table}/${rowId}?api_key=${API_KEY}`;
		// console.log(this.table, url, body);

		const res = await fetch(url, {
			method: "DELETE",
		});
		return await res.json();
	}
}

const processAirtableData = ({ data = [], limit = 500, first }) => {
	if (first) return data.length ? data[0] : null;
	return data.slice(0, limit);
};

export function useAirtableFetch({
	table,
	cacheKey,
	refetchOnWindowFocus = false,
	filters,
	orderBy = "created_at|asc",
	limit,
	first,
	onSuccess = () => {},
	onError = () => {},
}) {
	const [props, setProps] = useState({
		cacheKey,
		refetchOnWindowFocus,
		filters,
		orderBy,
		limit,
		first,
		onSuccess,
		onError,
	});
	const successResolver = useRef(() => {});
	const cacher = useRef(randomId());
	const instance = useRef(new AirtableService({ table }));
	const query = useQuery(
		[cacher.current],
		async () => {
			let res;
			try {
				res = await instance.current.fetch({
					filters,
					orderBy,
				});
			} catch (error) {
				console.log("Fetch error: ", error);
			}

			return res;
		},
		{
			refetchOnWindowFocus: props.refetchOnWindowFocus,
			onSuccess: (data) => {
				const res = processAirtableData({
					data,
					...props,
				});

				props.onSuccess(res);
				successResolver.current(res);
			},
			onError,
		}
	);

	const data = processAirtableData({
		data: query.data,
		...props,
	});

	const refetch = (newProps) => {
		setProps({ ...props, ...newProps });
		query.refetch();

		return new Promise((resolve) => (successResolver.current = resolve));
	};

	return {
		...query,
		data,
		processing: query.isLoading || query.isRefetching,
		refetch,
	};
}

export function useDelayedAirtableFetch({
	table,
	onSuccess = () => {},
	onError = () => {},
}) {
	const successResolver = useRef(() => {});
	const errorResolver = useRef(() => {});
	const instance = useRef(new AirtableService({ table }));
	const query = useMutation({
		mutationFn: async ({
			filters,
			orderBy = "created_at|asc",
			...props
		}) => {
			const data = await instance.current.fetch({ filters, orderBy });
			return {
				data,
				...props,
			};
		},
		onSuccess: ({ data, ...props }) => {
			const res = processAirtableData({
				data,
				...props,
			});

			onSuccess(res);
			successResolver.current(res);
		},
		onError: (...params) => {
			onError(...params);
			errorResolver.current(...params);
		},
	});

	const fetch = (payload = {}) => {
		const promise = new Promise((res, rej) => {
			successResolver.current = res;
			errorResolver.current = rej;
		});

		query.mutate(payload);

		return promise;
	};

	return {
		// ...query,
		processing: query.isLoading,
		fetch,
	};
}

export function useAirtableMutation({
	table,
	action = "update",
	onSuccess = () => {},
	onError = () => {},
}) {
	const successResolver = useRef(() => {});
	const errorResolver = useRef(() => {});
	const instance = useRef(new AirtableService({ table }));
	const query = useMutation({
		mutationFn: (data) => {
			const { rowId, ...payload } = data;

			if (action === "update")
				return instance.current.update(rowId, payload);

			if (action === "delete") return instance.current.delete(data);

			return instance.current.create(payload);
		},
		onSuccess: (data) => {
			onSuccess(data);
			successResolver.current(data);
		},
		onError: (...params) => {
			onError(...params);
			errorResolver.current(...params);
		},
	});

	return {
		...query,
		processing: query.isLoading,
	};
}
