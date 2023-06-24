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
			sent: true,
			content: "The last text you sent me?",
		},
		// {
		// 	sent: true,
		// 	content: "Oh that? Grow up, I was just kidding😅",
		// },
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
	const [messages, setMessages] = useLocalStorageState(
		"new-messages",
		getChat()
	);
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

			<div id="lisimu" className="flex flex-col justify-content-end">
				<div className="flex flex-col p-3">
					{messages.map((message, index) => (
						<div
							className={`message ${message.sent && "sent"}`}
							key={index}
						>
							{message.content}
						</div>
					))}
				</div>

				<div
					className="position-sticky bg-white w-100 flex flex-col"
					style={{ left: 0, bottom: 0 }}
				>
					<form
						onSubmit={handleAddMessage}
						className="position-relative"
						style={{
							borderTop: "1px solid #eee",
							padding: "0 0.6rem",
						}}
					>
						<button
							type="button"
							className="position-absolute d-inline-flex center-center"
							style={{
								padding: 0,
								top: "9px",
								border: "none",
								background: "transparent",
							}}
						>
							<svg
								width="20"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
								/>
							</svg>
						</button>
						<input
							className="form-control"
							type="text"
							placeholder="Enter new message here..."
							name="newMessage"
							value={newMessage}
							style={{
								borderRadius: 0,
								border: "none",
								paddingLeft: "1.6rem",
							}}
							onChange={(e) => setNewMessage(e.target.value)}
						/>
					</form>

					<div className="flex items-center justify-content-between px-2 pb-1">
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
