import dayjs from 'dayjs';
import {
  DATE_FORMAT_TIME,
  DATE_FORMAT_DAY,
  DATE_FORMAT_IN_FORM,
  MILLISECONDS_PER_SECOND,
  SECONDS_PER_MINUTE,
  MINUTES_PER_HOUR,
  HOURS_PER_DAY
} from './const.js';

function updateItem(items, update) {
  return items.map((point) => point.id === update.id ? update : point);
}

function humanizeDateTime(date) {
  return date ? dayjs(date).format(DATE_FORMAT_TIME.toUpperCase()) : '';
}

function humanizeDateDay(date) {
  return date ? dayjs(date).format(DATE_FORMAT_DAY.toUpperCase()) : '';
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

function isDatesEqual(dateA, dateB) {
  return dayjs(dateA).isSame(dateB);
}

export {
  humanizeDateTime,
  humanizeDateDay,
  getTimeDifference,
  formatDateInForm,
  updateItem,
  sortingPointsByPrice,
  sortingPointsByTime,
  sortingPointsByDate,
  isDatesEqual,
};
