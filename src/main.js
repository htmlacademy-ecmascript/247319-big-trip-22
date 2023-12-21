import FiltersView from './view/filters-view.js';
import SortingView from './view/sorting-view.js';
import TripInfoView from './view/trip-info-view.js';
import TripInfoPresenter from './presenter/trip-info-presenter.js';
import PointModel from './model/point-model.js';

import {render} from './framework/render.js';

const pageHeaderElement = document.querySelector('.page-header');
const pageMainElement = document.querySelector('.page-main');
const tripHeaderInfoContainer = pageHeaderElement.querySelector('.trip-main');
const tripControlsFiltersElement = tripHeaderInfoContainer.querySelector('.trip-controls__filters');
const tripEventsMainContainer = pageMainElement.querySelector('.trip-events');

render(new TripInfoView(), tripHeaderInfoContainer, 'afterbegin');
render(new FiltersView(), tripControlsFiltersElement);
render(new SortingView(), tripEventsMainContainer);

const pointModel = new PointModel();
pointModel.init();

const tripInfoPresenter = new TripInfoPresenter({tripEventsContainer: tripEventsMainContainer, pointModel: pointModel});
tripInfoPresenter.init();
