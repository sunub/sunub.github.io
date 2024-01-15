class CanvasImage {
  pixel: number;
<<<<<<< HEAD
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
=======
  frontCloudsX: number;
  behindCloudsX: number;
  frontCarsX: number;
  behindCarsX: number;
  cloudsSpeed: number;
  carsSpeed: number;
  cloudsDistnace: number;
  carsDistance: number;
  constructor() {
    this.pixel = 0;
    this.frontCloudsX = 0;
    this.behindCloudsX = 0;

    this.frontCarsX = 0;
    this.behindCarsX = 0;

    this.cloudsSpeed = 0.25;
    this.carsSpeed = 0.7;
    this.cloudsDistnace = 0;
    this.carsDistance = -10;
  }

  increaseSpeed() {
    this.frontCloudsX += this.cloudsSpeed;
    this.behindCloudsX += this.cloudsSpeed;

    this.frontCarsX += this.carsSpeed;
    this.behindCarsX += this.carsSpeed;
  }

  updateImageLocation(stageWidth: number) {
    if (this.frontCloudsX > stageWidth) {
      this.frontCloudsX = this.behindCloudsX - stageWidth - this.cloudsDistnace;
    }

    if (this.behindCloudsX > stageWidth) {
      this.behindCloudsX = this.frontCloudsX - stageWidth - this.cloudsDistnace;
    }

    if (this.frontCarsX > stageWidth) {
      this.frontCarsX = this.behindCarsX - stageWidth - this.carsDistance;
    }

    if (this.behindCarsX > stageWidth) {
      this.behindCarsX = this.frontCarsX - stageWidth - this.carsDistance;
>>>>>>> dev-v2
    }
  }
}

export default CanvasImage;
