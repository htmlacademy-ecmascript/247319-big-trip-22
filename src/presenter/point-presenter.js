import EditFormView from '../view/edit-form-view.js';
import PointView from '../view/point-view.js';

import {isEscapeKey} from '../utils.js';
import {render, replace} from '../framework/render.js';

export default class PointPresenter {
  #listComponent;
  #pointComponentsMap = new Map();
  #editFormComponentsMap = new Map();
  #escapeHandler = null;

  constructor(point, destinations, offers, listcomponent) {
    this.points = point;
    this.destinations = destinations;
    this.offers = offers;
    this.#listComponent = listcomponent;
  }

  init() {
    const point = this.points;
    const destinations = this.destinations;
    const offers = this.offers;

    this.#renderRoutePoint(point, destinations, offers);
  }

  #renderRoutePoint(point, destinations, offers) {
    const pointComponent = new PointView(
      point, destinations, offers,
      () => {
        this.#replacePointToEditForm(point, destinations, offers);
      }
    );
    this.#pointComponentsMap.set(point.id, pointComponent);
    render(pointComponent, this.#listComponent.element);
  }

  #replacePointToEditForm = (point, destinations, offers) => {
    const pointComponent = this.#pointComponentsMap.get(point.id);
    let editFormComponent = this.#editFormComponentsMap.get(point.id);
    if (!editFormComponent) {
      editFormComponent = new EditFormView(
        point, destinations, offers,
        () => {
          this.#replaceEditFormToPointAfterSubmit(point);
        },
        () => {
          this.#replaceEditFormToPointAfterClick(point);
        }
      );
      this.#editFormComponentsMap.set(point.id, editFormComponent);
    }
    replace(editFormComponent, pointComponent);
    this.#addEscapeListener(point);
  };

  #replaceEditFormToPointAfterSubmit = (point) => {
    this.#closeEditForm(point);
  };

  #replaceEditFormToPointAfterClick = (point) => {
    this.#closeEditForm(point);
  };

  #closeEditForm = (point) => {
    const editFormComponent = this.#editFormComponentsMap.get(point.id);
    const pointComponent = this.#pointComponentsMap.get(point.id);
    replace(pointComponent, editFormComponent);
    this.#pointComponentsMap.set(point.id, pointComponent);
    document.removeEventListener('keydown', this.#escapeHandler);
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
