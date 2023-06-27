import { useAirtableMutation, useDelayedAirtableFetch } from "./airtable";

const useAPI = (endpoint) => {
	const login = useDelayedAirtableFetch({
		table: "users",
	});

	const meetings = useDelayedAirtableFetch({
		table: "meetings",
	});

	const addMeeting = useAirtableMutation({
		table: "meetings",
		action: "add",
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
		"/meetings": [
			async function () {
				let res = await meetings.fetch({});
				return res.map(
					({
						attendee_ids,
						attendee_names,
						attendee_avatars,
						creator_id,
						creator_name,
						creator_avatar,
						...m
					}) => {
						return {
							...m,
							creator: !creator_id
								? null
								: {
										id: creator_id[0],
										avatar: creator_avatar[0],
										name: creator_name[0],
								  },
							attendees: !attendee_ids
								? []
								: attendee_ids.map((id, index) => {
										return {
											id,
											avatar: attendee_avatars[index],
											name: attendee_names[index],
										};
								  }),
						};
					}
				);
			},
			{
				loading: meetings.processing,
			},
		],
		"/add-meeting": [
			addMeeting.mutate,
			{
				loading: addMeeting.processing,
			},
		],
	};

	return endpoints[endpoint];
};

export default useAPI;
