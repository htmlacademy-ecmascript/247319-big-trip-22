import PointsModel from './model/points-model.js';
import FiltersModel from './model/filters-model.js';
import TripInfoPresenter from './presenter/trip-info-presenter.js';
import FiltersPresenter from './presenter/filters-presenter.js';
import PointsApiService from './points-api-service.js';
import NewPointButtonView from './view/new-point-button-view.js';
import {render} from './framework/render.js';

const AUTHORIZATION = 'Basic o88slEwSMiWqp88A';
const END_POINT = 'https://22.objects.htmlacademy.pro/big-trip';
const pageMainElement = document.querySelector('.page-main');
const pageHeaderElement = document.querySelector('.page-header');
const tripEventsMainContainer = pageMainElement.querySelector('.trip-events');
const tripHeaderInfoContainer = pageHeaderElement.querySelector('.trip-main');
const tripControlsFiltersElement = tripHeaderInfoContainer.querySelector('.trip-controls__filters');

const pointsModel = new PointsModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION)
});

const filtersModel = new FiltersModel();

const tripInfoPresenter = new TripInfoPresenter({
  tripEventsContainer: tripEventsMainContainer,
  pointsModel: pointsModel,
  filtersModel: filtersModel,
  onNewPointDestroy: handleNewPointFormClose,
});

const filtersPresenter = new FiltersPresenter({
  filterContainer: tripControlsFiltersElement,
  filtersModel: filtersModel,
  pointsModel: pointsModel
});

const newPointButtonComponent = new NewPointButtonView({
  onClick: handleNewPointButtonClick
});

function handleNewPointFormClose() {
  newPointButtonComponent.element.disabled = false;
}

function handleNewPointButtonClick() {
  tripInfoPresenter.createPoint();
  newPointButtonComponent.element.disabled = true;
}

filtersPresenter.init();
tripInfoPresenter.init();
pointsModel.init()
  .finally(() => {
    render(newPointButtonComponent, tripHeaderInfoContainer);
  });
