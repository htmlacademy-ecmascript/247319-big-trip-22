import dayjs from 'dayjs';

const DATE_FORMAT = 'MMM DD';
const MILLISECONDS_PER_SECOND = 1000;
const SECONDS_PER_MINUTE = 60;
const MINUTES_PER_HOUR = 60;

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function humanizeDate(date) {
  return date ? dayjs(date).format(DATE_FORMAT.toUpperCase()) : '';
}

function getTimeDifference(dateFrom, dateTo) {
  const startDate = new Date(dateFrom);
  const endDate = new Date(dateTo);
  const timeDifference = Math.abs(endDate - startDate);
  const hoursDifference = Math.floor(timeDifference / (MILLISECONDS_PER_SECOND * SECONDS_PER_MINUTE * MINUTES_PER_HOUR));
  const minutesDifference = Math.floor((timeDifference / (MILLISECONDS_PER_SECOND * SECONDS_PER_MINUTE)) % MINUTES_PER_HOUR);
  if (hoursDifference >= 1) {
    return `${hoursDifference}H ${minutesDifference}M`;
  } else {
    return `${minutesDifference}M`;
  }
}

export {getRandomArrayElement, humanizeDate, getTimeDifference};
