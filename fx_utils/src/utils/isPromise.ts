export function isPromise<T>(a: T): boolean {
  if (a instanceof Promise) {
    return true;
  }

  if (
    a !== null &&
    typeof a === 'object' &&
    typeof (a as any).then === 'function' &&
    typeof (a as any).catch === 'function'
  ) {
    return true;
  }

  return false;
}
