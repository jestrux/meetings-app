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
		// {
		// 	sent: false,
		// 	content: "Utani gani hauna emoji?😂😂",
		// },
		// {
		// 	sent: true,
		// 	content: "Just get lost weirdo😏",
		// },
		// {
		// 	sent: true,
		// 	content: "Oh btw, whatever happened to my copy of HP?",
		// },
		// {
		// 	sent: false,
		// 	content: "Oh I sold that😂😂😂",
		// },
	];
};

const persistEntry = (key, value) => {
	localStorage.setItem(key, JSON.stringify(value));
};

const getPersistedEntry = (key, defaultValue) => {
	if (localStorage.getItem(key)) return JSON.parse(localStorage.getItem(key));
	return defaultValue;
};

const useLocalStorageState = (key, defaultValue) => {
	const [value, _setValue] = useState(getPersistedEntry(key, defaultValue));

	const setValue = (value) => {
		_setValue(value);
		persistEntry(key, value);
	};

	return [value, setValue];
};

const Chat = () => {
	const [newMessage, setNewMessage] = useState("");
	const [messages, setMessages] = useLocalStorageState("messages", []);
	const [isDarkMode, setisDarkMode] = useLocalStorageState("dark", false);
	const [isWhatsapp, setisWhatsapp] = useLocalStorageState("whatsapp", false);
	const [sent, setSent] = useLocalStorageState("sent", false);
	const quickEmojis = ["😂", "😡", "😍", "🥰", "🤦‍♂️", "🙄", "👋"];

	const updateMessages = (messages) => {
		persistEntry("messages", messages);
		setMessages(messages);
	};

	function toggleInput(label, value, handler) {
		return (
			<div className="flex items-center">
				{label}:
				<button
					id="darkModeButton"
					className={`flex toggle-button ${value && "on"}`}
					onClick={() => handler(!value)}
				>
					<span>&nbsp;</span>
				</button>
			</div>
		);
	}

	const handleAddMessage = (e) => {
		e.preventDefault();

		updateMessages([
			...messages,
			{
				sent,
				content: newMessage,
			},
		]);

		setNewMessage("");
	};

	return (
		<div className="d-flex flex-col center-center">
			<div className="flex items-center mb-4">
				{toggleInput("Dark mode", isDarkMode, setisDarkMode)}
				&emsp;
				{toggleInput("Whatsapp", isWhatsapp, setisWhatsapp)}
				&emsp;
				{toggleInput("Sent", sent, setSent)}
			</div>

			<div id="lisimu" className="flex flex-col">
				{messages.map((message, index) => (
					<div
						className={`message ${message.sent && "sent"}`}
						key={index}
					>
						{message.content}
					</div>
				))}

				<div
					className="position-absolute bg-white w-100 flex flex-col"
					style={{ left: 0, bottom: 0, padding: "0.5rem" }}
				>
					<form onSubmit={handleAddMessage}>
						<input
							className="form-control"
							type="text"
							placeholder="Enter new message here"
							name="newMessage"
							value={newMessage}
							onChange={(e) => setNewMessage(e.target.value)}
						/>
					</form>

					<div className="flex items-center justify-content-between">
						{quickEmojis.map((emoji, index) => (
							<button
								key={index}
								className="emoji-button"
								onClick={() =>
									setNewMessage(newMessage + emoji)
								}
							>
								{emoji}
							</button>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Chat;
