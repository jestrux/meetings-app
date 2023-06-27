import { useState } from "react";
import AppLayout from "./AppLayout";
import Dashboard from "./pages/Dashboard";
import Meetings from "./pages/Meetings";
import PendingActions from "./pages/PendingActions";
import Files from "./pages/Files";

const MainApp = () => {
	const [currentPage, setCurrentPage] = useState("Meetings");

	return (
		<AppLayout
			currentPage={currentPage}
			onChangePage={setCurrentPage}
			style={{
				minHeight: "100vh",
			}}
		>
			{currentPage == "Dashboard" && <Dashboard />}
			{currentPage == "Meetings" && <Meetings />}
			{currentPage == "Pending Actions" && <PendingActions />}
			{currentPage == "Files" && <Files />}
		</AppLayout>
	);
};

export default MainApp;
