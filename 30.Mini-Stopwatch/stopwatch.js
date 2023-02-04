export default class Stopwatch {
  constructor() {
    this._interval;
    this._centisecond = 0;
    this._lapCount = 0;
    this._prevLap = 0;
  }

  get centisecond() {
    return this._centisecond;
  }

  start() {
    this._interval = setInterval(() => {
      this._centisecond += 1;
    }, 10);
  }

  pause() {
    clearInterval(this._interval);
  }

  createLap() {
    this._lapCount += 1;
    const lapTime = this._centisecond - this._prevLap;
    this._prevLap = this._centisecond;
    return [this._lapCount, lapTime];
  }

  reset() {
    this._centisecond = 0;
    this._lapCount = 0;
    this._prevLap = 0;
  }
}
