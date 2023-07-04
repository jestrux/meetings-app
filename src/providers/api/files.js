import { get, post, remove } from "./request";

export const fetchMeetingFiles = (meetingId) => {
	console.log("meetingId---",meetingId)
	return get("/api/MeetingFile");
};

export const addMeetingFile = (payload) => {
	return post("/api/MeetingFile", payload);
};

export const deleteMeetingFile = (memberId) => {
	return remove(`/api/MeetingFile/${memberId}`);
};
