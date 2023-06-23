import { useState } from "react";

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
	const [attendees, setAttendees] = useState([]);

	getAttendees().then((res) => setAttendees(res));

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
