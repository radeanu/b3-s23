async function main() {
	const { getSettings } = useSettings();
	const settings = await getSettings();

	const map = useMap(settings.rows, settings.cols);
	map.draw();

	const kents = await map.pickKents();

	const game = useGame(settings.rows, settings.cols);

	game.setKents(kents);
	game.run();
}

document.addEventListener('DOMContentLoaded', main);
