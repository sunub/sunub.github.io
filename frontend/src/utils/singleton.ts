/* eslint-disable */
export function singleton<Value>(name: string, value: () => Value): Value {
  const yolo = global as any;
  yolo.__singleton ??= {};
  yolo.__singleton[name] ??= value();
  return yolo.__singleton[name];
}
