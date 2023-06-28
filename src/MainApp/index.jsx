import { useState } from "react";
import AppLayout from "./AppLayout";
import { Outlet } from "react-router-dom";

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
			<Outlet />
		</AppLayout>
	);
};

export default MainApp;
