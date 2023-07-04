import { get, post, remove } from "./request";

export const fetchMeetings = () => {
	return get("/meetings");
};

export const fetchMeetingAttendeess = async (meetingId) => {
	const res = await get(`/api/Meeting/${meetingId}`);
	return res?.attendees ? res.attendees : [];
};

export const addMeeting = (payload) => {
	return post("/create-meeting", payload);
};

export const updateMeeting = (meetingId, payload) => {
	return post(`/update-meeting/${meetingId}`, payload);
};

export const deleteMeeting = (meetingId) => {
	return remove(`/api/Meeting/${meetingId}`);
};

export const addMeetingFile = (meetingId, payload) => {
	return post(`/add-meeting-file/${meetingId}`, payload);
};

export const addMeetingAction = (meetingId, payload) => {
	return post(`/add-meeting-file/${meetingId}`, payload);
};
