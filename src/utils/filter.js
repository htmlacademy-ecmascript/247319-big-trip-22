import {FilterType} from './const.js';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((item) => dayjs().isBefore(dayjs(item.dateFrom))),
  [FilterType.PRESENT]: (points) => points.filter((item) => dayjs().isBetween(dayjs(item.dateTo), dayjs(item.dateFrom))),
  [FilterType.PAST]: (points) => points.filter((item) => dayjs().isAfter(dayjs(item.dateTo)))
};

export {filter};
