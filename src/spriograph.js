let currentAnimationFrameRequest;
let width = 800;
let height = 600;
let outerCircleRadius = height / 2;
let rotate = 0;
let rotateInner = 0;
const drawParameters = {};

const start = () => {
	if (currentAnimationFrameRequest) {
		return;
	}

	const context = getContextById('changs-canvas');
	const otherContext = getContextById('changs-other-canvas');
	draw(context, otherContext);
};

const stop = () => {
	cancelAnimationFrame(currentAnimationFrameRequest);
	currentAnimationFrameRequest = null;
};

const clear = () => {
	const context = getContextById('changs-canvas');
	const otherContext = getContextById('changs-other-canvas');
	otherContext.beginPath();
	otherContext.clearRect(0, 0, width, height);
};

const reset = () => {
	clear();
	const outerSpeed = 1;
	const innerSpeed = 2;
	const opacity = 1;
	const overallSpeed = 1;
	const innerCircleRadius = 50;
	const pencilOffset = 1;
	const hideStencils = false;
	drawParameters.xDirection = 5;
	drawParameters.yDirection = 5;
	drawParameters.lineWidth = 1;
	drawParameters.currentX = width * Math.random();
	drawParameters.currentY = height * Math.random();
	drawParameters.strokeColor = 'black';
	drawParameters.opacity = opacity;
	drawParameters.circleRadius = 50;
	drawParameters.circleStartX = 0;
	drawParameters.circleStartY = 0;
	drawParameters.pencilOffset = Math.random() * (drawParameters.circleRadius - 10);
	drawParameters.direction = 1;
	drawParameters.outerSpeed = outerSpeed;
	drawParameters.innerSpeed = innerSpeed;
	drawParameters.overallSpeed = overallSpeed;
	drawParameters.innerCircleRadius = innerCircleRadius;
	drawParameters.pencilOffset = pencilOffset;
	drawParameters.hideStencils = hideStencils;

	rotate = 0;
	rotateInner = 0;

	document.getElementById('opacity').value = opacity;
	document.getElementById('outer-speed').value = outerSpeed;
	document.getElementById('inner-speed').value = innerSpeed;
	document.getElementById('overall-speed').value = overallSpeed;
	document.getElementById('circle-size').value = innerCircleRadius;
	document.getElementById('pencil-offset').value = pencilOffset;
	document.getElementById('hide-stencils').checked = hideStencils;

	if (!currentAnimationFrameRequest) {
		draw(getContextById('changs-canvas'), getContextById('changs-other-canvas'));
	}
};

const updateDrawParameter = (propName, valueSelector, e) => {
	const value = valueSelector(e.target);

	if (value === null || value === undefined) {
		return;
	}

	drawParameters[propName] = value;
};