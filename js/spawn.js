const SPAWN_SELECTOR = '#spawn-controls';
const SPAWN_SUBMIT_SELECTOR = '#spawn-submit';

function useSpawn() {
	const nodeEl = getNodeBySelector(SPAWN_SELECTOR);
	const submitNodeEl = getNodeBySelector(SPAWN_SUBMIT_SELECTOR);

	function display() {
		if (!nodeEl || !submitNodeEl) return;

		nodeEl.style.display = 'flex';
	}

	function hide() {
		if (!nodeEl || !submitNodeEl) return;

		nodeEl.style.display = 'none';
	}

	function submit() {
		return new Promise((resolve, reject) => {
			const onSubmitClick = ($ev) => {
				$ev.preventDefault();

				submitNodeEl.removeEventListener('click', submitNodeEl);
				resolve();
			};

			submitNodeEl.addEventListener('click', onSubmitClick);
		});
	}

	return {
		hide,
		submit,
		display,
	};
}
