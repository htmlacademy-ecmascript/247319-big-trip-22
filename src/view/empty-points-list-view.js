import AbstractView from '../framework/view/abstract-view.js';

function createEmptyPointsListTemplate () {
  return (
    `<p class="trip-events__msg">
      Click New Event to create your first point
    </p>`);
}

export default class EmptyPointsListView extends AbstractView {
  get template () {
    return createEmptyPointsListTemplate();
  }
}
