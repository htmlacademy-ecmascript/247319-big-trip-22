function createOffersShortTemplate({title, price}) {
  return (
    `<li class="event__offer">
      <span class="event__offer-title">${title}</span>
        +€&nbsp;
      <span class="event__offer-price">${price}</span>
    </li>`
  );
}

function createOffersTemplate(offers, checkedOffers) {
  const {id, title, price} = offers;
  const isChecked = checkedOffers.includes(id) ? 'checked' : '';

  return (
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="${id}" type="checkbox" name="${title}" ${isChecked}>
      <label class="event__offer-label" for="${id}">
        <span class="event__offer-title">${title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${price}</span>
      </label>
    </div>`
  );
}

function createEventTypeShortTemplate(pointType, pointId, type){
  const upperCaseFirstletterType = pointType.charAt(0).toUpperCase() + pointType.slice(1);

  return (
    `<div class="event__type-item">
      <input id="event-type-${pointType}-${pointId}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${pointType}" ${pointType === type ? 'checked' : ''}>
      <label class="event__type-label  event__type-label--${pointType}" for="event-type-${pointType}-${pointId}">${upperCaseFirstletterType}</label>
    </div>
  `);
}

function createEventTypeShortTemplateForCreationForm(pointType, pointId, type){
  return (
    `<div class="event__type-item">
      <input id="event-type-${pointType}-${pointId}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${pointType}" ${pointType === type ? 'checked' : ''}>
      <label class="event__type-label  event__type-label--${pointType}" for="event-type-${pointType}-${pointId}">${pointType}</label>
    </div>
  `);
}

function createDestinationsShortTemplate(destinations) {
  return (`<option value="${destinations.name}"></option>`);
}

function createPhotoTemplate(pictures) {
  if (!pictures || pictures.length === 0) {
    return '';
  }
  let template = '';
  for (let i = 0; i < pictures.length; i++) {
    const {src, description} = pictures[i];
    template += `<img class="event__photo" src="${src}" alt="${description}">`;
  }
  if (pictures.length > 0) {
    return (
      `<div class="event__photos-container">
        <div class="event__photos-tape">
          ${template}
        </div>
      </div>`);
  } else {
    return '';
  }
}

function createFilterItemTemplate(filter, currentFilterType) {
  const {type, count} = filter;

  return (
    `<div class="trip-filters__filter">
    <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${type}" ${type === currentFilterType ? 'checked' : ''} ${count === 0 ? 'disabled' : ''}>
    <label class="trip-filters__filter-label" for="filter-${type}">${type}</label>
  </div>`);
}

export {
  createOffersShortTemplate,
  createOffersTemplate,
  createEventTypeShortTemplate,
  createDestinationsShortTemplate,
  createPhotoTemplate,
  createFilterItemTemplate,
  createEventTypeShortTemplateForCreationForm,
};
