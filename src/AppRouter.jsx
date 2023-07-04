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
import AssignedActions from "./MainApp/pages/AssignedActions";

import { useAppContext } from "./providers/app";
import { useEffect } from "react";
import MeetingDetail from "./MainApp/pages/Meetings/MeetingDetail";

function AppPage({ title, backUrl, element }) {
	const { setPageTitle, setBackUrl } = useAppContext();

	useEffect(() => {
		setPageTitle(title ?? "");
	}, [title, setPageTitle]);

	useEffect(() => {
		setBackUrl(backUrl ?? "");
	}, [backUrl, setBackUrl]);

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
						title="Assigned Actions"
						element={<AssignedActions />}
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
						<AppPage
							title="New Meeting"
							backUrl="/meetings"
							element={<NewMeeting />}
						/>
					}
				/>
				<Route
					path=":meetingId"
					element={
						<AppPage
							title=""
							backUrl="/meetings"
							element={<MeetingDetail />}
						/>
					}
				/>
			</Route>
		</Route>
	)
);

export default function AppRouter() {
	return <RouterProvider router={router} />;
}
