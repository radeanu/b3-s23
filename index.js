const WIDTH = 10;
const HEIGHT = 10;

const handler = {
	set(obj, prop, value) {
		console.log('SEEEEET');
		obj[prop] = value;
		return true;
	},
	get(obj, prop) {
		console.log('GEEEEEEET');
		return obj[prop];
	},
};

let kents = [];

function getFamily(x, y) {
	const targetWidth = WIDTH - 1;
	const targetHeight = HEIGHT - 1;

	const top = { x, y: y === 0 ? targetHeight : y - 1 };
	const bottom = { x, y: y === targetHeight ? 0 : y + 1 };

	const left = { x: x === 0 ? targetWidth : x - 1, y };
	const right = { x: x === targetWidth ? 0 : x + 1, y };

	const topRight = { y: top.y, x: right.x };
	const topLeft = { y: top.y, x: left.x };

	const bottomRight = { y: bottom.y, x: right.x };
	const bottomLeft = { y: bottom.y, x: left.x };

	return [topLeft, top, topRight, right, bottomRight, bottom, bottomLeft, left];
}

function useKent(x, y, number) {
	const node = document.createElement('td');
	node.innerHTML = number;
	node.dataset.x = x;
	node.dataset.y = y;
	node.dataset.nr = number;

	return node;
}

function drawKent(node) {}

function useNewGeneration(kents) {}

function pickKents() {
	const table = document.getElementById('campnou');

	table.addEventListener('click', (ev) => {
		const dataset = ev.target.dataset;
		const nr = parseInt(dataset.nr);

		const exists = pKents.some((k) => k.nr === nr);

		if (exists) {
			pKents = pKents.filter((v) => v.nr !== nr);
			return;
		}

		pKents.push({
			nr,
			x: parseInt(dataset.x),
			y: parseInt(dataset.y),
		});

		console.log(pKents);
	});
}

function main() {
	const table = document.getElementById('campnou');
	const pickBtn = document.getElementById('pick-trigger');

	pickBtn.addEventListener('click', pickKents);

	for (let y = 0, number = 0; y < HEIGHT; y++) {
		const row = document.createElement('tr');

		for (let x = 0; x < WIDTH; x++) {
			const kent = useKent(x, y, number);

			row.appendChild(kent);
			number++;
		}

		table.appendChild(row);
	}
}

document.addEventListener('DOMContentLoaded', main);
