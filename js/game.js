function areSameKents(fKents, sKents) {
	if (fKents.length !== sKents.length) return false;

	return fKents.every((nr) => sKents.includes(nr));
}

function useGame() {
	let rows = 0;
	let cols = 0;

	function getKentFamilyXY(x, y) {
		const colsCount = cols - 1;
		const rowsCount = rows - 1;

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

	function getKentFamily(nr) {
		const TOTAL = rows * cols;

		const isFirsRow = nr - cols < 0;
		const isLastRow = nr + cols > TOTAL;

		const isFirstCol = nr === 1 ? true : (nr - 1) % cols === 0;
		const isLastCol = nr === TOTAL ? true : nr % cols === 0;

		const top = isFirsRow ? TOTAL - Math.abs(nr - cols) : nr - cols;
		const bottom = isLastRow ? nr + cols - TOTAL : nr + cols;

		const left = isFirstCol ? nr + (cols - 1) : nr - 1;
		const right = isLastCol ? nr - (cols - 1) : nr + 1;

		const topRight = isLastCol ? top - (cols - 1) : top + 1;
		const topLeft = isFirstCol ? top + (cols - 1) : top - 1;

		const bottomRight = isLastCol ? bottom - (cols - 1) : bottom + 1;
		const bottomLeft = isFirstCol ? bottom + (cols - 1) : bottom - 1;

		return [topLeft, top, topRight, right, bottomRight, bottom, bottomLeft, left];
	}

	function getNewGeneration(kentsList = [], prevList = []) {
		const isSameGeneration = areSameKents(prevList, kentsList);

		if (isSameGeneration) {
			return kentsList;
		}

		const result = {};
		const newGeneration = [];

		kentsList.forEach((nr) => {
			const kFam = getKentFamily(nr);

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

	function setSize(r, c) {
		rows = r;
		cols = c;
	}

	return {
		setSize,
		getKentFamily,
		getNewGeneration,
	};
}
