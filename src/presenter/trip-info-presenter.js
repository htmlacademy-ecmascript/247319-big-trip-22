import TripPointsListView from '../view/trip-points-list-view.js';
import EmptyPointsListView from '../view/empty-points-list-view.js';
import SortingView from '../view/sorting-view.js';
import FiltersView from '../view/filters-view.js';
import TripInfoView from '../view/trip-info-view.js';
import PointPresenter from './point-presenter.js';
import {render, RenderPosition} from '../framework/render.js';
import {
  updatePoint,
  sortingPointsByPrice,
  sortingPointsByTime,
} from '../utils/utils.js';
import {generateFilter} from '../mocks/filter.js';
import { SortingType } from '../utils/const.js';

const pageHeaderElement = document.querySelector('.page-header');
const tripHeaderInfoContainer = pageHeaderElement.querySelector('.trip-main');
const tripControlsFiltersElement = tripHeaderInfoContainer.querySelector('.trip-controls__filters');

export default class TripInfoPresenter {
  #listComponent;
  #tripEventsContainer;
  #pointModel;
  #pointPresenterMap = new Map();
  #sortingComponent;
  #pointsList = [];
  #sourcePoints = [];

  constructor({tripEventsContainer, pointModel}) {
    this.#listComponent = new TripPointsListView();
    this.#tripEventsContainer = tripEventsContainer;
    this.#pointModel = pointModel;
  }

  init() {
    this.#pointsList = [...this.#pointModel.points];
    this.#sourcePoints = [...this.#pointModel.points];
    const destinations = [...this.#pointModel.destinations];
    const offers = [...this.#pointModel.offers];

    const filters = generateFilter(this.#pointsList);

    if (this.#pointsList.length === 0) {
      render (new EmptyPointsListView(), this.#tripEventsContainer);
    } else {
      render(new TripInfoView(), tripHeaderInfoContainer, RenderPosition.AFTERBEGIN);
      render(new FiltersView({filters}), tripControlsFiltersElement);
      render(this.#listComponent, this.#tripEventsContainer);
    }

    this.#renderSorting();
    this.#renderPoints(this.#pointsList, destinations, offers);
  }

  #renderPoints(points, destinations, offers) {
    for (const point of points) {
      const pointPresenter = new PointPresenter({
        point: point,
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
    this.#sourcePoints = updatePoint(this.#sourcePoints, updatedPoint);
    this.#pointPresenterMap.get(updatedPoint.id).init(updatedPoint);
  };

  #handleModeChange = () => {
    this.#pointPresenterMap.forEach((presenter) => presenter.resetView());
  };

  #sortPoints(sortingType) {
    switch (sortingType) {
      case SortingType.TIME:
        this.#pointsList.sort(sortingPointsByTime);
        break;
      case SortingType.PRICE:
        this.#pointsList.sort(sortingPointsByPrice);
        break;
      default:
        this.#pointsList = [...this.#sourcePoints];
    }
  }

  #handleSortingTypeChange = (sortingType) => {
    this.#sortPoints(sortingType);
    this.#clearPointsList();
    this.#renderPoints(this.#pointsList, this.#pointModel.destinations, this.#pointModel.offers);
  };

  #renderSorting() {
    this.#sortingComponent = new SortingView({
      onSortingTypeChange: this.#handleSortingTypeChange
    });

    render(this.#sortingComponent, this.#tripEventsContainer, RenderPosition.AFTERBEGIN);
  }

  #clearPointsList() {
    this.#pointPresenterMap.forEach((presenter) => presenter.destroy());
    this.#pointPresenterMap.clear();
  }
}

