const SETTINGS_SELECTOR = '[data-settings-modal]';
const SETTINGS_FORM_SELECTOR = '[data-settings-form]';

class SettingsView {
	constructor() {
		this.nodeEl = getNodeBySelector(SETTINGS_SELECTOR);
		this.formEl = getNodeBySelector(SETTINGS_FORM_SELECTOR, false);

		if (!this.nodeEl || !this.formEl) {
			throw new Error('SettingsView');
		}
	}

	getSettings() {
		return new Promise(async (resolve) => {
			this._toggleModal(true);

			const onSubmit = ($event) => {
				$event.preventDefault();

				const formData = new FormData($event.target);
				const { rows, cols } = Object.fromEntries(formData);

				this.formEl.removeEventListener('submit', onSubmit);
				this._toggleModal(false);

				resolve({ rows: parseInt(rows), cols: parseInt(cols) });
			};

			this.formEl.addEventListener('submit', onSubmit);
		});
	}

	_toggleModal(display = true) {
		document.body.style.overflow = display ? 'hidden' : 'unset';
		this.nodeEl.style.display = display ? 'flex' : 'none';
	}
}
