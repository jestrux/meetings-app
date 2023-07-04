import { get, post, remove } from "./request";

export const fetchMeetingFiles = (meetingId) => {
	return get("/api/MeetingFile" + meetingId ? `?whereMeeting=${meetingId}` : "");
};

export const addMeetingFile = (payload) => {
	return post("/api/MeetingFile", payload);
};

export const deleteMeetingFile = (memberId) => {
	return remove(`/api/MeetingFile/${memberId}`);
};
