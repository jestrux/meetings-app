function ToggleInput({ label, value, onChange }) {
	return (
		<div className="flex items-center">
			{label}:
			<button
				className={`flex toggle-button ${value && "on"}`}
				onClick={() => onChange(!value)}
			>
				<span>&nbsp;</span>
			</button>
		</div>
	);
}

export default ToggleInput;
