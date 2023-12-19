import {points} from '../mocks/points.js';

export default class PointModel {
  constructor() {
    this.points = [];
  }

  init() {
    this.points = points;
  }

  getPoints() {
    return this.points;
  }
}
