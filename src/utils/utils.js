import dayjs from 'dayjs';
import {
  DATE_FORMAT,
  DATE_FORMAT_IN_FORM,
  MILLISECONDS_PER_SECOND,
  SECONDS_PER_MINUTE,
  MINUTES_PER_HOUR,
  HOURS_PER_DAY
} from './const.js';

const isEscapeKey = (event) => event.key === 'Escape';

function updateItem(items, update) {
  return items.map((point) => point.id === update.id ? update : point);
}

function humanizeDate(date) {
  return date ? dayjs(date).format(DATE_FORMAT.toUpperCase()) : '';
}

function getTimeDifference(dateFrom, dateTo) {
  const startDate = new Date(dateFrom);
  const endDate = new Date(dateTo);
  const timeDifference = Math.abs(endDate - startDate);
  const daysDifference = Math.floor(timeDifference / (MILLISECONDS_PER_SECOND * SECONDS_PER_MINUTE * MINUTES_PER_HOUR * HOURS_PER_DAY));
  const hoursDifference = Math.floor(timeDifference / (MILLISECONDS_PER_SECOND * SECONDS_PER_MINUTE * MINUTES_PER_HOUR) % HOURS_PER_DAY);
  const minutesDifference = Math.floor((timeDifference / (MILLISECONDS_PER_SECOND * SECONDS_PER_MINUTE)) % MINUTES_PER_HOUR);
  if (daysDifference > 1) {
    return `${daysDifference}D ${hoursDifference}H ${minutesDifference}M`;
  } else if (hoursDifference >= 1) {
    return `${hoursDifference}H ${minutesDifference}M`;
  } else {
    return `${minutesDifference}M`;
  }
}

function formatDateInForm(date) {
  return date ? dayjs(date).format(DATE_FORMAT_IN_FORM.toUpperCase()) : '';
}

function sortingPointsByPrice (a, b) {
  return b.basePrice - a.basePrice;
}

function sortingPointsByDate(a, b) {
  return dayjs(a.dateTo).diff(dayjs(b.dateTo));
}

function sortingPointsByTime (a, b) {
  return dayjs(b.dateTo).diff(b.dateFrom) - dayjs(a.dateTo).diff(a.dateFrom);
}

// function isDatesEqual(dateA, dateB) {
//   return (dateA === null && dateB === null) || dayjs(dateA).isSame(dateB, 'D');
// }

export {
  humanizeDate,
  getTimeDifference,
  formatDateInForm,
  isEscapeKey,
  updateItem,
  sortingPointsByPrice,
  sortingPointsByTime,
  sortingPointsByDate,
  // isDatesEqual,
};
