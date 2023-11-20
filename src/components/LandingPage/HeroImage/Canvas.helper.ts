import CanvasImage from "./CanvasImage.helper";

class Canvas extends CanvasImage {
  canvas: HTMLCanvasElement;
  image: HTMLImageElement;
  cloudsDom: HTMLImageElement;
  ctx: CanvasRenderingContext2D | null;
  stageWidth: number;
  stageHeight: number;
  imageAspectRatio: number;

  constructor(
    canvasDom: HTMLCanvasElement,
    imageDom: HTMLImageElement,
    cloudsDom: HTMLImageElement
  ) {
    super();
    this.canvas = canvasDom;
    this.image = imageDom;
    this.cloudsDom = cloudsDom;
    this.ctx = this.canvas?.getContext("2d") ?? null;
    this.stageWidth = 0;
    this.stageHeight = 0;
    this.imageAspectRatio = imageDom.width / imageDom.height;

    this.resize();
    window.addEventListener("resize", this.resize.bind(this), false);
  }

  resize() {
    this.resizeStageSize();
    this.resizeCanvasSize();

    this.distance = this.stageWidth * 0.21;
    this.behindX = -(this.stageWidth + this.distance);
  }

  resizeStageSize() {
    this.stageHeight = this.image.clientHeight;
    this.stageWidth = this.image.clientWidth;
    this.pixel = window.devicePixelRatio > 1 ? 2 : 1;
  }

  resizeCanvasSize() {
    this.canvas.width = this.stageWidth * this.pixel - 2;
    this.canvas.height = this.stageHeight * this.pixel - 2;
    this.ctx?.scale(this.pixel, this.pixel);
  }

  resizeImageSize() {
    const imageHeight = this.stageHeight;
    const imageWidth = this.stageWidth * this.imageAspectRatio;
    this.image.width = imageWidth;
    this.image.height = imageHeight;
  }

  draw(imageDom: HTMLImageElement) {
    this.ctx?.clearRect(0, 0, this.stageWidth, this.stageHeight);
    this.drawFrontClouds(imageDom);
    this.drawBehindClouds(imageDom);

    this.increaseSpeed();
    this.updateImageLocation(this.stageWidth);

    requestAnimationFrame(this.draw.bind(this, imageDom));
  }

  drawFrontClouds(imageDom: HTMLImageElement) {
    this.ctx?.drawImage(
      imageDom,
      this.frontX,
      0,
      this.stageWidth,
      this.stageHeight
    );
  }

  drawBehindClouds(imageDom: HTMLImageElement) {
    this.ctx?.drawImage(
      imageDom,
      this.behindX,
      0,
      this.stageWidth,
      this.stageHeight
    );
  }
}

export default Canvas;
