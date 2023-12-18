import {createElement} from '../render.js';
import {formatDateInForm} from '../utils.js';
import {createEventTypeShortTemplate, createDestinationsShortTemplate, createOffersTemplate} from '../markup-utils.js';
import {POINT_TYPES} from '../const.js';

function createCreationFormTemplate(points, destinations, offers) {
  const {basePrice, dateFrom, dateTo, type, offers: checkedOffers} = points;
  const pointId = points.id || 0;
  const pointDestination = destinations.find((destination) => destination.id === points.destination);
  const {name, description} = pointDestination || {};
  const pointsType = POINT_TYPES.map((pointType) => createEventTypeShortTemplate({pointType, pointId, type})).join('');
  const destinationsList = destinations.map((destination) => createDestinationsShortTemplate(destination)).join('');
  const typeOffers = offers.find((offer) => offer.type === points.type);
  const pointOffers = typeOffers ? typeOffers.offers.map((offer) => createOffersTemplate(offer, checkedOffers)).join('') : '';

  return (`<li class="trip-events__item"><form class="event event--edit" action="#" method="post">
  <header class="event__header">
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-${pointId}">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${pointId}" type="checkbox">

      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>
          ${pointsType}
        </fieldset>
      </div>
    </div>

    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-${pointId}">
        ${type}
      </label>
      <input class="event__input  event__input--destination" id="event-destination-${pointId}" type="text" name="event-destination" value="${name || ''}" list="destination-list-${pointId}">
      <datalist id="destination-list-${pointId}">
        ${destinationsList};
      </datalist>
    </div>

    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-${pointId}">From</label>
      <input class="event__input  event__input--time" id="event-start-time-${pointId}" type="text" name="event-start-time" value="${formatDateInForm(dateFrom)}">
      &mdash;
      <label class="visually-hidden" for="event-end-time-${pointId}">To</label>
      <input class="event__input  event__input--time" id="event-end-time-${pointId}" type="text" name="event-end-time" value="${formatDateInForm(dateTo)}">
    </div>

    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-${pointId}">
        <span class="visually-hidden">Price</span>
        &euro;
      </label>
      <input class="event__input  event__input--price" id="event-price-${pointId}" type="text" name="event-price" value="${basePrice}">
    </div>

    <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
    <button class="event__reset-btn" type="reset">Cancel</button>
  </header>
  <section class="event__details">
    <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
          ${pointOffers}
        </div>
    </section>
    <section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${description}</p>
     </section>
  </section>
  </form></li>`);
}

export default class CreationFormView {
  constructor(points, destinations, offers) {
    this.points = points;
    this.offers = offers;
    this.destinations = destinations;
  }

  getTemplate() {
    return createCreationFormTemplate(this.points, this.destinations, this.offers);
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
