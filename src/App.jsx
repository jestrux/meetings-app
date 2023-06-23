import { useEffect, useState } from "react";
import loader from "./assets/loader.gif";

const someTime = (duration = 2000) => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve();
		}, duration);
	});
};

async function getAttendees() {
	await someTime();
	return JSON.parse(localStorage.getItem("attendees") ?? "[]");
}

function saveAttendees(value) {
	localStorage.setItem("attendees", JSON.stringify(value));
}

function App() {
	const [loading, setLoading] = useState(true);
	const [attendees, setAttendees] = useState([]);

	useEffect(() => {
		fetchAttendees();
	}, []);

	const fetchAttendees = async () => {
		const res = await getAttendees();
		setAttendees(res);
		setLoading(false);
	};

	const persistAttendees = (attendees) => {
		setAttendees(attendees);
		saveAttendees(attendees);
	};

	const hideSecond = () => {
		persistAttendees(attendees.filter((_, index) => index != 1));
	};

	const clearAttendees = () => persistAttendees([]);

	const preFillAttendees = () =>
		persistAttendees(["Daniel", "Chaba", "Debora"]);

	return (
		<main className="">
			<div className="mt-5">
				<h3>Meeting attendees</h3>

				{loading && <img width="90px" src={loader} />}

				<ul>
					{attendees.map((name, index) => {
						return <li key={index}>{name}</li>;
					})}
				</ul>

				<div className="mt-4">
					{attendees.length > 1 && (
						<button onClick={hideSecond}>
							Remove second attendee
						</button>
					)}

					{attendees.length > 0 ? (
						<button onClick={clearAttendees}>
							Clear attendees
						</button>
					) : (
						<button onClick={preFillAttendees}>
							Prefill attendees
						</button>
					)}
				</div>
			</div>
		</main>
	);
}

export default App;
