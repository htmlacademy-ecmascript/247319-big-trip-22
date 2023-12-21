import {points} from '../mocks/points.js';
import {offers} from '../mocks/offers.js';
import {destinations} from '../mocks/destinations.js';

export default class PointModel {
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

  get offers() {
    return this.#offers;
  }

  get destinations() {
    return this.#destinations;
  }
}
