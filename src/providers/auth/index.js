import { createContext, useContext } from "react";

export const AuthContext = createContext({
	authUser: null,
	login(user) {
		console.log(user);
	},
	logout() {},
});

export const useAuthContext = () => {
	return useContext(AuthContext);
};
