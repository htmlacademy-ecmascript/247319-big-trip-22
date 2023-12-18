import {createElement} from '../render.js';
import {humanizeDate, getTimeDifference} from '../utils.js';
import {createOffersShortTemplate} from '../markup-utils.js';

function createPointTemplate(points, destinations, offers) {
  const {basePrice, dateFrom, dateTo, isFavorite, type} = points;
  const upperCaseFirstletterType = type.charAt(0).toUpperCase() + type.slice(1);
  const pointDestination = destinations.find((destination) => destination.id === points.destination).name;
  const typeOffers = offers.find((offer) => offer.type === points.type).offers;
  const checkedOffers = typeOffers.filter((typeOffer) => points.offers.includes(typeOffer.id));
  const pointOffers = checkedOffers ? checkedOffers.map((offer) => createOffersShortTemplate(offer)).join('') : '';
  const favoriteClass = isFavorite === true ? 'event__favorite-btn--active' : '';

  return (`<li class="trip-events__item">
  <div class="event">
    <time class="event__date" datetime=${dateFrom}>${humanizeDate(dateFrom)}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${upperCaseFirstletterType} ${pointDestination}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime=${dateFrom}>${humanizeDate(dateFrom)}</time>
        —
        <time class="event__end-time" datetime=${dateTo}>${humanizeDate(dateTo)}</time>
      </p>
      <p class="event__duration">${getTimeDifference(dateFrom, dateTo)}</p>
    </div>
    <p class="event__price">
      €&nbsp;<span class="event__price-value">${basePrice}</span>
    </p>
    <h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
    ${pointOffers}
    </ul>
    <button class="event__favorite-btn ${favoriteClass}" type="button">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"></path>
      </svg>
    </button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
  </li>`);
}

export default class PointView {
  constructor(points, destinations, offers) {
    this.points = points;
    this.offers = offers;
    this.destinations = destinations;
  }

  getTemplate() {
    return createPointTemplate(this.points, this.destinations, this.offers);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
