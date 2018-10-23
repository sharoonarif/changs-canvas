const main = () => {
	initHandlers();
	const canvas = document.getElementById('changs-canvas');
	canvas.width = canvas.clientWidth;
	canvas.height = canvas.clientHeight;
	const otherCanvas = document.getElementById('changs-other-canvas');
	otherCanvas.width = canvas.clientWidth;
	otherCanvas.height = canvas.clientHeight;
	width = canvas.clientWidth;
	height = canvas.clientHeight;
	outerCircleRadius = height / 2;
	reset();
};

const multiplier = 8;

let activated = false;

const draw = (topLayer, bottomLayer) => {
	const {
		lineWidth,
		strokeColor,
		opacity,
		overallSpeed,
		hideStencils
	} = drawParameters;

	//TODO: 
	// Add canvas "layers", 1 for the 3 main circles with rotation
	// and one on top (css with z-index) for the actual line. should be aite

	topLayer.lineWidth = lineWidth;
	topLayer.globalAlpha = opacity;
	topLayer.strokeStyle = 'black';
	
	topLayer.clearRect(0, 0, width, height);

	if (!hideStencils) {
		drawOuterCircle(topLayer);
	}

	for(let i = 0; i < overallSpeed * multiplier; i++) {
		drawTheShit(topLayer, bottomLayer);
	}

	currentAnimationFrameRequest = requestAnimationFrame(draw.bind(this, topLayer, bottomLayer));
};

const drawOuterCircle = (context) => {
	context.save();
	context.translate(width / 2, height / 2);

	drawCircle(context, 0, 0, outerCircleRadius);
	context.restore();
};

const drawTheShit = (topLayer, bottomLayer) => {
	const {
		circleStartX,
		circleStartY,
		innerSpeed,
		outerSpeed,
		strokeColor,
		innerCircleRadius,
		pencilOffset,
		hideStencils
	} = drawParameters;

	const calculatedPencilOffset = innerCircleRadius * (pencilOffset / 100);

	topLayer.save();
	bottomLayer.save();
	const circleMidX =  outerCircleRadius - innerCircleRadius;
	const circleMidY = 0;

	topLayer.translate(width / 2, height / 2);
	bottomLayer.translate(width / 2, height / 2);
	const rotateAngle = (rotate / 180) * Math.PI;
	topLayer.rotate(rotateAngle);
	bottomLayer.rotate(rotateAngle);
	topLayer.strokeStyle = 'white';
	if (!hideStencils) {
		drawCircle(topLayer, circleMidX, circleMidY, innerCircleRadius);
	}

	topLayer.translate(circleMidX, circleMidY);
	bottomLayer.translate(circleMidX, circleMidY);
	const rotateInnerAngle = (rotateInner / 180) * Math.PI;
	topLayer.rotate(rotateInnerAngle);
	bottomLayer.rotate(rotateInnerAngle);
	topLayer.strokeStyle = 'yellow';

	if (!hideStencils) {
		drawCircle(topLayer, calculatedPencilOffset, 0, 4);
	}

	// bottomLayer.lineTo(pencilOffset, 0);
	// bottomLayer.stroke();
	
	// if (activated) {
	// 	bottomLayer.closePath();
	// }
	// activated = true;
	
	// bottomLayer.closePath();

	drawCircle(bottomLayer, calculatedPencilOffset, 0, 1);
	bottomLayer.fillStyle = strokeColor;
	bottomLayer.fill();
	
	const { nextX, nextY } = getNextPosition(circleStartX, circleStartY);
	drawParameters.circleStartX = nextX;
	drawParameters.circleStartY = nextY;
	rotate += outerSpeed / multiplier;
	rotateInner += innerSpeed / multiplier;
	if (rotate >= 360) {
		rotate = 0;
	}

	if (rotateInner >= 360) {
		rotateInner = 1;
	}
	
	topLayer.restore();
	bottomLayer.restore();
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