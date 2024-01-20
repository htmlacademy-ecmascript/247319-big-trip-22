import EditFormView from '../view/edit-form-view.js';
import PointView from '../view/point-view.js';

import {isEscapeKey} from '../utils.js';
import {render, replace, remove} from '../framework/render.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PointPresenter {
  #listComponent = null;
  #pointComponentsMap = new Map();
  #editFormComponentsMap = new Map();
  #escapeHandler = null;
  #pointComponent = null;
  #editFormComponent = null;
  #handleDataChange = null;
  #handleModeChange;
  #mode = Mode.DEFAULT;

  constructor(point, destinations, offers, listComponent, onDataChange, onModeChange) {
    this.point = point;
    this.destinations = destinations;
    this.offers = offers;
    this.#listComponent = listComponent;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(point) {
    this.point = point;
    const destinations = this.destinations;
    const offers = this.offers;

    const prevPointComponent = this.#pointComponent;
    const prevEditFormComponent = this.#editFormComponent;

    this.#pointComponent = new PointView(
      point, destinations, offers,
      () => this.#handleOpenEditClick(point),
      () => this.#handleFavoriteClick(point),
    );
    this.#pointComponentsMap.set(point.id, this.#pointComponent);

    this.#editFormComponent = new EditFormView(
      point, destinations, offers,
      () => this.#handleFormSubmit(point),
      () => this.#handleCloseEditForm(point),
    );
    this.#editFormComponentsMap.set(point.id, this.#editFormComponent);

    if (prevPointComponent === null || prevEditFormComponent === null) {
      render(this.#pointComponent, this.#listComponent.element);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace (this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace (this.#editFormComponent, prevEditFormComponent);
    }

    remove(prevPointComponent);
    remove(prevEditFormComponent);
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#editFormComponent);
  }

  resetView(point) {
    if (this.#mode !== Mode.DEFAULT) {
      this.#closeEditForm(point);
    }
  }

  #handleOpenEditClick = (point) => {
    replace(this.#editFormComponent, this.#pointComponent);
    this.#addEscapeListener(point);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  };

  #closeEditForm = () => {
    replace(this.#pointComponent, this.#editFormComponent);
    document.removeEventListener('keydown', this.#escapeHandler);
    this.#mode = Mode.DEFAULT;
  };

  #handleFormSubmit = (point) => {
    this.#closeEditForm();
    this.#handleDataChange(point);
  };

  #handleCloseEditForm = () => {
    this.#closeEditForm();
  };

  #addEscapeListener = (point) => {
    this.#escapeHandler = (evt) => {
      if (isEscapeKey(evt)) {
        evt.preventDefault();
        this.#closeEditForm(point);
        document.removeEventListener('keydown', this.#escapeHandler);
      }
    };
    document.addEventListener('keydown', this.#escapeHandler);
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange({...this.point, isFavorite: !this.point.isFavorite});
  };
}
