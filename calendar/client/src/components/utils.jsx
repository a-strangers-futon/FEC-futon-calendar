import moment from 'moment';
import _ from 'underscore';
import React from 'react';

const todayToString = function() {
  return moment().startOf('day').toDate().toISOString();
};

export const getUrlParams = function(urlSearch) {
  // expects something like window.location.search as a param
  var params = {};
  for (var eachItemPair of urlSearch.replace('?', '').split('&')) {
    var [k, v] = eachItemPair.split('=');
    params[k] = v;
  }
  return params;
}

export const pluralize = function(baseWord, count, suffix="s") {
  return baseWord + (count === 1 ? '' : suffix);
};

export const isoDateStringToReadable = function(isoDateString, isCheckIn=true) {
  if (isoDateString === null ) {
    return isCheckIn ? 'Check in' : 'Check Out';
  }
  return moment(isoDateString).format("MM/DD/YYYY");
};

export const dateRange = function(start, end) {
  var startMoment = moment(start);
  var endMoment = moment(end);
  var result = [];

  while (startMoment <= endMoment) {
    result.push(startMoment.toDate().toISOString());
    startMoment = startMoment.add(1, 'day');
  }
  return result;
}

export const calendarHeaderItems = (
  <div className="dow-row">
    {_.map(['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'], (dow) => <div className="calendar-header-item">{dow}</div>)}
  </div>
  );

export const cleanSchedule = function (jsonResp) {
  var today = todayToString();
  var cleaned = {};
  for (var row of jsonResp[0].datesTaken) {
    var dateString = row.timestamp;
    cleaned[dateString] = {text: date.getUTCDate(), isTaken: row.taken || dateString <= today, dateString: dateString, isSelected: false, isTmpTaken: false, isHighlighted: false, isHoverable: false};
  }
  return cleaned;
}

export const buildCalGrid = function (month, year, schedule) {
  var grid = {0: {}};
  var m = moment().month(month).year(year).startOf('month');

  for (var i=0; i<m.day(); i++) {
    grid[0][i] = null;
  }

  var currWeek = 0;
  while (m.month() === month) {
    if (!grid[currWeek]) grid[currWeek] = {};
    grid[currWeek][m.day()] = schedule[m.utc().startOf('day').utc().toDate().toISOString()];

    m = m.add(1, 'day');

    if (m.day() === 0) {
      currWeek++;
    }
  }
  return grid;
};

export const buildDateString = function (date, month, year) {
  return moment().month(month).year(year).date(date).startOf('day').toDate().toIsoString();
}

export const randInt = function (mini, maxi) {
  return Math.floor(Math.random() * (maxi - mini + 1) ) + mini;
};
