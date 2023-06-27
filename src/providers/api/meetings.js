import { get, post, remove } from "./request";

export const addMeeting = (payload) => {
	return post("/Meeting", payload);
};

export const fetchMeetings = () => {
	return get("/Meeting");
};

export const deleteMeeting = (meetingId) => {
	return remove(`/Meeting/${meetingId}`);
};
