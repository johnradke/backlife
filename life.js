var life = function (canvasId, scale) {
	if (!scale) scale = 1;
	var el = document.getElementById(canvasId);
	var ctx = el.getContext('2d');
	var img = ctx.createImageData(el.width, el.height);
	var width = el.width / scale | 0;
	var height = el.height / scale | 0;
	
	console.log(width, height);
	
	var getPixelIndex = function(pixelX, pixelY) {
		return (pixelY * img.width + pixelX) * 4;
	};
	
	var setAlive = function (i, x, y, alive) {
		if (x >= width || y >= height) {
			throw new Error();
		}
		
		var on;
		if (typeof(alive) === 'function') {
			on = alive(x, y);
		}
		else {
			on = alive;
		}
		var val = on ? 0 : 255;
		
		for (xoff = 0; xoff < scale; xoff++) {
			for (yoff = 0; yoff < scale; yoff++) {
				var index = getPixelIndex(x * scale + xoff, y * scale + yoff);
				
				i.data[index] = val;
				i.data[index + 1] = val;
				i.data[index + 2] = val;
				i.data[index + 3] = 255;
			}
		}
	};

	var isAlive = function (x, y) {
		if (x < 0 || y < 0 || x >= width || y >= height) {
			return false;
		}
		
		var index = getPixelIndex(x * scale, y * scale);
		
		return img.data[index] === 0 && img.data[index + 3] === 255;
	};
	
	var setPattern = function(x, y, pattern) {
		for (var xoff = 0; xoff < pattern.length; xoff ++) {
			for (var yoff = 0; yoff < pattern[xoff].length; yoff++) {
				setAlive(img, x + xoff, y + yoff, pattern[xoff][yoff]);
			}
		}
	};
	
	var willBeAlive = function(x, y) {
		var count = neighborCount(x, y);
		
		if (count === 3) {
			return true;
		}
		
		if (isAlive(x, y)) {
			if (count === 2) {
				return true;
			}
		}
		
		return false;
	};
	
	var neighborCount = function(x, y) {
		var sum = 0;
		for (var xoff = -1; xoff <= 1; xoff++) {
			for (var yoff = -1; yoff <=1; yoff++) {
				if (xoff === 0 && yoff === 0) {
					continue;
				}
				sum += isAlive(x + xoff, y + yoff) ? 1 : 0;
			}
		}
		return sum;
	};
	
	var setPrevGenBlock = function (prev, x, y) {
	};
	
	var aPrevGen = function () {
		var prev = ctx.createImageData(img);
		
		for (var x = 0; x < width; x++) {
			for (var y = 0; y < height; y++) {
				
			}
		}
		
		img = prev;
	};
	
	var nextGen = function () {
		var next = ctx.createImageData(img);
		for (var x = 0; x < width; x++) {
			for (var y = 0; y < height; y++) {
				setAlive(next, x, y, willBeAlive);
			}
		}
		img = next;
	};
	
	var draw = function () {
		ctx.putImageData(img, 0, 0);
	};
	
	return {
		setAlive: function(x, y, alive) { setAlive (img, x, y, alive); },
		isAlive: isAlive,
		draw: draw,
		width: width,
		height: height,
		nextGen: nextGen,
		aPrevGen: aPrevGen,
		setPattern: setPattern,
		GLIDER: [[0, 1, 0], [0, 0, 1], [1, 1, 1]],
		GROWTH: [[1, 1, 1, 0, 1], [1, 0, 0, 0, 0], [0, 0, 0, 1, 1], [0, 1, 1, 0, 1], [1, 0, 1, 0, 1]]
	};
};