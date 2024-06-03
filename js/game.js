function areSameKents(fKents, sKents) {
	if (fKents.length !== sKents.length) return false;

	return fKents.every((k1) => sKents.some((k2) => k1.x === k2.x && k1.y === k2.y));
}

function useGame(rows, cols) {
	let kents = [];

	const map = useMap();

	function _getFamily(x, y) {
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

	function _newGeneration(kentsList, prevList = []) {
		console.log('NEW');
		const isSameGeneration = areSameKents(prevList, kentsList);

		if (isSameGeneration) {
			console.log('Game over: ' + isSameGeneration);
			return;
		}

		const result = [];
		const newGeneration = [];

		kentsList.forEach((k) => {
			const kFam = _getFamily(k.x, k.y);

			kFam.forEach((fam) => {
				const findIndex = result.findIndex((r) => r.x === fam.x && r.y === fam.y);

				if (findIndex === -1) {
					return result.push({ ...fam, count: 1 });
				}

				return (result[findIndex].count += 1);
			});
		});

		result.forEach((r) => {
			const kentExists = kentsList.some((i) => r.x === i.x && r.y === i.y);

			if (r.count === 3) {
				if (!kentExists) {
					map.drawKent(r.x, r.y, true);
				}

				return newGeneration.push({ x: r.x, y: r.y });
			}

			if ((r.count === 2 || r.count === 3) && kentExists) {
				return newGeneration.push({ x: r.x, y: r.y });
			}

			if (kentExists) {
				return map.drawKent(r.x, r.y, false);
			}
		});

		if (!newGeneration.length) {
			console.log('Game over');

			kentsList.forEach((r) => {
				map.drawKent(r.x, r.y, false);
			});
			return;
		}

		setTimeout(() => {
			_newGeneration(newGeneration, kentsList);
		}, 30);
		// window.requestAnimationFrame(() => {
		// 	_newGeneration(newGeneration, kentsList);
		// });
	}

	function setKents(list) {
		kents = list;
	}

	function run() {
		_newGeneration(kents);
	}

	return {
		setKents,
		run,
	};
}
