import { get } from "./request";

export * from "./meetings";
export * from "./members";
export * from "./files";

export const login = async (payload) => {
	const res = await get(`/api/Member?whereEmail=${payload.email}&limit=1`);

	if (Array.isArray(res)) throw new Error("Invalid email or password");

	return res;
};
