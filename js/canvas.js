const CELL_SIZE = 50;
const CELL_PADDING = 5;

class Cell {
	constructor(row, col, nr) {
		this.x = col * CELL_SIZE + CELL_PADDING * col;
		this.y = row * CELL_SIZE + CELL_PADDING * row;
		this.nr = nr;
		this.row = row;
		this.col = col;
	}
}

function createImage(pixels) {
	var canvas = document.createElement('canvas');
	canvas.width = pixels[0].length;
	canvas.height = pixels.length;
	var context = canvas.getContext('2d');
	for (var r = 0; r < canvas.height; r++) {
		for (var c = 0; c < canvas.width; c++) {
			context.fillStyle = pixels[r][c];
			context.fillRect(c, r, 1, 1);
		}
	}
	return canvas.toDataURL('image/png');
}

function useCanvas(selector) {
	const canvasEl = document.getElementById(selector);

	const cells = [];

	if (!canvasEl) {
		throw new Error('Canvas not found');
	}

	this.ctx = canvasEl.getContext('2d');
	this.ctx.fillStyle = 'green';

	function init(width, height) {
		this.ctx.canvas.width = width * CELL_SIZE + (width - 1) * CELL_PADDING;
		this.ctx.canvas.height = height * CELL_SIZE + (height - 1) * CELL_PADDING;

		canvasEl.style.border = '1px solid black';

		for (let y = 0, nr = 0; y < height; y++) {
			for (let x = 0; x < width; x++) {
				const newCell = new Cell(y, x, nr);
				cells.push(newCell);
				nr++;
			}
		}

		// this.ctx.scale(0.5, 0.5);
	}

	function draw() {
		cells.forEach((c) => {
			window.requestAnimationFrame(() => {
				this.ctx.fillRect(c.x, c.y, CELL_SIZE, CELL_SIZE);
			});
		});
	}

	return {
		canvasEl,
		ctx,
		draw,
		cells,
		init,
	};
}
