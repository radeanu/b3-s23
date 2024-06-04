const SETTINGS_SELECTOR = '[data-settings-modal]';
const SETTINGS_FORM_SELECTOR = '[data-settings-form]';

function useSettings() {
	const nodeEl = getNodeBySelector(SETTINGS_SELECTOR);
	const formEl = getNodeBySelector(SETTINGS_FORM_SELECTOR, false);

	function getSettings() {
		return new Promise(async (resolve, reject) => {
			if (!nodeEl || !formEl) return reject();

			_displayModal();

			const onSubmit = ($event) => {
				$event.preventDefault();

				const formData = new FormData($event.target);
				const { rows, cols } = Object.fromEntries(formData);

				formEl.removeEventListener('submit', onSubmit);

				resolve({ rows: parseInt(rows), cols: parseInt(cols) });
				_hideModal();
			};

			formEl.addEventListener('submit', onSubmit);
		});
	}

	function _displayModal() {
		if (!nodeEl) return;

		document.body.style.overflow = 'hidden';
		nodeEl.style.display = 'flex';
	}

	function _hideModal() {
		if (!nodeEl) return;

		document.body.style.overflow = 'unset';
		nodeEl.style.display = 'none';
	}

	return {
		getSettings,
	};
}
