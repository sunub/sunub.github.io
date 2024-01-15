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

<<<<<<< HEAD
<<<<<<< HEAD
    this.distance = this.stageWidth * 0.13;
    this.behindX = -(this.stageWidth + this.distance);
=======
=======
>>>>>>> refs/remotes/origin/sunub
    this.cloudsDistnace = this.stageWidth * 0.13;
    this.carsDistance = this.stageWidth * 0.13;

    this.behindCloudsX = -(this.stageWidth + this.cloudsDistnace);
    this.behindCarsX = -(this.stageWidth + this.carsDistance);
<<<<<<< HEAD
>>>>>>> dev-v2
=======
>>>>>>> refs/remotes/origin/sunub
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

<<<<<<< HEAD
<<<<<<< HEAD
  draw(cloudDom: HTMLImageElement) {
    this.ctx?.clearRect(0, 0, this.stageWidth, this.stageHeight);
    this.drawFrontClouds(cloudDom);
    this.drawBehindClouds(cloudDom);
=======
  draw(cloudDom: HTMLImageElement, carsDom: HTMLImageElement) {
    this.ctx?.clearRect(0, 0, this.stageWidth, this.stageHeight);
    this.drawFrontClouds(cloudDom);
    this.drawBehindClouds(cloudDom);
    this.drawForwardCars(carsDom);
    this.drawBehindCars(carsDom);
>>>>>>> dev-v2
=======
  draw(cloudDom: HTMLImageElement, carsDom: HTMLImageElement) {
    this.ctx?.clearRect(0, 0, this.stageWidth, this.stageHeight);
    this.drawFrontClouds(cloudDom);
    this.drawBehindClouds(cloudDom);
    this.drawForwardCars(carsDom);
    this.drawBehindCars(carsDom);
>>>>>>> refs/remotes/origin/sunub

    this.increaseSpeed();
    this.updateImageLocation(this.stageWidth);

<<<<<<< HEAD
<<<<<<< HEAD
    requestAnimationFrame(this.draw.bind(this, cloudDom));
=======
    requestAnimationFrame(this.draw.bind(this, cloudDom, carsDom));
>>>>>>> dev-v2
=======
    requestAnimationFrame(this.draw.bind(this, cloudDom, carsDom));
>>>>>>> refs/remotes/origin/sunub
  }

  drawFrontClouds(cloudDom: HTMLImageElement) {
    this.ctx?.drawImage(
      cloudDom,
<<<<<<< HEAD
<<<<<<< HEAD
      this.frontX,
=======
      this.frontCloudsX,
>>>>>>> dev-v2
=======
      this.frontCloudsX,
>>>>>>> refs/remotes/origin/sunub
      0,
      this.stageWidth,
      this.stageHeight,
    );
  }

  drawBehindClouds(cloudDom: HTMLImageElement) {
    this.ctx?.drawImage(
      cloudDom,
<<<<<<< HEAD
<<<<<<< HEAD
      this.behindX,
=======
=======
>>>>>>> refs/remotes/origin/sunub
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
<<<<<<< HEAD
>>>>>>> dev-v2
=======
>>>>>>> refs/remotes/origin/sunub
      0,
      this.stageWidth,
      this.stageHeight,
    );
  }
}

export default Canvas;
