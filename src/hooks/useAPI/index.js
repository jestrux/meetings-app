import { useDelayedAirtableFetch } from "./airtable";

const useAPI = (endpoint) => {
	const login = useDelayedAirtableFetch({
		table: "users",
	});

	const users = useDelayedAirtableFetch({
		table: "users",
	});

	const endpoints = {
		"/login": [
			(payload) =>
				login.fetch({
					filters: payload,
					first: true,
				}),
			{
				loading: login.processing,
			},
		],
		"/getUsers": [
			users.fetch,
			{
				loading: users.processing,
			},
		],
	};

	return endpoints[endpoint];
};

export default useAPI;
