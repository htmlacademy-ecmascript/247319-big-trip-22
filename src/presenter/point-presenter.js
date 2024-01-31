import EditFormView from '../view/edit-form-view.js';
import PointView from '../view/point-view.js';

import {isEscapeKey} from '../utils/utils.js';
import {render, replace, remove} from '../framework/render.js';
import {UpdateType, UserAction} from '../utils/const.js';

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
  #handlePointChange = null;
  #handleModeChange;
  #mode = Mode.DEFAULT;

  constructor({point, destinations, offers, listComponent, onDataChange, onModeChange}) {
    this.point = point;
    this.destinations = destinations;
    this.offers = offers;
    this.#listComponent = listComponent;
    this.#handlePointChange = onDataChange;
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
      () => this.#replacePointToEditForm(point),
      () => this.#handleFavoriteClick(point),
    );
    this.#pointComponentsMap.set(point.id, this.#pointComponent);

    this.#editFormComponent = new EditFormView(
      point, destinations, offers,
      (updatedPoint) => this.#handleFormSubmit(updatedPoint),
      () => this.#handleCloseEditForm(point),
      () => this.#handleDeleteClick(point),
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
      this.#replaceEditFormToPoint(point);
    }
  }

  #replacePointToEditForm = (point) => {
    replace(this.#editFormComponent, this.#pointComponent);
    this.#addEscapeListener(point);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  };

  #replaceEditFormToPoint = () => {
    replace(this.#pointComponent, this.#editFormComponent);
    document.removeEventListener('keydown', this.#escapeHandler);
    this.#mode = Mode.DEFAULT;
  };

  #handleFormSubmit = (update) => {
    this.#handlePointChange(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      update,
    );
    this.#replaceEditFormToPoint();
  };

  #handleCloseEditForm = () => {
    this.#editFormComponent.reset(this.point);
    this.#replaceEditFormToPoint();
  };

  #addEscapeListener = (point) => {
    this.#escapeHandler = (evt) => {
      if (isEscapeKey(evt)) {
        evt.preventDefault();
        this.#editFormComponent.reset(this.point);
        this.#replaceEditFormToPoint(point);
        document.removeEventListener('keydown', this.#escapeHandler);
      }
    };
    document.addEventListener('keydown', this.#escapeHandler);
  };

  #handleFavoriteClick = () => {
    this.#handlePointChange(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      {...this.point, isFavorite: !this.point.isFavorite});
  };

  #handleDeleteClick = (point) => {
    this.#handlePointChange(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point,
    );
  };
}
