class CanvasClass {
	canvas: HTMLCanvasElement;
	wrapperDom: HTMLDivElement;
	ctx: CanvasRenderingContext2D | null;
	pixel: number;
	stageWidth: number;
	stageHeight: number;

	constructor(dom: HTMLCanvasElement, wrapperDom: HTMLDivElement) {
		this.canvas = dom;
		this.wrapperDom = wrapperDom;
		this.ctx = this.canvas?.getContext("2d") ?? null;
		this.pixel = window.devicePixelRatio > 1 ? 2 : 1;
		this.stageWidth = 0;
		this.stageHeight = 0;
		this.resize();
	}

	resize() {
		this.stageWidth = this.wrapperDom.clientWidth;
		this.stageHeight = this.wrapperDom.clientHeight;

		this.canvas.width = this.stageWidth * this.pixel;
		this.canvas.height = this.stageHeight * this.pixel;

		this.ctx?.scale(this.pixel, this.pixel);
	}

	draw(imageDom: HTMLImageElement) {
		this.ctx?.drawImage(imageDom, 0, 0, this.stageWidth, this.stageHeight);
	}
}

export default CanvasClass;
