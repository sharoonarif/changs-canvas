
const width = 800;
const height = 600;
const drawParameters = {};

let currentAnimationFrameRequest;

const initHandlers = () => {
	document.getElementById('reset-btn').addEventListener('click', reset);
	document.getElementById('stop-btn').addEventListener('click', stop);
	document.getElementById('start-btn').addEventListener('click', start);
	document.getElementById('clear-btn').addEventListener('click', clear);
	document.getElementById('x-move').addEventListener('change', updateDrawParameter.bind(this, 'xDirection'));
	document.getElementById('y-move').addEventListener('change', updateDrawParameter.bind(this, 'yDirection'));
	document.getElementById('line-width').addEventListener('change', updateDrawParameter.bind(this, 'lineWidth'));
};

const main = () => {
	initHandlers();
	const canvas = document.getElementById('changs-canvas');
	canvas.width = width;
	canvas.height = height;

	reset();
};

const getContext = () => {
	const canvas = document.getElementById('changs-canvas');
	return canvas.getContext('2d');
};

const updateDrawParameter = (velocityProp, e) => {
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
	context.clearRect(0, 0, 800, 600);
};

const reset = () => {
	clear();
	drawParameters.xDirection = 5;
	drawParameters.yDirection = 5;
	drawParameters.lineWidth = 3;
	drawParameters.currentX = width * Math.random();
	drawParameters.currentY = height * Math.random();

	document.getElementById('x-move').value = 5;
	document.getElementById('y-move').value = 5;
	document.getElementById('line-width').value = 3;

	if (!currentAnimationFrameRequest) {
		draw(getContext());
	}
};

const draw = context => {
	const { lineWidth } = drawParameters;

	context.beginPath();
	context.lineWidth = lineWidth;
	context.strokeStyle = 'black';
	
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