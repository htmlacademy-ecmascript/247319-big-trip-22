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
      () => this.#handlerEditFormClick(point),
    );
    this.#pointComponentsMap.set(point.id, pointComponent);
    render(pointComponent, this.#listComponent.element);
  }

  #handlerEditFormClick = (point) => {
    const pointComponent = this.#pointComponentsMap.get(point.id);
    const editFormComponent = new EditFormView(
      point, this.#pointModel.destinations, this.#pointModel.offers,
      () => this.#handlerEditFormSubmit(point),
      () => this.#handlerEditFormClose(point)
    );
    replace(editFormComponent, pointComponent);
    this.#pointComponentsMap.set(point.id, editFormComponent);
    this.#eventKeydownClose(point);
  };

  #handlerEditFormSubmit = (point) => {
    const editFormComponent = this.#pointComponentsMap.get(point.id);
    const pointComponent = new PointView(
      point, this.#pointModel.destinations, this.#pointModel.offers,
      () => this.#handlerEditFormClick(point)
    );
    replace(pointComponent, editFormComponent);
    this.#pointComponentsMap.set(point.id, pointComponent);
  };

  #handlerEditFormClose = (point) => {
    const editFormComponent = this.#pointComponentsMap.get(point.id);
    const pointComponent = new PointView(
      point, this.#pointModel.destinations, this.#pointModel.offers,
      () => this.#handlerEditFormClick(point)
    );
    replace(pointComponent, editFormComponent);
    this.#pointComponentsMap.set(point.id, pointComponent);
    document.removeEventListener('keydown', this.#eventKeydownClose);
  };

  #eventKeydownClose = (point) => {
    const eventHandler = (evt) => {
      if (isEscapeKey(evt)) {
        evt.preventDefault();
        this.#handlerEditFormClose(point);
      }
    };
    document.addEventListener('keydown', eventHandler);
  };
}
