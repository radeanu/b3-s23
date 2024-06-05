class B3S23Game {
	#rows = 0;
	#cols = 0;
	#totalCount = 0;

	constructor() {}

	setSize(r, c) {
		this.#rows = r;
		this.#cols = c;
		this.#totalCount = r * c;

		return this;
	}

	getKentFamilyXY(x, y) {
		const colsCount = this.#cols - 1;
		const rowsCount = this.#rows - 1;

		const top = { x, y: y === 0 ? rowsCount : y - 1 };
		const bottom = { x, y: y === rowsCount ? 0 : y + 1 };

		const left = { x: x === 0 ? colsCount : x - 1, y };
		const right = { x: x === colsCount ? 0 : x + 1, y };

		const topRight = { x: right.x, y: top.y };
		const topLeft = { x: left.x, y: top.y };

		const bottomRight = { x: right.x, y: bottom.y };
		const bottomLeft = { x: left.x, y: bottom.y };

		return [topLeft, top, topRight, right, bottomRight, bottom, bottomLeft, left];
	}

	getKentFamily(nr) {
		const colsOffset = this.#cols - 1;
		const isFirsRow = nr - this.#cols < 0;
		const isLastRow = nr + this.#cols > this.#totalCount;

		const isFirstCol = nr === 1 ? true : (nr - 1) % this.#cols === 0;
		const isLastCol = nr === this.#totalCount ? true : nr % this.#cols === 0;

		const top = isFirsRow ? this.#totalCount - Math.abs(nr - this.#cols) : nr - this.#cols;
		const bottom = isLastRow ? nr + this.#cols - this.#totalCount : nr + this.#cols;

		const left = isFirstCol ? nr + colsOffset : nr - 1;
		const right = isLastCol ? nr - colsOffset : nr + 1;

		const topRight = isLastCol ? top - colsOffset : top + 1;
		const topLeft = isFirstCol ? top + colsOffset : top - 1;

		const bottomRight = isLastCol ? bottom - colsOffset : bottom + 1;
		const bottomLeft = isFirstCol ? bottom + colsOffset : bottom - 1;

		return [topLeft, top, topRight, right, bottomRight, bottom, bottomLeft, left];
	}

	getNewGeneration(kentsList = [], prevList = []) {
		const isSameGeneration = this.areSameKents(prevList, kentsList);

		if (isSameGeneration) {
			return kentsList;
		}

		const result = {};
		const newGeneration = [];

		kentsList.forEach((nr) => {
			const kFam = this.getKentFamily(nr);

			kFam.forEach((famNr) => {
				const targetCount = result[famNr] ?? 0;
				result[famNr] = targetCount + 1;
			});
		});

		Object.entries(result).forEach(([nr, count]) => {
			const kentNr = +nr;
			const kentExist = kentsList.includes(kentNr);

			const newLife = count === 3 && !kentExist;
			const stillAlive = (count === 2 || count === 3) && kentExist;

			if (stillAlive || newLife) {
				return newGeneration.push(kentNr);
			}
		});

		return newGeneration;
	}

	getRandomGeneration() {
		if (this.#rows === 0 || this.#cols === 0) return [];

		const randMax = [this.#rows * 2, this.#cols * 2][Math.floor(Math.random() * 2)];
		const count = Math.floor(Math.random() * randMax) + 1;

		const kents = new Set();

		for (let i = 0; i < count; i++) {
			kents.add(Math.floor(Math.random() * this.#totalCount) + 1);
		}

		return [...kents];
	}

	areSameKents(fKents, sKents) {
		if (fKents.length !== sKents.length) return false;

		return fKents.every((nr) => sKents.includes(nr));
	}
}
