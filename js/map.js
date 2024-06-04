const MAP_SELECTOR = '#campnou';

function useKent(x, y, number) {
	const node = document.createElement('td');
	node.innerHTML = number;
	node.dataset.x = x;
	node.dataset.y = y;
	node.dataset.nr = number;
	node.title = number;

	return node;
}

function useMap(rows, cols) {
	const nodeEl = getNodeBySelector(MAP_SELECTOR);

	function draw() {
		for (let y = 0, number = 1; y < cols; y++) {
			const row = document.createElement('tr');

			for (let x = 0; x < rows; x++) {
				const kent = useKent(x, y, number);
				row.appendChild(kent);
				number++;
			}

			nodeEl.appendChild(row);
		}
	}

	function drawKent(nr, selected = true) {
		const targetNode = nodeEl.querySelector(`td[data-nr="${nr}"]`);

		if (targetNode === null) return;

		selected ? targetNode.setAttribute('selected', '') : targetNode.removeAttribute('selected');
	}

	async function pickKents() {
		let kents = [];

		const spawnControllers = useSpawn();
		spawnControllers.display();

		const pick = (ev) => {
			ev.preventDefault();

			const dataset = ev.target.dataset;
			const nr = parseInt(dataset.nr);

			if (kents.includes(nr)) {
				kents = kents.filter((knr) => knr !== nr);
				drawKent(nr, false);
				return;
			}

			drawKent(nr, true);

			kents.push(nr);
		};

		nodeEl.addEventListener('click', pick);

		await spawnControllers.submit();
		spawnControllers.hide();

		nodeEl.removeEventListener('click', pick);

		return kents;
	}

	return {
		draw,
		nodeEl,
		drawKent,
		pickKents,
	};
}
