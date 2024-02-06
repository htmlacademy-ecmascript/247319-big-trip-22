import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {formatDateInForm} from '../utils/utils.js';
import {
  createEventTypeShortTemplate,
  createDestinationsShortTemplate,
  createOffersTemplate,
  createPhotoTemplate
} from '../utils/markup-utils.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

function createEditFormTemplate(point, destinations, offers) {
  const {basePrice, dateFrom, dateTo, type, destination, offers: checkedOffers} = point;
  const pointId = point.id || 0;
  const pointDestination = destinations.find((dest) => dest.id === destination);
  const {name = '', description = '', pictures = ''} = pointDestination || {};
  const pointsType = offers.map((pointType) => createEventTypeShortTemplate(pointType.type)).join('');
  const destinationsList = destinations.map((dest) => createDestinationsShortTemplate(dest)).join('');
  const typeOffers = offers.find((offer) => offer.type === type);
  const pointOffers = typeOffers ? typeOffers.offers.map((offer) => createOffersTemplate(offer, checkedOffers)).join('') : '';

  return (`<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
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
        <input class="event__input  event__input--destination" id="event-destination-${pointId}" type="text" name="event-destination" value="${name}" list="destination-list-${pointId}" required>
        <datalist id="destination-list-${pointId}">
          ${destinationsList}
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
        <input class="event__input  event__input--price" id="event-price-${pointId}" type="number" name="event-price" value="${basePrice}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
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
        ${createPhotoTemplate(pictures)}
      </section>
    </section>
  </form></li>`);
}

export default class EditFormView extends AbstractStatefulView {
  #handleFormSubmit;
  #handleCloseEditForm;
  #dateFromPicker;
  #dateToPicker;
  #handleDeleteClick;

  constructor({point, destinations, offers, onSubmit, onClick, onDeleteClick}) {
    super();
    this.point = point;
    this.offers = offers;
    this.destinations = destinations;
    this.#handleFormSubmit = onSubmit;
    this.#handleCloseEditForm = onClick;
    this.#handleDeleteClick = onDeleteClick;
    this._setState(EditFormView.parsePointToState(point));
    this._restoreHandlers();
  }

  _restoreHandlers() {
    this.element.querySelector('.event--edit').addEventListener('submit', this.#submitHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#closeClickHandler);
    this.element.querySelectorAll('.event__type-input').forEach((radio) => {
      radio.addEventListener('change', this.#changeTypeHandler);
    });
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#changeDestinationHandler);
    this.element.querySelector('.event__input--price').addEventListener('input', this.#priceChangeHandler);
    this.element.querySelectorAll('.event__offer-checkbox').forEach((checkbox) => {
      checkbox.addEventListener('change', this.#offersChangeHandler);
    });
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#editFormDeleteClickHandler);
    this.#setDatePickerFrom();
    this.#setDatePickerTo();
  }

  get template() {
    return createEditFormTemplate(this._state, this.destinations, this.offers);
  }

  removeElement() {
    super.removeElement();

    if(this.#dateFromPicker) {
      this.#dateFromPicker.destroy();
      this.#dateFromPicker = null;
    }

    if(this.#dateToPicker) {
      this.#dateToPicker.destroy();
      this.#dateToPicker = null;
    }
  }

  reset(point) {
    this.updateElement(EditFormView.parsePointToState(point));
  }

  #submitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(EditFormView.parseStateToPoint(this._state));
  };

  #closeClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleCloseEditForm();
  };

  #changeTypeHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      type: evt.target.value,
    });
    this.updateElement(this._state);
  };

  #changeDestinationHandler = (evt) => {
    evt.preventDefault();
    const newDestination = this.destinations.find((dest) => dest.name === evt.target.value);
    if (newDestination) {
      this._setState({
        destination: newDestination.id,
        description: newDestination.description,
        pictures: newDestination.pictures,
      });
      this.updateElement(this._state);
    }
  };

  #priceChangeHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      basePrice: evt.target.value,
    });
  };

  #offersChangeHandler = () => {
    const selectedOffers = Array
      .from(this.element.querySelectorAll('.event__offer-checkbox:checked'))
      .map((input) => input.id);

    this._setState({
      offers: selectedOffers,
    });
    this.updateElement(this._state);
  };

  #editFormDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(EditFormView.parseStateToPoint(this._state));
  };

  #setDatePickerFrom() {
    if (this._state.dateFrom) {
      this.#dateFromPicker = flatpickr(
        this.element.querySelector('input[name="event-start-time"]'),
        {
          enableTime: true,
          dateFormat: 'd/m/y H:i',
          defaultDate: this._state.dateFrom,
          maxDate: this._state.dateTo,
          onChange: this.#dateFromChangeHandler,
        },
      );
    }
  }

  #dateFromChangeHandler = ([userDate]) => {
    this.updateElement({
      dateFrom: userDate.toISOString(),
    });
  };

  #setDatePickerTo() {
    if (this._state.dateTo) {
      this.#dateToPicker = flatpickr(
        this.element.querySelector('input[name="event-end-time"]'),
        {
          enableTime: true,
          dateFormat: 'd/m/y H:i',
          defaultDate: this._state.dateTo,
          minDate: this._state.dateFrom,
          onChange: this.#dateToChangeHandler,
        },
      );
    }
  }

  #dateToChangeHandler = ([userDate]) => {
    this.updateElement({
      dateTo: userDate.toISOString(),
    });
  };

  static parsePointToState(point) {
    return {...point};
  }

  static parseStateToPoint(state) {
    const point = {...state};

    return point;
  }
}
