const MODAL_SELECTOR = '#modal';
const MODAL_CONTENT_SELECTOR = '#modal-content';

function useModal() {
	const nodeEl = getNodeBySelector(MODAL_SELECTOR);

	let cloneNode;

	function display() {
		if (!nodeEl) return;

		document.body.style.overflow = 'hidden';
		cloneNode = nodeEl.content.firstElementChild.cloneNode(true);

		document.body.appendChild(cloneNode);
	}

	function hide() {
		if (!nodeEl || !cloneNode) return;

		document.body.style.overflow = 'unset';
		cloneNode.remove();
	}

	function appendContent(content) {
		if (!cloneNode) return;

		const nodeContentEl = getNodeBySelector(MODAL_CONTENT_SELECTOR);

		nodeContentEl.appendChild(content);
	}

	return {
		hide,
		display,
		appendContent,
	};
}
