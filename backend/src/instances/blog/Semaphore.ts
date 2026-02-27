export class Semaphore {
	private permits = 0;
	private readonly maxPermits: number;
	private waitingQueue: (() => void)[] = [];

	constructor(permits: number) {
		if (!Number.isInteger(permits) || permits <= 0) {
			throw new Error(
				`Semaphore permits must be a positive integer. Received: ${permits}`,
			);
		}

		this.permits = permits;
		this.maxPermits = permits;
	}

	acquire(): Promise<void> {
		if (this.permits > 0) {
			this.permits--;
			return Promise.resolve();
		}

		return new Promise((resolve) => {
			this.waitingQueue.push(resolve);
		});
	}

	release() {
		const next = this.waitingQueue.shift();
		if (next) {
			next();
			return;
		}

		if (this.permits >= this.maxPermits) {
			throw new Error("Semaphore released too many times");
		}

		this.permits++;
	}
}
