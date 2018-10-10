
let width = 800;
let height = 600;
const drawParameters = {};

let currentAnimationFrameRequest;

const initHandlers = () => {
	document.getElementById('reset-btn').addEventListener('click', reset);
	document.getElementById('stop-btn').addEventListener('click', stop);
	document.getElementById('start-btn').addEventListener('click', start);
	document.getElementById('clear-btn').addEventListener('click', clear);
	document.getElementById('x-move').addEventListener('change', updateVelocity.bind(this, 'xDirection'));
	document.getElementById('y-move').addEventListener('change', updateVelocity.bind(this, 'yDirection'));
	document.getElementById('line-width').addEventListener('change', updateVelocity.bind(this, 'lineWidth'));

	const colorPicker = document.getElementById('color-picker');
	for (const child of colorPicker.children) {
		child.addEventListener('click', updateDrawParameter.bind(this, 'strokeColor', 'data-color'));
	}
};

const main = () => {
	initHandlers();
	const canvas = document.getElementById('changs-canvas');
	canvas.width = canvas.clientWidth;
	canvas.height = canvas.clientHeight;
	width = canvas.clientWidth;
	height = canvas.clientHeight;

	reset();
};

const getContext = () => {
	const canvas = document.getElementById('changs-canvas');
	return canvas.getContext('2d');
};

const updateDrawParameter = (propName, attribute, e) => {
	const elementAttribute = e.target.attributes[attribute];

	if (!elementAttribute || !elementAttribute.value) {
		return;
	}

	drawParameters[propName] = elementAttribute.value;
};

const updateVelocity = (velocityProp, e) => {
	const value = e.target.value;

	if (!value || isNaN(value) || !isFinite(value)) {
		return;
	}

	drawParameters[velocityProp] =  parseInt(value) * (drawParameters[velocityProp] < 0 ? -1 : 1);
};

const stop = () => {
	cancelAnimationFrame(currentAnimationFrameRequest);
	currentAnimationFrameRequest = null;
};

const start = () => {
	if (currentAnimationFrameRequest) {
		return;
	}

	draw(getContext());
};

const clear = () => {
	const context = getContext();
	context.clearRect(0, 0, width, height);
};

const reset = () => {
	clear();
	const lineWidth = 1;
	drawParameters.xDirection = 5;
	drawParameters.yDirection = 5;
	drawParameters.lineWidth = lineWidth;
	drawParameters.currentX = width * Math.random();
	drawParameters.currentY = height * Math.random();
	drawParameters.strokeColor = 'black';

	document.getElementById('x-move').value = 5;
	document.getElementById('y-move').value = 5;
	document.getElementById('line-width').value = lineWidth;

	if (!currentAnimationFrameRequest) {
		draw(getContext());
	}
};

const draw = context => {
	const { lineWidth, strokeColor } = drawParameters;

	context.beginPath();
	context.lineWidth = lineWidth;
	context.strokeStyle = strokeColor || 'black';
	
	const newX = drawParameters.currentX;
	const newY = drawParameters.currentY;
	context.moveTo(newX, newY);

	if (newX > (width - lineWidth) || newX < lineWidth) {
		drawParameters.xDirection = drawParameters.xDirection * -1;
	}
	
	if (newY > (height - lineWidth) || newY < lineWidth) {
		drawParameters.yDirection = drawParameters.yDirection * -1;
	}
	
	drawParameters.currentX = newX + drawParameters.xDirection;
	drawParameters.currentY = newY + drawParameters.yDirection;

	context.lineTo(drawParameters.currentX, drawParameters.currentY);

	context.stroke();
	context.closePath();
	currentAnimationFrameRequest = requestAnimationFrame(draw.bind(this, context));
};

document.addEventListener('DOMContentLoaded', main);