import { useState } from "react";
import AppLayout from "./AppLayout";
import Dashboard from "./pages/Dashboard";
import NewMeeting from "./pages/NewMeeting";

const MainApp = ({ authUser, onLogout }) => {
	const [currentPage, setCurrentPage] = useState("New Meeting");

	return (
		<AppLayout
			currentPage={currentPage}
			onChangePage={setCurrentPage}
			authUser={authUser}
			onLogout={onLogout}
			style={{
				minHeight: "100vh",
			}}
		>
			{currentPage == "Dashboard" && <Dashboard />}
			{currentPage == "New Meeting" && <NewMeeting />}
		</AppLayout>
	);
};

export default MainApp;
