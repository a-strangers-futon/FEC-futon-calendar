
var db = require('./index.js');

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

const getStartOfToday = function() {
  var currentTime = Date.now();
  var currentDate = new Date(currentTime);
  currentDate.setHours(0, 0, 0, 0);
  return currentDate;
};

var iterDate = function(date, count=1, copy=false) {
  var dateRef = date;
  var iterVal = (count < 0 ? -1 : 1);

  if(!copy) {
    dateRef = new Date(dateRef.getTime());
  }

  for (var i=0; i<Math.abs(count); i++) {
      dateRef.setDate(dateRef.getDate() + iterVal);
  }
  return dateRef;
}

function coinFlip(odds=2) {
  return getRndInteger(1, odds) === 1;
}

var buildMinimum = function(listingId=1, minimumStay=3, takenOdds=3, endOdds=2) {
  var obj = {
    listingId: listingId,
    minimumStay: minimumStay,
    datesTaken: []
  };
  var today = getStartOfToday();
  var startDate = iterDate(today, -100);
  var endDate = iterDate(today, 365);
  var daysInARow = 0;

  while (startDate.getTime() <= endDate.getTime()) {
    var isTaken = false;
    if (daysInARow === 0) {
      if (coinFlip(takenOdds)) isTaken = true; 
    } else if (daysInARow <= minimumStay && daysInARow !== 0) {
      isTaken = true;
    } else {
      isTaken = coinFlip(endOdds);
    }

    if (isTaken) {
      daysInARow ++;
    } else {
      daysInARow = 0;
    }

    obj.datesTaken.push({timestamp: startDate, taken: isTaken});
    startDate = iterDate(startDate);
  }
  return obj;
}

for (var i=1; i<=100; i++) {
  var obj = buildMinimum(listingId=i);
  db.saveSchedule(obj, (err, result) => {
    if (err) {
      throw err;
    }
    console.log('created', result)
  });
}
