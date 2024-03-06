import Wave from './Wave';

export default class WaveGroup {
  constructor() {
    this.totlaWave = 3;
    this.totalPoints = 6;

    this.color = [
      'oklch(91.76% 0.034 31.16)',
      `oklch(93.91% 0.026 32.24)`,
      'oklch(70.8% 0.165 32.85)',
    ];

    this.waves = [];

    for (let i = 0; i < this.totlaWave; i++) {
      const wave = new Wave(i, this.totalPoints, this.color[i]);
      this.waves[i] = wave;
    }
  }

  resize(stageWidth, stageHeight) {
    for (let i = 0; i < this.totlaWave; i++) {
      const wave = this.waves[i];
      wave.resize(stageWidth, stageHeight);
    }
  }

  draw(ctx) {
    for (let i = 0; i < this.totlaWave; i++) {
      const wave = this.waves[i];
      wave.draw(ctx);
    }
  }
}
