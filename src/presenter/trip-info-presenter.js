import CreationFormView from '../view/creation-form-view.js';
import EditFormView from '../view/edit-form-view.js';
import PointView from '../view/point-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';

import {render} from '../render.js';

export default class TripInfoPresenter {
  listComponent = new TripEventsListView();

  constructor({tripEventsContainer, pointModel, offerModel, destinationModel}) {
    this.tripEventsContainer = tripEventsContainer;
    this.pointModel = pointModel;
    this.offerModel = offerModel;
    this.destinationModel = destinationModel;
  }

  init() {
    const points = this.pointModel.getPoints();
    const destinations = this.destinationModel.getDestinations();
    const offers = this.offerModel.getOffers();

    render(this.listComponent, this.tripEventsContainer);
    render(new CreationFormView(points[1], destinations, offers), this.listComponent.getElement());
    render(new EditFormView(points[2], destinations, offers), this.listComponent.getElement());

    for (const point of points) {
      render(new PointView(point, destinations, offers), this.listComponent.getElement());
    }
  }
}
