const SIZE = 20;
const CANVAS_SIZE = 500;

/**
 *
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} size
 */
function drawGridV2(ctx, size) {
	const canvas = document.createElement('canvas');
	const pCtx = canvas.getContext('2d');

	canvas.width = size;
	canvas.height = size;

	pCtx.beginPath();
	pCtx.moveTo(size, 0);
	pCtx.lineTo(size, size);
	pCtx.moveTo(size, size);
	pCtx.lineTo(0, size);
	pCtx.stroke();

	const pattern = ctx.createPattern(canvas, 'repeat');

	const matrix = new DOMMatrix();
	pattern.setTransform(matrix.translate(0.5, 0.5));

	ctx.fillStyle = pattern;
	ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

/**
 *
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} size
 */
function drawGrid(ctx, size, color = '#000') {
	const { width, height } = ctx.canvas;

	ctx.save();
	ctx.clearRect(0, 0, width, height);

	ctx.beginPath();
	ctx.strokeStyle = color;

	for (let x = 0; x <= width; x += size) {
		ctx.moveTo(x, 0);
		ctx.lineTo(x, height);
	}

	for (let y = 0; y <= height; y += size) {
		ctx.moveTo(0, y);
		ctx.lineTo(width, y);
	}

	ctx.stroke();
	ctx.restore();
}

async function main() {
	/** @type {HTMLCanvasElement} */
	const canvas = document.querySelector('[data-campnou]');

	const ctx = canvas.getContext('2d');

	ctx.translate(0.5, 0.5);
	drawGrid(ctx, SIZE);

	document.addEventListener('keydown', (ev) => {
		if (ev.code === 'ArrowDown') {
		}

		if (ev.code === 'ArrowUp') {
		}
	});
}

document.addEventListener('DOMContentLoaded', main);
