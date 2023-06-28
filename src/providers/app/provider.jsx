import { useState } from "react";
import { AppContext } from "./index";

export default function AppProvider({ children }) {
	const [pageTitle, setPageTitle] = useState("");
	const appContextValues = {
		pageTitle,
		setPageTitle,
	};

	return (
		<AppContext.Provider value={appContextValues}>
			{children}
		</AppContext.Provider>
	);
}
