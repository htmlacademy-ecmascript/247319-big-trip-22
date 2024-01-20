import TripPointsListView from '../view/trip-points-list-view.js';
import PointPresenter from './point-presenter.js';
import {render} from '../framework/render.js';
import {updatePoint} from '../utils.js';
export default class TripInfoPresenter {
  #listComponent;
  #tripEventsContainer;
  #pointModel;
  #pointPresenterMap = new Map();
  #pointsList = [];

  constructor({tripEventsContainer, pointModel}) {
    this.#listComponent = new TripPointsListView();
    this.#tripEventsContainer = tripEventsContainer;
    this.#pointModel = pointModel;
  }

  init() {
    this.#pointsList = [...this.#pointModel.points];
    const destinations = [...this.#pointModel.destinations];
    const offers = [...this.#pointModel.offers];

    render(this.#listComponent, this.#tripEventsContainer);

    for (const point of this.#pointsList) {
      const pointPresenter = new PointPresenter(
        point, destinations, offers, this.#listComponent,
        (updatedPoint) => this.#handlePointChange(updatedPoint),
        () => this.#handleModeChange(),
      );
      pointPresenter.init(point);
      this.#pointPresenterMap.set(point.id, pointPresenter);
    }
  }

  #handlePointChange = (updatedPoint) => {
    this.#pointsList = updatePoint(this.#pointsList, updatedPoint);
    this.#pointPresenterMap.get(updatedPoint.id).init(updatedPoint);
  };

  #handleModeChange = () => {
    this.#pointPresenterMap.forEach((presenter) => presenter.resetView());
  };
}

