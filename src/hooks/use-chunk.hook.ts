export default function useChunk(array: any[], chunkSize: number): any[][] {
	return array.reduce((chunks, item, index) => {
		const chunkIndex = Math.floor(index / chunkSize);

		if (!chunks[chunkIndex]) {
			chunks[chunkIndex] = [];
		}

		chunks[chunkIndex].push(item);
		return chunks;
	}, []);
}
