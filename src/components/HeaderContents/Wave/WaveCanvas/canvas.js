import WaveGroup from './waveGroup';

export default class Canavs {
  constructor(ref) {
    this.canvas = ref;
    this.ctx = this.canvas.getContext('2d');
    this.pixel = window.devicePixelRatio > 1 ? 2 : 1;

    this.waveGroup = new WaveGroup();

    window.addEventListener('resize', this.resize.bind(this), false);
    this.resize();

    requestAnimationFrame(this.animate.bind(this));
  }

  resize() {
    this.stageWidth = this.canvas.clientWidth;
    this.stageHeight = this.canvas.clientHeight;

    this.canvas.width = this.stageWidth * this.pixel;
    this.canvas.height = this.stageHeight * this.pixel;
    this.ctx.scale(2, 2);

    this.waveGroup.resize(this.stageWidth, this.stageHeight);
  }

  animate(t) {
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    this.waveGroup.draw(this.ctx);

    requestAnimationFrame(this.animate.bind(this));
  }
}
