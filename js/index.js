const SIZE = 20;
const CANVAS_SIZE = 500;
const COLS = 10;
const ROWS = 10;

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
function drawGrid(ctx, color = '#000') {
	ctx.save();
	ctx.beginPath();
	ctx.strokeStyle = color;

	const totalWidth = COLS * SIZE;
	const totalHeight = ROWS * SIZE;

	for (let x = 20; x <= totalWidth; x += SIZE) {
		ctx.moveTo(x, 20);
		ctx.lineTo(x, totalHeight);
	}

	for (let y = 20; y <= totalHeight; y += SIZE) {
		ctx.moveTo(20, y);
		ctx.lineTo(totalWidth, y);
	}

	ctx.stroke();
	ctx.restore();
}

/**
 *
 * @param {HTMLCanvasElement} canvas
 */
function useCanvas(canvas) {
	const ctx = canvas.getContext('2d');

	function render(scale, translate) {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.save();
		ctx.translate(translate.x, translate.y);
		ctx.scale(scale, scale);

		drawGrid(ctx);

		ctx.restore();
	}

	return {
		render,
	};
}

async function main() {
	const node = document.getElementById('campnou');

	let scale = 1.0;
	let dragOffset = { x: 0, y: 0 };
	let mouseDown = false;
	const translate = { x: 0.5, y: 0.5 };

	const canvas = useCanvas(node);
	canvas.render(scale, translate);

	document.addEventListener(
		'mousewheel',
		(ev) => {
			ev.preventDefault();
			ev.stopPropagation();

			if (ev.ctrlKey && ev.target.id === 'campnou') {
				console.log({
					x: ev.clientX,
					y: ev.clientY,
				});
				ev.preventDefault();
				scale *= Math.exp(-ev.deltaY / 1000);
				canvas.render(scale, translate);
			}
		},
		{ passive: false }
	);

	node.addEventListener('mousedown', function (evt) {
		mouseDown = true;
		dragOffset.x = evt.clientX - translate.x;
		dragOffset.y = evt.clientY - translate.y;
	});

	node.addEventListener('mouseup', function (evt) {
		mouseDown = false;
	});

	node.addEventListener('mouseover', function (evt) {
		mouseDown = false;
	});

	node.addEventListener('mouseout', function (evt) {
		mouseDown = false;
	});

	node.addEventListener('mousemove', function (evt) {
		if (mouseDown) {
			translate.x = evt.clientX - dragOffset.x;
			translate.y = evt.clientY - dragOffset.y;
			canvas.render(scale, translate);
		}
	});
}

document.addEventListener('DOMContentLoaded', main);
