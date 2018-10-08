const width = 800;
const height = 600;

const main = () => {
	document.getElementById('reset-btn').addEventListener('click', reset);
	document.getElementById('x-move').addEventListener('change', updateX);
	document.getElementById('y-move').addEventListener('change', updateY);
	const canvas = document.getElementById('changs-canvas');
	canvas.width = width;
	canvas.height = height;

	const context = canvas.getContext('2d');
	draw(context);
};

const getContext = () => {
	const canvas = document.getElementById('changs-canvas');
	return canvas.getContext('2d');
};

let xDirection = 5;
let yDirection = 5;
const absoluteXDirection = Math.abs(xDirection);
const absoluteYDirection = Math.abs(yDirection);

const updateX = (e) => {
	const value = e.target.value;
	console.log(value);
	if (!value || isNaN(value) || !isFinite(value)) {
		return;
	}

	xDirection = parseInt(value) * (xDirection < 0 ? -1 : 1);
};

const updateY = (e) => {
	const value = e.target.value;
	console.log(value);

	if (!value || isNaN(value) || !isFinite(value)) {
		return;
	}

	yDirection = parseInt(value) * (yDirection < 0 ? -1 : 1);
};

const reset = () => {
	const context = getContext();
	context.clearRect(0, 0, 800, 600);
};

const draw = (context, x, y) => {
	// context.clearRect(0, 0, 800, 600);
	context.beginPath();
	context.lineWidth = 10;
	context.strokeStyle = 'black';
	
	const newX = isNaN(x) ? width * Math.random() : x;
	const newY = isNaN(y) ? height * Math.random() : y;
	context.moveTo(newX, newY);

	if (newX > (width - absoluteXDirection) || newX < absoluteYDirection) {
		xDirection = xDirection * -1;
	}

	if (newY > (height - absoluteYDirection) || newY < absoluteYDirection) {
		yDirection = yDirection * -1;
	}

	const movedToX = newX + xDirection;
	const movedToY = newY + yDirection;

	context.lineTo(movedToX, movedToY);
	context.stroke();
	context.closePath();
	requestAnimationFrame(draw.bind(this, context, movedToX, movedToY));
};

document.addEventListener('DOMContentLoaded', main);