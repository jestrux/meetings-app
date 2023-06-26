import { useState } from "react";
import AppLayout from "./AppLayout";
import Dashboard from "./pages/Dashboard";
import NewMeeting from "./pages/NewMeeting";

const App = () => {
	const [currentPage, setCurrentPage] = useState("New Meeting");

	return (
		<AppLayout
			currentPage={currentPage}
			onChangePage={setCurrentPage}
			style={{
				minHeight: "100vh",
			}}
		>
			{currentPage}
			{currentPage == "Dashboard" && <Dashboard />}
			{currentPage == "New Meeting" && <NewMeeting />}
		</AppLayout>
	);
};

export default App;
