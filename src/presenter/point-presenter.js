import EditFormView from '../view/edit-form-view.js';
import PointView from '../view/point-view.js';

import {isEscapeKey} from '../utils.js';
import {render, replace} from '../framework/render.js';

export default class PointPresenter {
  #listComponent;
  #pointComponentsMap = new Map();
  #editFormComponentsMap = new Map();
  #escapeHandler = null;
  #pointComponent = null;
  #editFormComponent = null;

  constructor(point, destinations, offers, listcomponent) {
    this.point = point;
    this.destinations = destinations;
    this.offers = offers;
    this.#listComponent = listcomponent;
  }

  init() {
    const point = this.point;
    const destinations = this.destinations;
    const offers = this.offers;

    this.#pointComponent = new PointView(
      point, destinations, offers,
      () => {
        this.#replacePointToEditForm(point, destinations, offers);
      }
    );
    this.#pointComponentsMap.set(point.id, this.#pointComponent);

    this.#editFormComponent = new EditFormView(
      point, destinations, offers,
      () => {
        this.#replaceEditFormToPointAfterSubmit(point);
      },
      () => {
        this.#replaceEditFormToPointAfterClick(point);
      }
    );
    this.#editFormComponentsMap.set(point.id, this.#editFormComponent);

    render(this.#pointComponent, this.#listComponent.element);
  }


  #replacePointToEditForm = (point) => {
    this.#pointComponent = this.#pointComponentsMap.get(point.id);
    this.#editFormComponent = this.#editFormComponentsMap.get(point.id);
    replace(this.#editFormComponent, this.#pointComponent);
    this.#addEscapeListener(point);
  };

  #closeEditForm = (point) => {
    this.#editFormComponent = this.#editFormComponentsMap.get(point.id);
    this.#pointComponent = this.#pointComponentsMap.get(point.id);
    replace(this.#pointComponent, this.#editFormComponent);
    document.removeEventListener('keydown', this.#escapeHandler);
  };

  #replaceEditFormToPointAfterSubmit = (point) => {
    this.#closeEditForm(point);
  };

  #replaceEditFormToPointAfterClick = (point) => {
    this.#closeEditForm(point);
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
}
