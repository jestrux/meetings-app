import {
	createBrowserRouter,
	RouterProvider,
	Route,
	createRoutesFromElements,
	Outlet,
} from "react-router-dom";

import MainApp from "./MainApp";
import Dashboard from "./MainApp/pages/Dashboard";
import Files from "./MainApp/pages/Files";
import Meetings from "./MainApp/pages/Meetings";
import NewMeeting from "./MainApp/pages/Meetings/NewMeeting";
import PendingActions from "./MainApp/pages/PendingActions";

import { useAppContext } from "./providers/app";
import { useEffect } from "react";

function AppPage({ title, element }) {
	const { setPageTitle } = useAppContext();

	useEffect(() => {
		setPageTitle(title);
	}, [title, setPageTitle]);

	return element;
}

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<MainApp />}>
			<Route
				index
				element={<AppPage title="Dashboard" element={<Dashboard />} />}
			/>
			<Route
				path="files"
				element={<AppPage title="Files" element={<Files />} />}
			/>
			<Route
				path="actions"
				element={
					<AppPage
						title="Pending Actions"
						element={<PendingActions />}
					/>
				}
			/>
			<Route path="meetings" element={<Outlet />}>
				<Route
					index
					element={
						<AppPage title="Meetings" element={<Meetings />} />
					}
				/>
				<Route
					path="add"
					element={
						<AppPage title="New Meeting" element={<NewMeeting />} />
					}
				/>
			</Route>
		</Route>
	)
);

export default function AppRouter() {
	return <RouterProvider router={router} />;
}
