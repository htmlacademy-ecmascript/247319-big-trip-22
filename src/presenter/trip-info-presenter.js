import TripPointsListView from '../view/trip-points-list-view.js';
import PointPresenter from './point-presenter.js';
import {render} from '../framework/render.js';

export default class TripInfoPresenter {
  #listComponent;
  #tripEventsContainer;
  #pointModel;
  #pointPresenterMap = new Map();

  constructor({tripEventsContainer, pointModel}) {
    this.#listComponent = new TripPointsListView();
    this.#tripEventsContainer = tripEventsContainer;
    this.#pointModel = pointModel;
  }

  init() {
    const points = this.#pointModel.points;
    const destinations = this.#pointModel.destinations;
    const offers = this.#pointModel.offers;

    render(this.#listComponent, this.#tripEventsContainer);

    for (const point of points) {
      const pointPresenter = new PointPresenter(
        point, destinations, offers, this.#listComponent,
      );
      pointPresenter.init();
      this.#pointPresenterMap.set(point.id, pointPresenter);
    }
  }

}

