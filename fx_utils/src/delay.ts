export function delay(time: number): Promise<undefined>;

export function delay<T>(time: number, value?: T): Promise<T>;

export function delay<T>(time: number, value?: T) {
  return new Promise(resolve => {
    setTimeout(() => resolve(value), time);
  });
}
