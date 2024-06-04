const NEW_START_SELECTOR = '[data-start]';

function useNewStart() {
	const nodeEl = getNodeBySelector(NEW_START_SELECTOR);

	function display() {
		if (!nodeEl) return;
		nodeEl.style.display = 'block';
	}

	function hide() {
		if (!nodeEl) return;
		nodeEl.style.display = 'none';
	}

	return {};
}
