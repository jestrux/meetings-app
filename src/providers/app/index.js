import { createContext, useContext } from "react";

export const AppContext = createContext({
	pageTitle: "",
	setPageTitle: (newPageTitle) => {
		console.log(newPageTitle);
	},
	backUrl: "",
	setBackUrl: (newBackUrl) => {
		console.log(newBackUrl);
	},
});

export const useAppContext = () => {
	return useContext(AppContext);
};
