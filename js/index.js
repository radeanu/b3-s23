const TIMEOUT = 100;

async function main() {
	let kents = [];
	let isPlaying = false;

	const game = new B3S23Game();
	const mapView = new MapView();
	const settingsView = new SettingsView();
	const controllersView = new ControllersView();

	const settings = await settingsView.getSettings();

	mapView.setSize(settings.rows, settings.cols).draw();
	game.setSize(settings.rows, settings.cols);

	controllersView.enableSpawnMode();
	mapView.enable();

	controllersView.spawnNavView.onRandom(() => {
		mapView.disable();
		mapView.resetSelected();

		const randKents = game.getRandomGeneration();
		randKents.forEach((nr) => mapView.drawKent(nr, true));

		mapView.enable();
	});

	controllersView.spawnNavView.onSubmit(() => {
		kents = mapView.getSelectedKents();

		if (!kents.length) return;

		mapView.disable();
		controllersView.enableGameMode();
	});

	controllersView.gameNavView.onPause(() => {
		isPlaying = false;
	});

	controllersView.gameNavView.onNext(() => {
		playNewGeneration();
	});

	controllersView.gameNavView.onRestart(() => {
		location.reload();
	});

	controllersView.gameNavView.onPlay(() => {
		isPlaying = true;
		playNewGeneration();
	});

	function playNewGeneration() {
		const newKents = game.getNewGeneration(kents);

		if (game.areSameKents(kents, newKents)) {
			isPlaying = false;
			controllersView.gameNavView.reset();
			controllersView.gameNavView.displayMessage('Игра закончено');
			return;
		}

		newKents.forEach((nr) => mapView.drawKent(nr, true));

		kents.forEach((nr) => {
			if (newKents.includes(nr)) return;
			mapView.drawKent(nr, false);
		});

		kents = newKents;

		if (isPlaying) {
			setTimeout(() => {
				requestAnimationFrame(playNewGeneration);
			}, TIMEOUT);
		}
	}
}

document.addEventListener('DOMContentLoaded', main);
