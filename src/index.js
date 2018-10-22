const main = () => {
	initHandlers();
	const canvas = document.getElementById('changs-canvas');
	canvas.width = canvas.clientWidth;
	canvas.height = canvas.clientHeight;
	width = canvas.clientWidth;
	height = canvas.clientHeight;
	outerCircleRadius = height / 2;
	reset();
};

const draw = context => {
	const {
		lineWidth,
		strokeColor,
		opacity
	} = drawParameters;

	//TODO: 
	// Add canvas "layers", 1 for the 3 main circles with rotation
	// and one on top (css with z-index) for the actual line. should be aite

	context.lineWidth = lineWidth;
	context.globalAlpha = opacity;
	context.strokeStyle = strokeColor || 'black';
	
	context.clearRect(0, 0, width, height);

	drawOuterCircle(context);
	drawTheShit(context);

	currentAnimationFrameRequest = requestAnimationFrame(draw.bind(this, context));
};

const drawOuterCircle = (context) => {
	context.save();
	context.translate(width / 2, height / 2);

	drawCircle(context, 0, 0, outerCircleRadius);
	context.restore();
};

const drawTheShit = (context) => {
	const {
		circleStartX,
		circleStartY,
	} = drawParameters;

	context.save();

	const circleMidX = outerCircleRadius - innerCircleRadius;
	const circleMidY = 0;
	
	context.translate(width / 2, height / 2);
	const rotateAngle = (rotate / 180) * Math.PI;
	context.rotate(rotateAngle);
	drawCircle(context, circleMidX, circleMidY, innerCircleRadius);
	
	context.translate(circleMidX, circleMidY);
	const rotateInnerAngle = (rotateInner / 180) * Math.PI;
	context.rotate(rotateInnerAngle);
	drawCircle(context, 56, 0, 4);
	
	const { nextX, nextY } = getNextPosition(circleStartX, circleStartY);
	drawParameters.circleStartX = nextX;
	drawParameters.circleStartY = nextY;
	rotate += 2;
	rotateInner += 4;
	if (rotate >= 360) {
		rotate = 0;
	}

	if (rotateInner >= 360) {
		rotateInner = 0;
	}
	
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

document.addEventListener('DOMContentLoaded', main);