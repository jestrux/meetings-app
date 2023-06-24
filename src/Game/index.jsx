import * as emojis from "./emojis";
import "./Game.css";

const Game = () => {
	return (
		<div className="rounded shadow bg-white p-2 gap-3 grid grid-cols-3 border-2 border-purple-500 w-[500px]">
			<button
				className="game-card relative aspect-square border border-neutral-500 p-7 rounded flex items-center justify-center"
				onClick={(e) => e.target.classList.toggle("flipped")}
			>
				<img src={emojis.airplane} alt="" />
			</button>
			<button
				className="game-card aspect-square border border-neutral-500 p-7 rounded flex items-center justify-center"
				onClick={(e) => e.target.classList.toggle("flipped")}
			>
				<img src={emojis.basketball} alt="" />
			</button>
			<button
				className="game-card aspect-square border border-neutral-500 p-7 rounded flex items-center justify-center"
				onClick={(e) => e.target.classList.toggle("flipped")}
			>
				<img src={emojis.airplane} alt="" />
			</button>
			<button
				className="game-card aspect-square border border-neutral-500 p-7 rounded flex items-center justify-center"
				onClick={(e) => e.target.classList.toggle("flipped")}
			>
				<img src={emojis.burger} alt="" />
			</button>
			<button
				className="game-card aspect-square border border-neutral-500 p-7 rounded flex items-center justify-center"
				onClick={(e) => e.target.classList.toggle("flipped")}
			>
				<img src={emojis.airplane} alt="" />
			</button>
			<button
				className="game-card aspect-square border border-neutral-500 p-7 rounded flex items-center justify-center"
				onClick={(e) => e.target.classList.toggle("flipped")}
			>
				<img src={emojis.burger} alt="" />
			</button>
			<button
				className="game-card aspect-square border border-neutral-500 p-7 rounded flex items-center justify-center"
				onClick={(e) => e.target.classList.toggle("flipped")}
			>
				<img src={emojis.basketball} alt="" />
			</button>
			<button
				className="game-card aspect-square border border-neutral-500 p-7 rounded flex items-center justify-center"
				onClick={(e) => e.target.classList.toggle("flipped")}
			>
				<img src={emojis.burger} alt="" />
			</button>
			<button
				className="game-card aspect-square border border-neutral-500 p-7 rounded flex items-center justify-center"
				onClick={(e) => e.target.classList.toggle("flipped")}
			>
				<img src={emojis.basketball} alt="" />
			</button>
		</div>
	);
};

export default Game;
