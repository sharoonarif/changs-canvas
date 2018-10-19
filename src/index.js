 
let width = 800;
let height = 600;
let rotate = 0;
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
	drawParameters.circleRadius = 50;
	drawParameters.circleStartX = 0;
	drawParameters.circleStartY = 0;
	drawParameters.pencilOffset = Math.random() * (drawParameters.circleRadius - 10);
	drawParameters.direction = 1;
	rotate = 1;

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
	const {
		lineWidth,
		strokeColor,
		opacity
	} = drawParameters;

	context.lineWidth = lineWidth;
	context.globalAlpha = opacity;
	context.strokeStyle = strokeColor || 'black';
	
	for(let i = 0; i < 3; i++) {
		drawTheShit(context);
	}

	currentAnimationFrameRequest = requestAnimationFrame(draw.bind(this, context));
	// context.save();
	
	// const circleMidX = circleStartX + circleRadius;
	// const circleMidY = circleStartY + circleRadius;
	
	// context.translate(circleMidX, circleMidY);
	// const rotateAngle = (rotate / 180) * Math.PI;
	// context.rotate(rotateAngle);

	// if (rotate >= 360) {
	// 	rotate = 0;
	// }
	
	// rotate += 2;
	// drawLineTo(context, {x: pencilOffset, y: 0 }, {x: pencilOffset + 1,  y: 0});

	// const {nextX, nextY} = getNextPosition(circleStartX, circleStartY);
	// drawParameters.circleStartX = nextX;
	// drawParameters.circleStartY = nextY;
	
	// context.restore();

};

const drawTheShit = (context) => {
	const {
		circleRadius,
		circleStartX,
		circleStartY,
		pencilOffset
	} = drawParameters;

	context.save();
	
	const circleMidX = circleStartX + circleRadius;
	const circleMidY = circleStartY + circleRadius;
	
	context.translate(circleMidX, circleMidY);
	const rotateAngle = (rotate / 180) * Math.PI;
	context.rotate(rotateAngle);

	
	rotate += 12;
	if (rotate >= 360) {
		rotate = 0;
	}

	drawLineTo(context, {x: 0, y: 0 }, {x: 10,  y: 0});

	const {nextX, nextY} = getNextPosition(circleStartX, circleStartY);
	drawParameters.circleStartX = nextX;
	drawParameters.circleStartY = nextY;
	
	context.restore();
};

const getNextPosition = (x, y) => {
	const { direction, circleRadius } = drawParameters;
	const maxX = width - (circleRadius * 2);
	const maxY = height - (circleRadius * 2);
	const incrementValue = 3;
	let nextX = x;
	let nextY = y;
	if (direction === 1) {
		if (x < maxX && y === 0) {
			nextX = x + incrementValue;
		}
		if (y < height && x >= maxX) {
			nextY = y + incrementValue;
		}
	}
	else {
		if (x > 0 && y >= maxY) {
			nextX = x - incrementValue;
		}
		if (y > 0 && x <= 0) {
			nextY = y - incrementValue;
		}
	}

	if (x >= maxX && y >= maxY) {
		drawParameters.direction = -1;
	}
	if (x <= 0 && y <= 0) {
		drawParameters.direction = 1;
	}

	return { nextX, nextY };
};

const drawLineTo = (context, start, end) => {
	context.beginPath();
	context.moveTo(start.x, start.y);
	context.lineTo(end.x, end.y);
	context.stroke();
	context.closePath();
};

const drawCircle = (context, { x, y }, radius) => {
	context.beginPath();
	context.arc(x, y, radius, 0, Math.PI * 2);
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

	// drawParameters.curveMultiplier = drawParameters.curveMultiplier * -1;
};

document.addEventListener('DOMContentLoaded', main);