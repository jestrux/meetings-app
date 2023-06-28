import { createContext, useContext } from "react";

export const AppContext = createContext({
	pageTitle: "",
	setPageTitle: (newPageTitle) => {
		console.log(newPageTitle);
	},
});

export const useAppContext = () => {
	return useContext(AppContext);
};
