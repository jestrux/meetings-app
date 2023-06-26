import { useState } from "react";
import * as emojis from "./emojis";
import "./Game.css";
import GameButtonCard from "./GameButtonCard";

function shuffle(array) {
	return [...array].sort(() => Math.random() - 0.5);
}

function getRandomTiles() {
	const pictures = shuffle(Object.keys(emojis)).slice(0, 3);
	return shuffle([
		pictures[0],
		pictures[1],
		pictures[2],
		pictures[0],
		pictures[2],
		pictures[1],
		pictures[1],
		pictures[0],
		pictures[2],
	]);
}

const Game = () => {
	const [tiles, setTiles] = useState(getRandomTiles());
	const [flippedPictures, setFlippedPictures] = useState([]);

	const flipTile = (tileIndex, flipped = false) => {
		setFlippedPictures(
			flipped
				? flippedPictures.filter((idx) => idx != tileIndex)
				: [...flippedPictures, tileIndex]
		);
	};

	const handleFlipped = (tileIndex) => {
		flipTile(tileIndex, flippedPictures.includes(tileIndex));
	};

	const flipAll = () => {
		setFlippedPictures([...tiles].map((_, index) => index));
	};

	const hideAll = () => {
		setFlippedPictures([]);
	};

	return (
		<div className="rounded shadow bg-white p-2 gap-3 grid grid-cols-3 border-2 border-purple-500 w-[500px]">
			{tiles.map((tile, index) => (
				<GameButtonCard
					key={index}
					emoji={emojis[tile]}
					flipped={flippedPictures.includes(index)}
					onClick={() => handleFlipped(index)}
				/>
			))}

			<button onClick={flipAll}>Flip All</button>

			<button onClick={hideAll}>Hide All</button>
		</div>
	);
};

export default Game;
