const GameButtonCard = ({ emoji, flipped, onClick }) => {
	return (
		<button
			className={`${
				flipped && "flipped"
			} game-card relative aspect-square border border-neutral-500 p-7 rounded flex items-center justify-center`}
			onClick={onClick}
		>
			<img src={emoji} alt="" />
		</button>
	);
};

export default GameButtonCard;
