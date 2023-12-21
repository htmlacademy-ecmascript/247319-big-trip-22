import FiltersView from './view/filters-view.js';
import SortingView from './view/sorting-view.js';
import TripInfoView from './view/trip-info-view.js';
import TripInfoPresenter from './presenter/trip-info-presenter.js';
import PointModel from './model/point-model.js';

import {render} from './render.js';

const pageHeaderElement = document.querySelector('.page-header');
const pageMainElement = document.querySelector('.page-main');
const tripMainElement = pageHeaderElement.querySelector('.trip-main');
const tripControlsFiltersElement = tripMainElement.querySelector('.trip-controls__filters');
const tripEventElement = pageMainElement.querySelector('.trip-events');

render(new TripInfoView(), tripMainElement, 'afterbegin');
render(new FiltersView(), tripControlsFiltersElement);
render(new SortingView(), tripEventElement);

const pointModel = new PointModel();
pointModel.init();

const tripInfoPresenter = new TripInfoPresenter({tripEventsContainer: tripEventElement, pointModel: pointModel});
tripInfoPresenter.init();
