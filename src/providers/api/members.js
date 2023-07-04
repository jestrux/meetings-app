import { get, post, remove } from "./request";

export const fetchMembers = () => {
	return get("/api/Member");
};

export const addMember = (payload) => {
	return post("/api/Member", payload);
};

export const deleteMember = (memberId) => {
	return remove(`/api/Member/${memberId}`);
};
