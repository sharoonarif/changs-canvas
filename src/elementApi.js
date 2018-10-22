const initHandlers = () => {
	document.getElementById('reset-btn').addEventListener('click', reset);
	document.getElementById('stop-btn').addEventListener('click', stop);
	document.getElementById('start-btn').addEventListener('click', start);
	document.getElementById('clear-btn').addEventListener('click', clear);

	const colorPicker = document.getElementById('color-picker');
	for (const child of colorPicker.children) {
		child.addEventListener('click', updateDrawParameter.bind(this, 'strokeColor', (target) => target.attributes['data-color'].value));
	}
};

const getContext = () => {
	const canvas = document.getElementById('changs-canvas');
	return canvas.getContext('2d');
};
