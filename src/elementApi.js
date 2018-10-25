const initHandlers = () => {
	document.getElementById('reset-btn').addEventListener('click', reset);
	document.getElementById('stop-btn').addEventListener('click', stop);
	document.getElementById('start-btn').addEventListener('click', start);
	document.getElementById('clear-btn').addEventListener('click', clear);
	document.getElementById('random-btn').addEventListener('click', randomize);
	document.getElementById('opacity').addEventListener('change', updateDrawParameter.bind(this, 'opacity', target => parseFloat(target.value)));
	document.getElementById('outer-speed').addEventListener('change', updateDrawParameter.bind(this, 'outerSpeed', target => parseFloat(target.value)));
	document.getElementById('inner-speed').addEventListener('change', updateDrawParameter.bind(this, 'innerSpeed', target => parseFloat(target.value)));
	document.getElementById('overall-speed').addEventListener('change', updateDrawParameter.bind(this, 'overallSpeed', target => parseFloat(target.value)));
	document.getElementById('circle-size').addEventListener('change', updateDrawParameter.bind(this, 'innerCircleRadius', target => parseFloat(target.value)));
	document.getElementById('pencil-offset').addEventListener('change', updateDrawParameter.bind(this, 'pencilOffset', target => parseFloat(target.value)));
	document.getElementById('pencil-size').addEventListener('change', updateDrawParameter.bind(this, 'pencilSize', target => parseFloat(target.value)));
	document.getElementById('hide-stencils').addEventListener('change', updateDrawParameter.bind(this, 'hideStencils', target => target.checked));

	const colorPicker = document.getElementById('color-picker');
	for (const child of colorPicker.children) {
		child.addEventListener('click', updateDrawParameter.bind(this, 'strokeColor', (target) => target.attributes['data-color'].value));
	}
};

const getContext = () => {
	const canvas = document.getElementById('changs-canvas');
	return canvas.getContext('2d');
};

const getContextById = id => {
	const canvas = document.getElementById(id);	
	return canvas.getContext('2d');
};