export function singleton<Value>(name: string, value: () => Value): Value {
	// biome-ignore lint/suspicious/noExplicitAny: 전역 객체에 싱글톤을 저장하기 위해 any 타입 사용
	const yolo = global as any;
	yolo.__singleton ??= {};
	yolo.__singleton[name] ??= value();
	return yolo.__singleton[name];
}
