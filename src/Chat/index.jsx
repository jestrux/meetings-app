import { useState } from "react";
import "./chat.css";

const getChat = () => {
	return [
		{
			sent: false,
			content: "Ahem...ignoring what you said there👋",
		},
		{
			sent: true,
			content: "What did I say?🤔",
		},
		{
			sent: false,
			content: "Kwani we huoni?",
		},
		{
			sent: false,
			content: "The last text you sent me?",
		},
		{
			sent: true,
			content: "Oh that? Grow up, I was just kidding😅",
		},
		{
			sent: false,
			content: "Utani gani hauna emoji?😂😂",
		},
		{
			sent: true,
			content: "Just get lost weirdo😏",
		},
		{
			sent: true,
			content: "Oh btw, whatever happened to my copy of HP?",
		},
		{
			sent: false,
			content: "Oh I sold that😂😂😂",
		},
		{
			sent: true,
			content: "WTF, it wasn't mine😧",
		},
	];
};

const Chat = () => {
	const [messages, setMessages] = useState(getChat());
	return (
		<div className="d-flex flex-col center-center">
			<div className="flex items-center mb-4">
				<div className="flex items-center">
					Dark mode:
					<button
						id="darkModeButton"
						className="flex toggle-button"
					>
						<span>&nbsp;</span>
					</button>
				</div>

				&emsp;

				<div className="flex items-center">
					Whatsapp:
					<button
						id="darkModeButton"
						className="flex toggle-button"
					>
						<span>&nbsp;</span>
					</button>
				</div>

				&emsp;

				<div className="flex items-center">
					Sent:
					<button
						id="darkModeButton"
						className="flex toggle-button"
					>
						<span>&nbsp;</span>
					</button>
				</div>
			</div>

			<div id="lisimu" className="flex flex-col dark-modes whatsapp">
				<div className="message">
					Ahem...ignoring what you said there👋
				</div>

				<div className="message sent">What did I say?🤔</div>

				<div
					className="position-absolute bg-white w-100 flex flex-col"
					style={{ left: 0, bottom: 0, padding: "0.5rem" }}
				>
					<div>
						<input
							className="form-control"
							type="text"
							placeholder="Enter new message here"
						/>
					</div>

					<div className="flex items-center justify-content-between">
						<button className="emoji-button">😂</button>
						<button className="emoji-button">😡</button>
						<button className="emoji-button">😍</button>
						<button className="emoji-button">🥰</button>
						<button className="emoji-button">🤦‍♂️</button>
						<button className="emoji-button">🙄</button>
						<button className="emoji-button">👋</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Chat;
