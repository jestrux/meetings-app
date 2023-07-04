import { get, post, remove } from "./request";

export const fetchMeetingActions = (meetingId) => {
	return get("/api/MeetingAction" + meetingId ? `?whereMeeting=${meetingId}` : "");
};

export const addMeetingAction = (payload) => {
	return post("/api/MeetingAction", payload);
};

export const deleteMeetingAction = (memberId) => {
	return remove(`/api/MeetingAction/${memberId}`);
};
