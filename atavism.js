var atavism = function() {
	var ALIVE = [];
	var DEAD = [];
	
	var bitstring = function (val) {
		var bits = i.toString(2);
		while (bits.length < 9) bits = '0' + bits;
		return bits;
	}
		
	for (var i = 0; i < 512; i++) {
		var bits = bitstring(i);
		var nbors = 0; // number of live neighbors
		
		for (j = 0; j < 9; j++) {
			if (j !== 4 && bits[j] === '1') {
				nbors++;
			}
		}
		
		if (nbors === 3 || (bits[4] === '1' && nbors === 2)) {
			ALIVE.push(bits);
		}
		else {
			DEAD.push(bits);
		}
	}
	
	return {
		ALIVE: ALIVE,
		DEAD: DEAD
	}
}