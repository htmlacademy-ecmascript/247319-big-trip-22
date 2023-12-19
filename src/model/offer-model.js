import {offers} from '../mocks/offers.js';

export default class OfferModel {
  constructor() {
    this.offers = [];
  }

  init() {
    this.offers = offers;
  }

  getOffers() {
    return this.offers;
  }
}
