import CreationFormView from '../view/creation-form-view.js';
import EditFormView from '../view/edit-form-view.js';
import RoutePointView from '../view/route-point-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';

import {render} from '../render.js';

export default class TripInfoPresenter {
  listComponent = new TripEventsListView();

  constructor({tripEventsContainer}) {
    this.tripEventsContainer = tripEventsContainer;
  }

  init() {
    render(this.listComponent, this.tripEventsContainer);
    render(new EditFormView(), this.listComponent.getElement());
    render(new CreationFormView(), this.listComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new RoutePointView(), this.listComponent.getElement());
    }
  }
}
