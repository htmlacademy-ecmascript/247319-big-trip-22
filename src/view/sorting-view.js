import AbstractView from '../framework/view/abstract-view.js';
import {SortingType} from '../utils/const.js';

function createNewSortingTemplate() {
  return (`<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
  <div class="trip-sort__item  trip-sort__item--day">
    <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" data-sorting-type="${SortingType.DAY}" checked>
    <label class="trip-sort__btn" for="sort-day">Day</label>
  </div>

  <div class="trip-sort__item  trip-sort__item--event">
    <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>
    <label class="trip-sort__btn" for="sort-event">Event</label>
  </div>

  <div class="trip-sort__item  trip-sort__item--time">
    <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time" data-sorting-type="${SortingType.TIME}">
    <label class="trip-sort__btn" for="sort-time">Time</label>
  </div>

  <div class="trip-sort__item  trip-sort__item--price">
    <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price" data-sorting-type="${SortingType.PRICE}">
    <label class="trip-sort__btn" for="sort-price">Price</label>
  </div>

  <div class="trip-sort__item  trip-sort__item--offer">
    <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>
    <label class="trip-sort__btn" for="sort-offer">Offers</label>
  </div>
</form>`);
}

export default class SortingView extends AbstractView {
  #handleSortingTypeChange;

  constructor({onSortingTypeChange}) {
    super();
    this.#handleSortingTypeChange = onSortingTypeChange;

    this.element.addEventListener('change', this.#sortingTypeChangeHandler);
  }

  get template() {
    return createNewSortingTemplate();
  }

  #sortingTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleSortingTypeChange(evt.target.dataset.sortingType);
  };
}
