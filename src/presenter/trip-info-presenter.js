import TripPointsListView from '../view/trip-points-list-view.js';
import EmptyPointsListView from '../view/empty-points-list-view.js';
import SortingView from '../view/sorting-view.js';
import FiltersView from '../view/filters-view.js';
import TripInfoView from '../view/trip-info-view.js';
import PointPresenter from './point-presenter.js';
import {render, RenderPosition} from '../framework/render.js';
import {
  sortingPointsByPrice,
  sortingPointsByTime,
  sortingPointsByDate
} from '../utils/utils.js';
import {generateFilter} from '../mocks/filter.js';
import {SortingType, UpdateType, UserAction} from '../utils/const.js';

const pageHeaderElement = document.querySelector('.page-header');
const tripHeaderInfoContainer = pageHeaderElement.querySelector('.trip-main');
const tripControlsFiltersElement = tripHeaderInfoContainer.querySelector('.trip-controls__filters');

export default class TripInfoPresenter {
  #listComponent;
  #tripEventsContainer;
  #pointsModel;
  #pointPresenterMap = new Map();
  #sortingComponent;
  #currentSortingType = SortingType.DAY;

  constructor({tripEventsContainer, pointsModel}) {
    this.#listComponent = new TripPointsListView();
    this.#tripEventsContainer = tripEventsContainer;
    this.#pointsModel = pointsModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    switch (this.#currentSortingType) {
      case SortingType.TIME:
        return [...this.#pointsModel.points].sort(sortingPointsByTime);
      case SortingType.PRICE:
        return [...this.#pointsModel.points].sort(sortingPointsByPrice);
      // case SortingType.DAY:
      //   return [...this.#pointsModel.points].sort(sortingPointsByDate);
    }

    return [...this.#pointsModel.points].sort(sortingPointsByDate);
  }

  get offers() {
    return this.#pointsModel.offers;
  }

  get destinations() {
    return this.#pointsModel.destinations;
  }

  init() {
    const filters = generateFilter(this.#pointsModel.points);

    if (this.#pointsModel.points.length === 0) {
      render (new EmptyPointsListView(), this.#tripEventsContainer);
    } else {
      render(new TripInfoView(), tripHeaderInfoContainer, RenderPosition.AFTERBEGIN);
      render(new FiltersView({filters}), tripControlsFiltersElement);
      render(this.#listComponent, this.#tripEventsContainer);
    }

    this.#renderSorting();
    this.#renderPoints(this.points, this.destinations, this.offers);
  }

  #renderPoints(points, destinations, offers) {
    for (const point of points) {
      const pointPresenter = new PointPresenter({
        point: point,
        destinations: destinations,
        offers: offers,
        listComponent: this.#listComponent,
        onDataChange: this.#handleViewAction,
        onModeChange: this.#handleModeChange,
      });
      pointPresenter.init(point);
      this.#pointPresenterMap.set(point.id, pointPresenter);
    }
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, point) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenterMap.get(point.id).init(point);
        break;
      case UpdateType.MINOR:
        this.#clearPointsList();
        this.#renderPoints(this.points, this.destinations, this.offers);
        break;
        //вероятно мажорные обновления нужно будет улучшить с очищением всего всего или объединить два кейса
      case UpdateType.MAJOR:
        this.#clearPointsList();
        this.#renderPoints(this.points, this.destinations, this.offers);
        break;
    }
  };

  #handleModeChange = () => {
    this.#pointPresenterMap.forEach((presenter) => presenter.resetView());
  };

  #handleSortingTypeChange = (sortingType) => {
    if (this.#currentSortingType === sortingType) {
      return;
    }

    this.#currentSortingType = sortingType;
    this.#clearPointsList();
    this.#renderPoints(this.points, this.destinations, this.offers);
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

