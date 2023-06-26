import { useState } from "react";
import AppLayout from "./AppLayout";
import Dashboard from "./pages/Dashboard";
import NewMeeting from "./pages/NewMeeting";

const App = () => {
	const [currentPage, setCurrentPage] = useState("Dashboard");
	const handleChangePage = (e) => {
		setCurrentPage(e.key);
	};

	return (
		<AppLayout
			currentPage={currentPage}
			onChangePage={handleChangePage}
			style={{
				minHeight: "100vh",
			}}
		>
			{currentPage == "Dashboard" && <Dashboard />}
			{currentPage == "New Meeting" && <NewMeeting />}
		</AppLayout>
	);
};

export default App;
