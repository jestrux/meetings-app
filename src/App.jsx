import { useEffect } from "react";
import { fetchMeetings } from "./providers/api";

function App() {
	useEffect(() => {
		loadMeetings();
	}, []);

	const loadMeetings = async () => {
		const res = await fetchMeetings();
		console.log("Res: ", res);
	};

	return null;
}

export default App;
