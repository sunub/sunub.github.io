class Canvas {
  canvas: HTMLCanvasElement;
  image: HTMLImageElement;
  cloudsDom: HTMLImageElement;
  ctx: CanvasRenderingContext2D | null;
  stageWidth: number;
  stageHeight: number;
  pixel: number;
  frontX: number;
  behindX: number;
  speed: number;
  imageAspectRatio: number;
  distance: number;

  constructor(
    canvasDom: HTMLCanvasElement,
    imageDom: HTMLImageElement,
    cloudsDom: HTMLImageElement
  ) {
    this.canvas = canvasDom;
    this.image = imageDom;
    this.cloudsDom = cloudsDom;
    this.ctx = this.canvas?.getContext("2d") ?? null;
    this.stageWidth = 0;
    this.stageHeight = 0;
    this.pixel = 0;
    this.frontX = 0;
    this.behindX = 0;
    this.speed = 0.5;
    this.imageAspectRatio = imageDom.width / imageDom.height;
    this.distance = 0;

    this.resize();
    window.addEventListener("resize", this.resize.bind(this), false);
  }

  resize() {
    this.stageWidth = this.image.clientWidth;
    this.stageHeight = this.image.clientHeight;
    this.pixel = window.devicePixelRatio > 1 ? 2 : 1;

    this.canvas.width = this.stageWidth * this.pixel - 2;
    this.canvas.height = this.stageHeight * this.pixel - 2;

    this.distance = this.stageWidth * 0.21;
    this.behindX = -(this.stageWidth + this.distance);

    const imageHeight = this.stageHeight;
    const imageWidth = imageHeight * this.imageAspectRatio;

    this.image.width = imageWidth;
    this.image.height = imageHeight;

    this.ctx?.scale(this.pixel, this.pixel);
  }

  draw(imageDom: HTMLImageElement) {
    this.ctx?.clearRect(0, 0, this.stageWidth, this.stageHeight);
    this.ctx?.drawImage(
      imageDom,
      this.frontX,
      0,
      this.stageWidth,
      this.stageHeight
    );
    this.ctx?.drawImage(
      imageDom,
      this.behindX,
      0,
      this.stageWidth,
      this.stageHeight
    );

    this.frontX += this.speed;
    this.behindX += this.speed;

    if (this.frontX > this.stageWidth) {
      this.frontX = this.behindX - this.stageWidth - this.distance;
    }

    if (this.behindX > this.stageWidth) {
      this.behindX = this.frontX - this.stageWidth - this.distance;
    }

    requestAnimationFrame(this.draw.bind(this, imageDom));
  }
}

export default Canvas;
