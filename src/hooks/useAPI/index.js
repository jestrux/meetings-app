import { useDelayedAirtableFetch } from "./airtable";

const useAPI = () => {
	const login = useDelayedAirtableFetch({
		table: "users",
	});

	const users = useDelayedAirtableFetch({
		table: "users",
	});

	return {
		login: (payload) =>
			login.fetch({
				filters: payload,
				first: true,
			}),
		getUsers: () => users.fetch({}),
	};
};

export default useAPI;
