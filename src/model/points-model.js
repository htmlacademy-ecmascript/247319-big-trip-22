import {points} from '../mocks/points.js';
import {offers} from '../mocks/offers.js';
import {destinations} from '../mocks/destinations.js';
import Observable from '../framework/observable.js';

export default class PointsModel extends Observable {
  #points;
  #offers;
  #destinations;

  init() {
    this.#points = points;
    this.#offers = offers;
    this.#destinations = destinations;
  }

  get points() {
    return this.#points;
  }

  set points(routePoints) {
    this.#points = [...routePoints];
  }

  get offers() {
    return this.#offers;
  }

  get destinations() {
    return this.#destinations;
  }

  updatePoint(updateType, update) {
    const index = this.#points.findIndex((task) => task.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting task');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      update,
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    const isPointExists = this.#points.some((point) => point.id === update.id);
    if (!isPointExists) {
      this.#points = [...this.#points, update];
      this._notify(updateType, update);
    }
  }

  deletePoint(updateType, point) {
    const updatedPoints = this.#points.filter((item) => item.id !== point.id);
    this.#points = updatedPoints;
    this._notify(updateType);
  }
}
