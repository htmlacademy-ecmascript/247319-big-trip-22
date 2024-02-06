import AbstractView from '../framework/view/abstract-view.js';
import {FilterType} from '../utils/const.js';

const EmptyPointsListTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'Click New Event to create your first point',
  [FilterType.PRESENT]: 'Click New Event to create your first point',
  [FilterType.PAST]: 'There are no route points in the past'
};

function createEmptyPointsListTemplate (filterType) {
  const emptyPointsListValue = EmptyPointsListTextType[filterType];

  return (
    `<p class="trip-events__msg">
      ${emptyPointsListValue}
    </p>`);
}

export default class EmptyPointsListView extends AbstractView {
  #filterType = null;

  constructor({filterType}) {
    super();
    this.#filterType = filterType;
  }

  get template () {
    return createEmptyPointsListTemplate(this.#filterType);
  }
}
