export async function fromAsync<T>(asyncIterable: AsyncIterable<T>): Promise<T[]> {
  const result = [];
  for await (const value of asyncIterable) {
    result.push(value);
  }
  return result;
}
