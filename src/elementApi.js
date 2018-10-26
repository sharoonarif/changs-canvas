const getFloatFromTarget = target => parseFloat(target.value);

const initHandlers = () => {
	document.getElementById('reset-btn').addEventListener('click', reset);
	document.getElementById('stop-btn').addEventListener('click', stop);
	document.getElementById('start-btn').addEventListener('click', start);
	document.getElementById('clear-btn').addEventListener('click', clear);
	document.getElementById('random-btn').addEventListener('click', randomize);
	document.getElementById('opacity').addEventListener('change', updateDrawParameter.bind(this, 'opacity', target => parseFloat(target.value)));
	document.getElementById('outer-speed').addEventListener('change', updateDrawParameter.bind(this, 'outerSpeed', getFloatFromTarget));
	document.getElementById('inner-speed').addEventListener('change', updateDrawParameter.bind(this, 'innerSpeed', getFloatFromTarget));
	document.getElementById('overall-speed').addEventListener('change', updateDrawParameter.bind(this, 'overallSpeed', getFloatFromTarget));
	document.getElementById('circle-size').addEventListener('change', updateDrawParameter.bind(this, 'innerCircleRadius', getFloatFromTarget));
	document.getElementById('pencil-offset').addEventListener('change', updateDrawParameter.bind(this, 'pencilOffset', getFloatFromTarget));
	document.getElementById('pencil-size').addEventListener('change', updateDrawParameter.bind(this, 'pencilSize', getFloatFromTarget));
	document.getElementById('hide-stencils').addEventListener('change', updateDrawParameter.bind(this, 'hideStencils', target => target.checked));

	const colorPicker = document.getElementById('color-picker');
	const getColorFromDataColor = (target) => target.attributes['data-color'].value;
	for (const child of colorPicker.children) {
		child.addEventListener('click', updateDrawParameter.bind(this, 'strokeColor', getColorFromDataColor));
	}
};

const getContextById = id => {
	const canvas = document.getElementById(id);
	return canvas.getContext('2d');
};