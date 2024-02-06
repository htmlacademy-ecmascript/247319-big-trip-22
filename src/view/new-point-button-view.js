import AbstractView from '../framework/view/abstract-view.js';

function createNewPointButtonTemplate() {
  return (`
    <button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>
  `);
}

export default class NewPointButtonView extends AbstractView {
  #handleNewPointButtonClick = null;

  constructor({onClick}) {
    super();
    this.#handleNewPointButtonClick = onClick;
    this.element.addEventListener('click', this.#onNewButtonClickHandler);
  }

  get template() {
    return createNewPointButtonTemplate();
  }

  #onNewButtonClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleNewPointButtonClick();
  };
}
