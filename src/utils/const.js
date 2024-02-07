const POINT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const DEFAULT_POINT_TYPE = 'flight';
const DATE_FORMAT_TIME = 'HH:mm';
const DATE_FORMAT_DAY = 'MMM dd';
const DATE_FORMAT_IN_FORM = 'DD/MM/YY HH:mm';

const MILLISECONDS_PER_SECOND = 1000;
const SECONDS_PER_MINUTE = 60;
const MINUTES_PER_HOUR = 60;
const HOURS_PER_DAY = 24;

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

const SortingType = {
  DAY: 'day',
  TIME: 'time',
  PRICE: 'price',
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

export {
  POINT_TYPES,
  DATE_FORMAT_TIME,
  DATE_FORMAT_DAY,
  DATE_FORMAT_IN_FORM,
  MILLISECONDS_PER_SECOND,
  SECONDS_PER_MINUTE,
  MINUTES_PER_HOUR,
  HOURS_PER_DAY,
  FilterType,
  SortingType,
  UserAction,
  UpdateType,
  DEFAULT_POINT_TYPE,
};
