async function newGame() {
	const { getSettings } = useSettings();
	const settings = await getSettings();
	console.log(settings);
}

function useStartBtn() {
	const nodeEl = getNodeBySelector();
}

async function main() {
	await newGame();
	// const { getSettings } = useSettings();
	// const settings = await getSettings();
	// const map = useMap(settings.rows, settings.cols);
	// map.draw();
	// const game = useGame();
	// game.setSize(settings.rows, settings.cols);
	// let kents = await map.pickKents();
	// function renderNewGeneration(kentsList) {
	// 	const newKents = game.getNewGeneration(kentsList);
	// 	newKents.forEach((nr) => map.drawKent(nr, true));
	// 	kentsList.forEach((nr) => {
	// 		if (newKents.includes(nr)) return;
	// 		return map.drawKent(nr, false);
	// 	});
	// 	return newKents;
	// }
	// document.addEventListener('keydown', (ev) => {
	// 	ev.preventDefault();
	// 	if (ev.code !== 'ArrowRight') return;
	// 	kents = renderNewGeneration(kents);
	// });
}

document.addEventListener('DOMContentLoaded', main);
