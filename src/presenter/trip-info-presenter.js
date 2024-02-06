import TripPointsListView from '../view/trip-points-list-view.js';
import EmptyPointsListView from '../view/empty-points-list-view.js';
import SortingView from '../view/sorting-view.js';
import TripInfoView from '../view/trip-info-view.js';
import PointPresenter from './point-presenter.js';
import NewPointPresenter from './new-point-presenter.js';
import {filter} from '../utils/filter.js';
import {render, remove, RenderPosition} from '../framework/render.js';
import {
  sortingPointsByPrice,
  sortingPointsByTime,
  sortingPointsByDate,
} from '../utils/utils.js';
import {FilterType, SortingType, UpdateType, UserAction} from '../utils/const.js';

const pageHeaderElement = document.querySelector('.page-header');
const tripHeaderInfoContainer = pageHeaderElement.querySelector('.trip-main');
export default class TripInfoPresenter {
  #tripEventsContainer;
  #listComponent = new TripPointsListView();
  #tripInfoComponent = new TripInfoView();
  #pointsModel;
  #filtersModel = null;
  #filterType;
  #pointPresenterMap = new Map();
  #newPointPresenter;
  #sortingComponent;
  #currentSortingType = SortingType.DAY;
  #emptyPointsListComponent;

  constructor({tripEventsContainer, pointsModel, filtersModel}) {
    this.#tripEventsContainer = tripEventsContainer;
    this.#pointsModel = pointsModel;
    this.#filtersModel = filtersModel;

    this.#newPointPresenter = new NewPointPresenter({
      listComponent: this.#listComponent,
      onDataChange: this.#handleViewAction,
      createPoint: this.#createPoint,
    });

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filtersModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#filterType = this.#filtersModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortingType) {
      case SortingType.TIME:
        return filteredPoints.sort(sortingPointsByTime);
      case SortingType.PRICE:
        return filteredPoints.sort(sortingPointsByPrice);
    }

    return filteredPoints.sort(sortingPointsByDate);
  }

  get destinations() {
    return this.#pointsModel.destinations;
  }

  get offers() {
    return this.#pointsModel.offers;
  }

  init() {
    this.#renderMainContent();
  }

  #createPoint = () => {
    this.#currentSortingType = SortingType.DAY;
    this.#filtersModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newPointPresenter.init(this.offers, this.destinations);
  };

  #renderPoint(point, destinations, offers) {
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

  #renderPoints(points) {
    points.forEach((point) => this.#renderPoint(point, this.destinations, this.offers));
  }

  #renderNoPoints() {
    this.#emptyPointsListComponent = new EmptyPointsListView({
      filterType: this.#filterType
    });

    render(this.#emptyPointsListComponent, this.#tripEventsContainer);
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
        this.#renderMainContent();
        break;
        //вероятно мажорные обновления нужно будет улучшить с очищением всего всего или объединить два кейса
      case UpdateType.MAJOR:
        this.#clearPointsList();
        this.#renderMainContent();
        break;
    }
  };

  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
    this.#pointPresenterMap.forEach((presenter) => presenter.resetView());
  };

  #handleSortingTypeChange = (sortingType) => {
    if (this.#currentSortingType === sortingType) {
      return;
    }

    this.#currentSortingType = sortingType;
    this.#clearPointsList();
    this.#renderMainContent();
  };

  #renderSorting() {
    this.#sortingComponent = new SortingView({
      onSortingTypeChange: this.#handleSortingTypeChange,
      currentSortingType: this.#currentSortingType
    });

    render(this.#sortingComponent, this.#tripEventsContainer, RenderPosition.AFTERBEGIN);
  }

  #clearPointsList() {
    this.#newPointPresenter.destroy();
    this.#pointPresenterMap.forEach((presenter) => presenter.destroy());
    this.#pointPresenterMap.clear();

    remove(this.#sortingComponent);
    remove(this.#tripInfoComponent);

    if (this.#emptyPointsListComponent) {
      remove(this.#emptyPointsListComponent);
    }
  }

  #renderMainContent() {
    const points = this.points;
    const pointCount = points.length;

    if (pointCount === 0) {
      this.#renderNoPoints();
      return;
    }
    render(this.#tripInfoComponent, tripHeaderInfoContainer, RenderPosition.AFTERBEGIN);
    this.#renderSorting();
    render(this.#listComponent, this.#tripEventsContainer);
    this.#renderPoints(this.points, this.destinations, this.offers);
  }
}

