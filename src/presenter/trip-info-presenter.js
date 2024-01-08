// import CreationFormView from '../view/creation-form-view.js';
import EditFormView from '../view/edit-form-view.js';
import PointView from '../view/point-view.js';
import TripPointsListView from '../view/trip-points-list-view.js';

import {isEscapeKey} from '../utils.js';
import {render, replace} from '../framework/render.js';

export default class TripInfoPresenter {
  #listComponent = new TripPointsListView();
  #tripEventsContainer;
  #pointModel;
  #pointComponentsMap = new Map();
  #editFormComponentsMap = new Map();
  #escapeHandler;

  constructor({tripEventsContainer, pointModel}) {
    this.#tripEventsContainer = tripEventsContainer;
    this.#pointModel = pointModel;
  }

  init() {
    const points = this.#pointModel.points;
    const destinations = this.#pointModel.destinations;
    const offers = this.#pointModel.offers;

    render(this.#listComponent, this.#tripEventsContainer);

    for (const point of points) {
      this.#renderRoutePoint(point, destinations, offers);
    }
  }

  #renderRoutePoint(point, destinations, offers) {
    const pointComponent = new PointView(
      point, destinations, offers,
      () => {
        this.#replacePointToEditForm(point);
      }
    );
    this.#pointComponentsMap.set(point.id, pointComponent);
    render(pointComponent, this.#listComponent.element);
  }

  #replacePointToEditForm = (point) => {
    const pointComponent = this.#pointComponentsMap.get(point.id);
    let editFormComponent = this.#editFormComponentsMap.get(point.id);
    if (!editFormComponent) {
      editFormComponent = new EditFormView(
        point, this.#pointModel.destinations, this.#pointModel.offers,
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
    this.#pointComponentsMap.set(point, pointComponent);
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
