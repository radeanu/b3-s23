const MAP_SELECTOR = '#campnou';

function useKent(x, y, number) {
	const node = document.createElement('td');
	// node.innerHTML = number;
	node.dataset.x = x;
	node.dataset.y = y;
	node.dataset.nr = number;
	node.title = `${x}- ${y}`;

	return node;
}

function useMap(rows, cols) {
	const nodeEl = getNodeBySelector(MAP_SELECTOR);

	function draw() {
		for (let y = 0, number = 0; y < cols; y++) {
			const row = document.createElement('tr');

			for (let x = 0; x < rows; x++) {
				const kent = useKent(x, y, number);
				row.appendChild(kent);
				number++;
			}

			nodeEl.appendChild(row);
		}
	}

	function drawKent(x, y, selected = true) {
		const targetNode = nodeEl.querySelector(`td[data-x="${x}"][data-y="${y}"]`);

		if (targetNode === null) return;

		selected ? targetNode.setAttribute('selected', '') : targetNode.removeAttribute('selected');
	}

	async function pickKents() {
		let kents = [];

		const spawnControllers = useSpawn();
		spawnControllers.display();

		nodeEl.addEventListener('click', (ev) => {
			const dataset = ev.target.dataset;
			const nr = parseInt(dataset.nr);

			const exists = kents.some((k) => k.nr === nr);

			if (exists) {
				kents = kents.filter((v) => v.nr !== nr);
				drawKent(dataset.x, dataset.y, false);
				return;
			}

			drawKent(dataset.x, dataset.y, true);

			kents.push({
				nr,
				x: parseInt(dataset.x),
				y: parseInt(dataset.y),
			});
		});

		await spawnControllers.submit();
		spawnControllers.hide();

		return kents;
	}

	return {
		draw,
		nodeEl,
		drawKent,
		pickKents,
	};
}
