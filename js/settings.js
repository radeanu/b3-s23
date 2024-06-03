const SETTINGS_SELECTOR = '#settings';
const SETTINGS_FORM_SELECTOR = '#settings-form';

function useSettings() {
	const nodeEl = getNodeBySelector(SETTINGS_SELECTOR);

	function getSettings() {
		return new Promise(async (resolve, reject) => {
			if (!nodeEl) return reject();

			const modal = useModal();
			modal.display();

			const clone = nodeEl.content.firstElementChild.cloneNode(true);
			modal.appendContent(clone);

			const formEl = getNodeBySelector(SETTINGS_FORM_SELECTOR, false);

			const onSubmit = ($event) => {
				$event.preventDefault();

				const formData = new FormData($event.target);
				const { rows, cols } = Object.fromEntries(formData);

				formEl.removeEventListener('submit', onSubmit);

				resolve({ rows: parseInt(rows), cols: parseInt(cols) });
				modal.hide();
			};

			formEl.addEventListener('submit', onSubmit);
		});
	}

	return {
		getSettings,
	};
}
