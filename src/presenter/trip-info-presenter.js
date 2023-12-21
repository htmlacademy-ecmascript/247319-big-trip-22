import CreationFormView from '../view/creation-form-view.js';
import EditFormView from '../view/edit-form-view.js';
import PointView from '../view/point-view.js';
import TripPointsListView from '../view/trip-points-list-view.js';

import {render} from '../framework/render.js';

export default class TripInfoPresenter {
  #listComponent = new TripPointsListView();
  #tripEventsContainer;
  #pointModel;

  constructor({tripEventsContainer, pointModel}) {
    this.#tripEventsContainer = tripEventsContainer;
    this.#pointModel = pointModel;
  }

  init() {
    const points = this.#pointModel.points;
    const destinations = this.#pointModel.destinations;
    const offers = this.#pointModel.offers;

    render(this.#listComponent, this.#tripEventsContainer);
    render(new CreationFormView(points[1], destinations, offers), this.#listComponent.element);
    render(new EditFormView(points[2], destinations, offers), this.#listComponent.element);

    for (const point of points) {
      render(new PointView(point, destinations, offers), this.#listComponent.element);
    }
  }
}
