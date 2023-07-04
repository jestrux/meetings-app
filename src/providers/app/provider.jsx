import { useState } from "react";
import { AppContext } from "./index";

export default function AppProvider({ children }) {
	const [pageTitle, setPageTitle] = useState("");
	const [backUrl, setBackUrl] = useState("");

	const appContextValues = {
		pageTitle,
		setPageTitle,
		backUrl,
		setBackUrl,
	};

	return (
		<AppContext.Provider value={appContextValues}>
			{children}
		</AppContext.Provider>
	);
}
