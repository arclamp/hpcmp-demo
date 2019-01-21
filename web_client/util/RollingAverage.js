export default class RollingAverage {
  constructor (size) {
    this.size = size;
    this.p = 0;
    this.data = [];
  }

  add (value) {
    this.data[this.p] = value;
    this.p = (this.p + 1) % this.size;
  }

  average () {
    return this.data.reduce((total, next) => total + next) / this.data.length;
  }
}
