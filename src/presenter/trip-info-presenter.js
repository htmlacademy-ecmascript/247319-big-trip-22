import TripPointsListView from '../view/trip-points-list-view.js';
import EmptyPointsListView from '../view/empty-points-list-view.js';
import SortingView from '../view/sorting-view.js';
import TripInfoView from '../view/trip-info-view.js';
import LoadingView from '../view/loading-view.js';
import PointPresenter from './point-presenter.js';
import NewPointPresenter from './new-point-presenter.js';
import {filter} from '../utils/filter.js';
import {render, remove, RenderPosition} from '../framework/render.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import {
  sortingPointsByPrice,
  sortingPointsByTime,
  sortingPointsByDate,
} from '../utils/utils.js';
import {FilterType, SortingType, UpdateType, UserAction} from '../utils/const.js';

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};
const pageHeaderElement = document.querySelector('.page-header');
const tripHeaderInfoContainer = pageHeaderElement.querySelector('.trip-main');
export default class TripInfoPresenter {
  #tripEventsContainer;
  #listComponent = new TripPointsListView();
  #tripInfoComponent = new TripInfoView();
  #pointsModel = null;
  #filtersModel = null;
  #offers = [];
  #destinations = [];
  #filterType;
  #pointPresenterMap = new Map();
  #newPointPresenter = null;
  #sortingComponent = null;
  #currentSortingType = SortingType.DAY;
  #emptyPointsListComponent;
  #loadingComponent = new LoadingView();
  #isLoading = true;
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

  constructor({tripEventsContainer, pointsModel, filtersModel, onNewPointDestroy}) {
    this.#tripEventsContainer = tripEventsContainer;
    this.#pointsModel = pointsModel;
    this.#filtersModel = filtersModel;

    this.#newPointPresenter = new NewPointPresenter({
      listComponent: this.#listComponent,
      pointsModel: this.#pointsModel,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewPointDestroy,
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

  init() {
    this.#renderMainContent();
  }

  createPoint() {
    this.#currentSortingType = SortingType.DAY;
    this.#filtersModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newPointPresenter.init(this.#destinations, this.#offers);
  }

  #renderPoint(point, destinations, offers) {
    const pointPresenter = new PointPresenter({
      listComponent: this.#listComponent,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
    });
    pointPresenter.init(point, destinations, offers);
    this.#pointPresenterMap.set(point.id, pointPresenter);
  }

  #renderPoints(points) {
    points.forEach((point) => this.#renderPoint(point, this.#destinations, this.#offers));
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#tripEventsContainer, RenderPosition.AFTERBEGIN);
  }

  #renderNoPoints() {
    this.#emptyPointsListComponent = new EmptyPointsListView({
      filterType: this.#filterType
    });

    render(this.#emptyPointsListComponent, this.#tripEventsContainer);
  }

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointPresenterMap.get(update.id).setSaving();
        try {
          await this.#pointsModel.updatePoint(updateType, update);
        } catch(err) {
          this.#pointPresenterMap.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_POINT:
        this.#newPointPresenter.setSaving();
        try {
          await this.#pointsModel.addPoint(updateType, update);
        } catch(err) {
          this.#newPointPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#pointPresenterMap.get(update.id).setDeleting();
        try {
          await this.#pointsModel.deletePoint(updateType, update);
        } catch(err) {
          this.#pointPresenterMap.get(update.id).setAborting();
        }
        break;
    }
    this.#uiBlocker.unblock();
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenterMap.get(data.id).init(data, this.#destinations, this.#offers);
        break;
      case UpdateType.MINOR:
        this.#clearPointsList();
        this.#renderMainContent();
        break;
      case UpdateType.MAJOR:
        this.#clearPointsList({resetSortingType: true});
        this.#renderMainContent();
        break;
      case UpdateType.INIT:
        this.#offers = [...this.#pointsModel.offers];
        this.#destinations = [...this.#pointsModel.destinations];
        this.#isLoading = false;
        remove(this.#loadingComponent);
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

  #clearPointsList({resetSortingType = false} = {}) {
    this.#newPointPresenter.destroy();
    this.#pointPresenterMap.forEach((presenter) => presenter.destroy());
    this.#pointPresenterMap.clear();

    remove(this.#sortingComponent);
    remove(this.#tripInfoComponent);

    if (this.#emptyPointsListComponent) {
      remove(this.#emptyPointsListComponent);
    }
    if (resetSortingType) {
      this.#currentSortingType = SortingType.DAY;
    }
  }

  #renderMainContent() {
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    const points = this.points;
    const pointCount = points.length;

    if (pointCount === 0) {
      this.#renderNoPoints();
      return;
    }
    render(this.#tripInfoComponent, tripHeaderInfoContainer, RenderPosition.AFTERBEGIN);
    this.#renderSorting();
    render(this.#listComponent, this.#tripEventsContainer);
    this.#renderPoints(points);
  }
}

