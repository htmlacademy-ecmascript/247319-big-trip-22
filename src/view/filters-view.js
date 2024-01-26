import AbstractView from '../framework/view/abstract-view.js';
import {createFilterItemTemplate} from '../utils/markup-utils.js';

function createFiltersTemplate (filterItems) {
  const filtersListTemplate = filterItems.map((filter, index) => createFilterItemTemplate(filter, index === 0)).join('');

  return (
    `<form class="trip-filters" action="#" method="get">
      ${filtersListTemplate}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>
  `);
}

export default class FiltersView extends AbstractView {
  #filters;

  constructor ({filters}) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createFiltersTemplate(this.#filters);
  }
}
