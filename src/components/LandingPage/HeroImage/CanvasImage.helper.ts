class CanvasImage {
  pixel: number;
  frontX: number;
  behindX: number;
  speed: number;
  distance: number;
  constructor() {
    this.pixel = 0;
    this.frontX = 0;
    this.behindX = 0;
    this.speed = 0.5;
    this.distance = 0;
  }

  increaseSpeed() {
    this.frontX += this.speed;
    this.behindX += this.speed;
  }

  updateImageLocation(stageWidth: number) {
    if (this.frontX > stageWidth) {
      this.frontX = this.behindX - stageWidth - this.distance;
    }

    if (this.behindX > stageWidth) {
      this.behindX = this.frontX - stageWidth - this.distance;
    }
  }
}

export default CanvasImage;
