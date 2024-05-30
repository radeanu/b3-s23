const CANVAS_ID = 'campnou';

function main() {
	const canvasApp = useCanvas(CANVAS_ID);

	canvasApp.init(10, 10);
	canvasApp.draw();

	console.log(canvasApp.cells);
}

document.addEventListener('DOMContentLoaded', main);
