class CanvasImage {
  pixel: number;
<<<<<<< HEAD
<<<<<<< HEAD
  frontX: number;
  behindX: number;
  speed: number;
  distance: number;
=======
  frontCloudsX: number;
  behindCloudsX: number;
  frontCarsX: number;
  behindCarsX: number;
  cloudsSpeed: number;
  carsSpeed: number;
  cloudsDistnace: number;
  carsDistance: number;
>>>>>>> refs/remotes/origin/sunub
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

<<<<<<< HEAD
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

=======
>>>>>>> refs/remotes/origin/sunub
    if (this.behindCloudsX > stageWidth) {
      this.behindCloudsX = this.frontCloudsX - stageWidth - this.cloudsDistnace;
    }

    if (this.frontCarsX > stageWidth) {
      this.frontCarsX = this.behindCarsX - stageWidth - this.carsDistance;
    }

    if (this.behindCarsX > stageWidth) {
      this.behindCarsX = this.frontCarsX - stageWidth - this.carsDistance;
<<<<<<< HEAD
>>>>>>> dev-v2
=======
>>>>>>> refs/remotes/origin/sunub
    }
  }
}

export default CanvasImage;
