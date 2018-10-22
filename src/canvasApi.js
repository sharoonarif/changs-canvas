const drawCircle = (context, x, y, radius) => {
	context.beginPath();
	context.arc(x, y, radius, 0, Math.PI * 2);
	context.stroke();

	context.closePath();
};

const drawLineTo = (context, start, end) => {
	context.beginPath();
	context.moveTo(start.x, start.y);
	context.lineTo(end.x, end.y);
	context.stroke();
	context.closePath();
};

const drawCurveTo = (context, start, end, curveAmount, direction) => {
	context.beginPath();
	context.moveTo(start.x, start.y);

	const midX = (start.x + end.x) / 2;
	const midY = (start.y + end.y) / 2;

	const xLength = end.x - start.x;
	const yLength = end.y - start.y;

	const gradient = xLength / yLength;

	const offsetMidX = midX + ((curveAmount / 2) * gradient * direction);
	const offsetMidY = midY + ((curveAmount / 2) * gradient * direction * (gradient > 0 ? -1 : 1));

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