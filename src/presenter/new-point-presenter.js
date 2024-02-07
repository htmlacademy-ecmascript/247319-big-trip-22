import CreationFormView from '../view/creation-form-view.js';
import {RenderPosition, remove, render} from '../framework/render.js';
import {UserAction, UpdateType} from '../utils/const.js';

export default class NewPointPresenter {
  #listcomponent = null;
  #handlePointChange = null;
  #creationFormComponent = null;
  #handleDestroy = null;

  constructor({listComponent, onDataChange, onDestroy}) {
    this.#listcomponent = listComponent;
    this.#handlePointChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init(destinations, offers) {
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

    this.#handleDestroy();

    remove(this.#creationFormComponent);
    this.#creationFormComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  setSaving() {
    this.#creationFormComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting() {
    const resetFormState = () => {
      this.#creationFormComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#creationFormComponent.shake(resetFormState);
  }

  #handleFormSubmit = (point) => {
    this.#handlePointChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point,
    );
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
}
