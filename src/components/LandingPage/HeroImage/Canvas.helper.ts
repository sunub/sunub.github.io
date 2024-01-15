import CanvasImage from "./CanvasImage.helper";

class Canvas extends CanvasImage {
  canvas: HTMLCanvasElement;
  image: HTMLImageElement;
  ctx: CanvasRenderingContext2D | null;
  stageWidth: number;
  stageHeight: number;
  imageAspectRatio: number;

  constructor(canvasDom: HTMLCanvasElement, imageDom: HTMLImageElement) {
    super();
    this.canvas = canvasDom;
    this.image = imageDom;
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

    this.cloudsDistnace = this.stageWidth * 0.13;
    this.carsDistance = this.stageWidth * 0.13;

    this.behindCloudsX = -(this.stageWidth + this.cloudsDistnace);
    this.behindCarsX = -(this.stageWidth + this.carsDistance);
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

  draw(cloudDom: HTMLImageElement, carsDom: HTMLImageElement) {
    this.ctx?.clearRect(0, 0, this.stageWidth, this.stageHeight);
    this.drawFrontClouds(cloudDom);
    this.drawBehindClouds(cloudDom);
    this.drawForwardCars(carsDom);
    this.drawBehindCars(carsDom);

    this.increaseSpeed();
    this.updateImageLocation(this.stageWidth);

    requestAnimationFrame(this.draw.bind(this, cloudDom, carsDom));
  }

  drawFrontClouds(cloudDom: HTMLImageElement) {
    this.ctx?.drawImage(
      cloudDom,
      this.frontCloudsX,
      0,
      this.stageWidth,
      this.stageHeight,
    );
  }

  drawBehindClouds(cloudDom: HTMLImageElement) {
    this.ctx?.drawImage(
      cloudDom,
      this.behindCloudsX,
      0,
      this.stageWidth,
      this.stageHeight,
    );
  }
  drawForwardCars(carsDom: HTMLImageElement) {
    this.ctx?.drawImage(
      carsDom,
      this.frontCarsX,
      0,
      this.stageWidth,
      this.stageHeight,
    );
  }
  drawBehindCars(carsDom: HTMLImageElement) {
    this.ctx?.drawImage(
      carsDom,
      this.behindCarsX,
      0,
      this.stageWidth,
      this.stageHeight,
    );
  }
}

export default Canvas;
