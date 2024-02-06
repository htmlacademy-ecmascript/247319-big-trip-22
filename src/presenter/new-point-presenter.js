import CreationFormView from '../view/creation-form-view.js';
import {RenderPosition, remove, render} from '../framework/render.js';
import {UserAction, UpdateType} from '../utils/const.js';
import {nanoid} from 'nanoid';
import NewPointButtonView from '../view/new-point-button-view.js';

export default class NewPointPresenter {
  #listcomponent = null;
  #handlePointChange = null;
  #createPoint;
  #creationFormComponent = null;
  #newPointButtonComponent = null;
  #newButtonConainer = document.querySelector('.trip-main');

  constructor({listComponent, onDataChange, createPoint}) {
    this.#listcomponent = listComponent;
    this.#handlePointChange = onDataChange;
    this.#createPoint = createPoint;
    this.#newPointButtonComponent = new NewPointButtonView({
      onClick: this.#handleNewPointButtonClick
    });
    render(this.#newPointButtonComponent, this.#newButtonConainer);
  }

  init(offers, destinations) {
    if (this.#creationFormComponent === null) {
      this.#creationFormComponent = new CreationFormView({
        destinations: destinations,
        offers: offers,
        onSubmit: this.#handleFormSubmit,
        onCancelClick: this.#handleCancelClick,
      });
      render(this.#creationFormComponent, this.#listcomponent.element, RenderPosition.AFTERBEGIN);
      document.addEventListener('keydown', this.#escKeyDownHandler);
    }
  }

  destroy() {
    if (this.#creationFormComponent === null) {
      return;
    }

    this.#handleNewPointFormClose();

    remove(this.#creationFormComponent);
    this.#creationFormComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleFormSubmit = (point) => {
    this.#handlePointChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      {...point, id: nanoid()},
    );
    this.destroy();
  };

  #handleCancelClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };

  #handleNewPointFormClose() {
    this.#newPointButtonComponent.element.disabled = false;
  }

  #handleNewPointButtonClick = () => {
    this.#createPoint();
    this.#newPointButtonComponent.element.disabled = true;
  };
}
