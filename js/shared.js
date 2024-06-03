function getNodeBySelector(selector, many = false, parentNode = null) {
	if (!selector.length) {
		console.log('❗ INVALID SELECTOR: ', selector);
		return null;
	}

	const parent = parentNode ?? document;

	const search = many ? [...parent.querySelectorAll(selector)] : parent.querySelector(selector);

	if (many && !search.length) {
		console.log('❌ ELEMENTS NOT FOUND BY SELECTOR: ', selector);
		return [];
	}

	if (!search) {
		console.log('❌ ELEMENT NOT FOUND BY SELECTOR: ', selector);
		return null;
	}

	return search;
}
