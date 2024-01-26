import TripInfoPresenter from './presenter/trip-info-presenter.js';
import PointModel from './model/point-model.js';

const pageMainElement = document.querySelector('.page-main');
const tripEventsMainContainer = pageMainElement.querySelector('.trip-events');

const pointModel = new PointModel();
pointModel.init();

const tripInfoPresenter = new TripInfoPresenter({tripEventsContainer: tripEventsMainContainer, pointModel: pointModel});
tripInfoPresenter.init();
