let currentAnimationFrameRequest;
let width = 800;
let height = 600;
let outerCircleRadius = height / 2;
let rotate = 0;
let rotateInner = 0;
const innerCircleRadius = 70;
const drawParameters = {};

const start = () => {
	if (currentAnimationFrameRequest) {
		return;
	}
	draw(getContext());
};

const stop = () => {
	cancelAnimationFrame(currentAnimationFrameRequest);
	currentAnimationFrameRequest = null;
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
	drawParameters.circleRadius = 50;
	drawParameters.circleStartX = 0;
	drawParameters.circleStartY = 0;
	drawParameters.pencilOffset = Math.random() * (drawParameters.circleRadius - 10);
	drawParameters.direction = 1;
	rotate = 0;
	rotateInner = 0;

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

const updateDrawParameter = (propName, valueSelector, e) => {
	const value = valueSelector(e.target);

	if (value === null || value === undefined) {
		return;
	}

	drawParameters[propName] = value;
};