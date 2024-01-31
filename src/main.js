import TripInfoPresenter from './presenter/trip-info-presenter.js';
import PointsModel from './model/points-model.js';

const pageMainElement = document.querySelector('.page-main');
const tripEventsMainContainer = pageMainElement.querySelector('.trip-events');

const pointsModel = new PointsModel();
pointsModel.init();

const tripInfoPresenter = new TripInfoPresenter({tripEventsContainer: tripEventsMainContainer, pointsModel: pointsModel});
tripInfoPresenter.init();
