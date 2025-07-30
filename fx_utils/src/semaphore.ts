class Semaphore {
  private permits: number;
  private waitQueue: (() => void)[] = [];

  constructor(permits: number) {
    this.permits = permits;
  }

  async acquire(): Promise<void> {
    if (this.permits > 0) {
      this.permits--;
      return;
    }

    return new Promise<void>(resolve => {
      this.waitQueue.push(resolve);
    });
  }

  get permitsCount(): number {
    return this.permits;
  }

  get waitingCount(): number {
    return this.waitQueue.length;
  }

  release(): void {
    this.permits++;
    const next = this.waitQueue.shift();
    if (next) {
      this.permits--;
      next();
    }
  }

  getStatus() {
    return {
      permits: this.permits,
      waiting: this.waitQueue.length,
      active: 5 - this.permits, // 실제 실행 중인 작업 수
    };
  }
}

(async () => {
  const semaphore = new Semaphore(5);

  const tasks = async (id: number) => {
    console.log(`Task ${id} 대기 시작`, semaphore.getStatus());

    // await semaphore.acquire();

    console.log(`Task ${id} 실행 시작`, semaphore.getStatus());

    try {
      // ✅ Promise 기반으로 수정
      await new Promise<void>(resolve => {
        setTimeout(() => {
          console.log(`Task ${id} 작업 완료`);
          resolve();
        }, 5000);
      });
    } finally {
      // ✅ 확실한 release 보장
      // semaphore.release();
      console.log(`Task ${id} 자원 해제`, semaphore.getStatus());
    }
  };

  console.log('=== 시작 전 상태 ===');
  console.log('초기 상태:', semaphore.getStatus());

  const startTime = Date.now();

  await Promise.all([
    tasks(1),
    tasks(2),
    tasks(3),
    tasks(4),
    tasks(5),
    tasks(6),
    tasks(7),
    tasks(8),
    tasks(9),
    tasks(10),
    tasks(11),
    tasks(12),
  ]);

  const endTime = Date.now();

  console.log('=== 완료 후 상태 ===');
  console.log('최종 상태:', semaphore.getStatus());
  console.log(`총 소요 시간: ${(endTime - startTime) / 1000}초`);
})();
