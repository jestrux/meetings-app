import { useState } from "react";

function getAttendees() {}

function saveAttendees() {}

function App() {
	const [hideText, setHideText] = useState(false);
	const [attendees, setAttendees] = useState();

	const hideSecond = () => {};

	const clearAttendees = () => {};

	const preFillAttendees = () => {};

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
					<button>Remove second attendee</button>

					{attendees.length > 0 ? (
						<button>Clear attendees</button>
					) : (
						<button>Prefill attendees</button>
					)}
				</div>
			</div>
		</main>
	);
}

export default App;
