const CTRL_SELECTOR = '[data-controllers]';
const CTRL_SUBMIT_SELECTOR = '[data-controllers-submit]';
const CTRL_RANDOM_SELECTOR = '[data-controllers-random]';

const CTRL_SELECTORS = {
	spawnNav: {
		base: '[data-spawn-mode]',
		randBtn: '[data-spawn-rand]',
		submitBtn: '[data-spawn-submit]',
	},
	gameNav: {
		base: '[data-game-mode]',
		msg: '[data-game-message]',
		playBtn: '[data-game-play]',
		pauseBtn: '[data-game-pause]',
		nextBtn: '[data-game-next]',
		restartBtn: '[data-game-restart]',
	},
};

class SpawnNavView {
	constructor() {
		this.nodeEl = getNodeBySelector(CTRL_SELECTORS.spawnNav.base);
		this.submitBtn = getNodeBySelector(CTRL_SELECTORS.spawnNav.submitBtn);
		this.randomBtn = getNodeBySelector(CTRL_SELECTORS.spawnNav.randBtn);

		if (!this.nodeEl || !this.submitBtn || !this.randomBtn) {
			throw new Error('SpawnNavView');
		}
	}

	display() {
		this.nodeEl.style.display = 'flex';
		return this;
	}

	hide() {
		this.nodeEl.style.display = 'none';
		return this;
	}

	onSubmit(callback) {
		const onClick = ($ev) => {
			$ev.preventDefault();

			callback();
		};

		this.submitBtn.addEventListener('click', onClick);

		return this;
	}

	onRandom(callback) {
		const onClick = ($ev) => {
			$ev.preventDefault();
			callback();
		};

		this.randomBtn.addEventListener('click', onClick);

		return this;
	}
}

class GameNavView {
	constructor() {
		this.nodeEl = getNodeBySelector(CTRL_SELECTORS.gameNav.base);
		this.msgEl = getNodeBySelector(CTRL_SELECTORS.gameNav.msg);
		this.playBtn = getNodeBySelector(CTRL_SELECTORS.gameNav.playBtn);
		this.pauseBtn = getNodeBySelector(CTRL_SELECTORS.gameNav.pauseBtn);
		this.nextBtn = getNodeBySelector(CTRL_SELECTORS.gameNav.nextBtn);
		this.restartBtn = getNodeBySelector(CTRL_SELECTORS.gameNav.restartBtn);

		if (
			!this.nodeEl ||
			!this.playBtn ||
			!this.pauseBtn ||
			!this.nextBtn ||
			!this.restartBtn ||
			!this.msgEl
		) {
			throw new Error('GameNavView');
		}
	}

	display() {
		this.nodeEl.style.display = 'flex';
		return this;
	}

	displayMessage(text) {
		this.msgEl.innerHTML = text;
	}

	hide() {
		this.nodeEl.style.display = 'none';
		return this;
	}

	reset() {
		this.restartBtn.removeAttribute('disabled');
		this.playBtn.style.display = 'flex';
		this.pauseBtn.style.display = 'none';
	}

	onNext(callback) {
		const onClick = ($ev) => {
			$ev.preventDefault();
			callback();
		};

		this.nextBtn.addEventListener('click', onClick);

		return this;
	}

	onPlay(callback) {
		const onClick = ($ev) => {
			$ev.preventDefault();

			this.restartBtn.setAttribute('disabled', '');
			this.playBtn.style.display = 'none';
			this.pauseBtn.style.display = 'flex';

			callback();
		};

		this.playBtn.addEventListener('click', onClick);

		return this;
	}

	onPause(callback) {
		const onClick = ($ev) => {
			$ev.preventDefault();

			this.playBtn.style.display = 'flex';
			this.pauseBtn.style.display = 'none';
			this.restartBtn.removeAttribute('disabled', '');

			callback();
		};

		this.pauseBtn.addEventListener('click', onClick);

		return this;
	}

	onRestart(callback) {
		const onClick = ($ev) => {
			$ev.preventDefault();
			callback();
		};

		this.restartBtn.addEventListener('click', onClick);
		return this;
	}
}

class ControllersView {
	constructor() {
		this.spawnNavView = new SpawnNavView();
		this.gameNavView = new GameNavView();
	}

	enableSpawnMode() {
		this.gameNavView.hide();
		this.spawnNavView.display();
		return this;
	}

	enableGameMode() {
		this.gameNavView.displayMessage('');
		this.spawnNavView.hide();
		this.gameNavView.display();
		return this;
	}
}
