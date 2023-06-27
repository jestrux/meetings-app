import { get, post, remove } from "./request";

export const addMember = (payload) => {
	return post("/Member", payload);
};

export const fetchMembers = () => {
	return get("/Member");
};

export const deleteMember = (memberId) => {
	return remove(`/Member/${memberId}`);
};
