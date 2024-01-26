import AbstractView from '../framework/view/abstract-view.js';
import {humanizeDate, getTimeDifference} from '../utils/utils.js';
import {createOffersShortTemplate} from '../utils/markup-utils.js';

function createPointTemplate(point, destinations, offers) {
  const {basePrice, dateFrom, dateTo, isFavorite, type, destination} = point;
  const upperCaseFirstletterType = type.charAt(0).toUpperCase() + type.slice(1);
  const pointDestination = destinations.find((dest) => dest.id === destination);
  const {name: namePointDestination} = pointDestination || {};
  const typeOffers = offers.find((offer) => offer.type === type).offers;
  const checkedOffers = typeOffers.filter((typeOffer) => point.offers.includes(typeOffer.id));
  const pointOffers = checkedOffers ? checkedOffers.map((offer) => createOffersShortTemplate(offer)).join('') : '';
  const favoriteClass = isFavorite === true ? 'event__favorite-btn--active' : '';

  return (`<li class="trip-events__item">
  <div class="event">
    <time class="event__date" datetime=${dateFrom}>${humanizeDate(dateFrom)}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${upperCaseFirstletterType} ${namePointDestination}</h3>
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

export default class PointView extends AbstractView {
  #handleOpenEditClick = null;
  #handleFavoriteClick = null;

  constructor(point, destinations, offers, onClick, onFavoriteClick) {
    super();
    this.point = point;
    this.destinations = destinations;
    this.offers = offers;
    this.#handleOpenEditClick = onClick;
    this.#handleFavoriteClick = onFavoriteClick;
    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#openClickHandler);
    this.element.querySelector('.event__favorite-btn')
      .addEventListener('click', this.#favoriteClickHandler);
  }

  get template() {
    return createPointTemplate(this.point, this.destinations, this.offers);
  }

  #openClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleOpenEditClick();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleFavoriteClick();
  };
}
