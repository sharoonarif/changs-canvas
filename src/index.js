
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
	document.getElementById('curved').addEventListener('change', toggleCurve.bind(this));
	document.getElementById('curve-amount').addEventListener('change', updateDrawParameter.bind(this, 'curveAmount', target => parseInt(target.value)));
	document.getElementById('opacity').addEventListener('change', updateDrawParameter.bind(this, 'opacity', target => parseFloat(target.value)));

	const colorPicker = document.getElementById('color-picker');
	for (const child of colorPicker.children) {
		child.addEventListener('click', updateDrawParameter.bind(this, 'strokeColor', (target) => target.attributes['data-color'].value));
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

const toggleCurve = (e) => {
	const checked = e.target.checked;
	drawParameters.curved = checked;

	const curveAmountControl = document.getElementById('curve-amount-control');
	checked ? curveAmountControl.classList.remove('disabled') : curveAmountControl.classList.add('disabled');
	curveAmountControl.querySelector('input').disabled = !checked;
};

const updateDrawParameter = (propName, valueSelector, e) => {
	const value = valueSelector(e.target);

	if (value === null || value === undefined) {
		return;
	}

	drawParameters[propName] = value;
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
	const curveAmount = 1;
	const opacity = 1;
	const curved = false;
	drawParameters.xDirection = 5;
	drawParameters.yDirection = 5;
	drawParameters.lineWidth = lineWidth;
	drawParameters.currentX = width * Math.random();
	drawParameters.currentY = height * Math.random();
	drawParameters.strokeColor = 'black';
	drawParameters.curveMultiplier = 1;
	drawParameters.curved = curved;
	drawParameters.curveAmount = curveAmount;
	drawParameters.opacity = opacity;

	document.getElementById('x-move').value = 5;
	document.getElementById('y-move').value = 5;
	document.getElementById('line-width').value = lineWidth;
	document.getElementById('curve-amount').value = curveAmount;
	document.getElementById('curved').checked = curved;
	document.getElementById('opacity').value = opacity;

	if (!currentAnimationFrameRequest) {
		draw(getContext());
	}
};

const draw = context => {
	const { lineWidth, strokeColor, opacity } = drawParameters;

	context.lineWidth = lineWidth;
	context.strokeStyle = strokeColor || 'black';
	context.globalAlpha = opacity;
	
	const newX = drawParameters.currentX;
	const newY = drawParameters.currentY;

	if (newX > (width - lineWidth) || newX < lineWidth) {
		drawParameters.xDirection = drawParameters.xDirection * -1;
	}
	
	if (newY > (height - lineWidth) || newY < lineWidth) {
		drawParameters.yDirection = drawParameters.yDirection * -1;
	}
	
	drawParameters.currentX = newX + drawParameters.xDirection;
	drawParameters.currentY = newY + drawParameters.yDirection;

	if (drawParameters.curved) {
		drawCurveTo(context, { x: newX, y: newY }, { x: drawParameters.currentX, y: drawParameters.currentY });
	}
	else {
		drawLineTo(context, { x: newX, y: newY }, { x: drawParameters.currentX, y: drawParameters.currentY });
	}

	currentAnimationFrameRequest = requestAnimationFrame(draw.bind(this, context));
};

const drawLineTo = (context, start, end) => {
	context.beginPath();
	context.moveTo(start.x, start.y);
	context.lineTo(end.x, end.y);
	context.stroke();
	context.closePath();
};

const drawCurveTo = (context, start, end) => {
	context.beginPath();
	context.moveTo(start.x, start.y);

	const midX = (start.x + end.x) / 2;
	const midY = (start.y + end.y) / 2;

	const xLength = end.x - start.x;
	const yLength = end.y - start.y;

	const gradient = xLength / yLength;

	const offsetMidX = midX + ((drawParameters.curveAmount / 2) * gradient * drawParameters.curveMultiplier);
	const offsetMidY = midY + ((drawParameters.curveAmount / 2) * gradient * drawParameters.curveMultiplier * (gradient > 0 ? -1 : 1));

	context.quadraticCurveTo(
		offsetMidX,
		offsetMidY,
		end.x,
		end.y
	);

	context.stroke();
	context.closePath();

	drawParameters.curveMultiplier = drawParameters.curveMultiplier * -1;
};

document.addEventListener('DOMContentLoaded', main);