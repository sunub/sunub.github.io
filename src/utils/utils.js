const range = (start, end, step = 1) => {
	const output = [];

	if (typeof end === "undefined") {
		end = start;
		start = 0;
	}

	for (let i = start; i < end; i += step) {
		output.push(i);
	}
	return output;
};

/**
 *
 * @param {any[]} array
 * @param {number} size
 * @returns {any[]}
 */
const chunkArray = (array, size) => {
	let results = [];
	while (array.length) {
		results.push(array.slice(0, size));
	}
	return results;
};

export { range, chunkArray };
