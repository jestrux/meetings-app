import { useState } from "react";

function App() {
	const [hideText, setHideText] = useState(false);
	const [attendees, setAttendees] = useState(
		JSON.parse(localStorage.meetingMembers ?? "[]")
	);

	const hideMachaba = () => {
		const newAttendees = attendees.filter((attendee) => {
			return attendee != "Chaba";
		});

		setAttendees(newAttendees);
	};

	const clearAttendees = () => {
		setAttendees([]);
	};

	const preFillAttendees = () => {
		setAttendees(["Chaba", "Effort", "Sharif"]);
	};

	return (
		<main className="">
			<div className="bg-white p-3">
				<p style={{ display: hideText ? "none" : "" }}>Some content</p>

				<button onClick={() => setHideText(!hideText)}>
					Toggle content
				</button>
			</div>

			<div className="mt-5">
				<h3>Meeting attendees</h3>

				<ul>
					{attendees.map((name, index) => {
						return <li key={index}>{name}</li>;
					})}
				</ul>

				<div className="mt-4">
					<button onClick={hideMachaba}>
						Remove second attendee
					</button>

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
