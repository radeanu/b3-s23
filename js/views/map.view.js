const MAP_SELECTOR = '[data-campnou]';
const MAP_SCALE_NAME = '--table-cell-padding';

class MapView {
	rows = 0;
	cols = 0;

	constructor() {
		this.nodeEl = getNodeBySelector(MAP_SELECTOR);
		this._handleScale();

		if (!this.nodeEl) {
			throw new Error('MapView');
		}
	}

	draw() {
		for (let y = 0, number = 1; y < this.cols; y++) {
			const row = document.createElement('tr');

			for (let x = 0; x < this.rows; x++) {
				const kent = this._createKent(number);
				row.appendChild(kent);
				number++;
			}

			this.nodeEl.appendChild(row);
		}

		return this;
	}

	resetSelected() {
		const selectedNodes = getNodeBySelector('[selected=""]', true, this.nodeEl);

		selectedNodes.forEach((n) => {
			n.removeAttribute('selected');
		});

		return this;
	}

	drawKent(nr, selected = true) {
		const targetNode = getNodeBySelector(`td[data-nr="${nr}"]`, false, this.nodeEl);

		if (targetNode === null) return;

		selected ? targetNode.setAttribute('selected', '') : targetNode.removeAttribute('selected');

		return this;
	}

	enable() {
		this.nodeEl.classList.add('active');
		this.nodeEl.addEventListener('click', this._onKentClick);

		return this;
	}

	disable() {
		this.nodeEl.classList.remove('active');
		this.nodeEl.removeEventListener('click', this._onKentClick);

		return this;
	}

	getSelectedKents() {
		const selectedNodes = getNodeBySelector('[selected=""]', true, this.nodeEl);

		return selectedNodes.map((n) => parseInt(n.dataset.nr));
	}

	setSize(rows, cols) {
		this.cols = cols;
		this.rows = rows;
		return this;
	}

	_setMapScale(val) {
		document.documentElement.style.setProperty(MAP_SCALE_NAME, `${val}px`);
	}

	_getMapScale() {
		const style = getComputedStyle(document.body);

		const currScale = style.getPropertyValue(MAP_SCALE_NAME);
		return parseInt(currScale);
	}

	_handleScale() {
		document.addEventListener('keydown', (ev) => {
			if (ev.code === 'ArrowUp') {
				const scaleVal = this._getMapScale();
				this._setMapScale(scaleVal + 1);
				return;
			}

			if (ev.code === 'ArrowDown') {
				const scaleVal = this._getMapScale();
				this._setMapScale(scaleVal - 1);
				return;
			}
		});
	}

	_onKentClick(ev) {
		ev.preventDefault();
		ev.target.toggleAttribute('selected');
	}

	_createKent(number) {
		const node = document.createElement('td');
		node.dataset.nr = number;
		node.title = number;

		return node;
	}
}
