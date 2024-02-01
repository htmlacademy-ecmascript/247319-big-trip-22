import TripInfoPresenter from './presenter/trip-info-presenter.js';
import PointsModel from './model/points-model.js';
import FiltersPresenter from './presenter/filters-presenter.js';
import FiltersModel from './model/filters-model.js';

const pageMainElement = document.querySelector('.page-main');
const pageHeaderElement = document.querySelector('.page-header');
const tripEventsMainContainer = pageMainElement.querySelector('.trip-events');
const tripHeaderInfoContainer = pageHeaderElement.querySelector('.trip-main');
const tripControlsFiltersElement = tripHeaderInfoContainer.querySelector('.trip-controls__filters');

const pointsModel = new PointsModel();
pointsModel.init();

const filtersModel = new FiltersModel();

const tripInfoPresenter = new TripInfoPresenter({
  tripEventsContainer: tripEventsMainContainer,
  pointsModel: pointsModel,
  filtersModel: filtersModel,
});

const filtersPresenter = new FiltersPresenter({
  filterContainer: tripControlsFiltersElement,
  filtersModel: filtersModel,
  pointsModel: pointsModel
});

filtersPresenter.init();
tripInfoPresenter.init();
