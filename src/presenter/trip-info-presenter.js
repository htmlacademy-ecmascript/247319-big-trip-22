import TripPointsListView from '../view/trip-points-list-view.js';
import EmptyPointsListView from '../view/empty-points-list-view.js';
import SortingView from '../view/sorting-view.js';
import FiltersView from '../view/filters-view.js';
import TripInfoView from '../view/trip-info-view.js';
import PointPresenter from './point-presenter.js';
import {render, RenderPosition} from '../framework/render.js';
import {updatePoint} from '../utils/utils.js';
import {generateFilter} from '../mocks/filter.js';

const pageHeaderElement = document.querySelector('.page-header');
const pageMainElement = document.querySelector('.page-main');
const tripEventsMainContainer = pageMainElement.querySelector('.trip-events');
const tripHeaderInfoContainer = pageHeaderElement.querySelector('.trip-main');
const tripControlsFiltersElement = tripHeaderInfoContainer.querySelector('.trip-controls__filters');

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

    const filters = generateFilter(this.#pointsList);

    if (this.#pointsList.length === 0) {
      render (new EmptyPointsListView(), this.#tripEventsContainer);
    } else {
      render(new TripInfoView(), tripHeaderInfoContainer, RenderPosition.AFTERBEGIN);
      render(new FiltersView({filters}), tripControlsFiltersElement);
      render(new SortingView(), tripEventsMainContainer);
      render(this.#listComponent, this.#tripEventsContainer);
    }

    for (const point of this.#pointsList) {
      const pointPresenter = new PointPresenter({
        point: this.point,
        destinations: destinations,
        offers: offers,
        listComponent: this.#listComponent,
        onDataChange: this.#handlePointChange,
        onModeChange: this.#handleModeChange,
      });
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

