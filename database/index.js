var mongoose = require('mongoose');

mongoose.connect('mongodb://172.17.0.2:27017/schedule', { useNewUrlParser: true }, function(error) {
  if (error) {
    console.log('ERROR', error);
  } 
});

var singleScheduleSchema = new mongoose.Schema({
  timestamp: Date,
  taken: Boolean
});

var scheduleSchema = new mongoose.Schema({
  'listingId': Number,
  'minimumStay': Number,
  'datesTaken': [singleScheduleSchema]
});

var Schedule = mongoose.model('Schedule', scheduleSchema);

let saveSchedule = (scheduleObj, callback) => {
  Schedule.findOneAndUpdate({listingId: scheduleObj.listingId}, scheduleObj, {upsert: true}, callback);
}

let findSchedule = function(listingId, callback) {
  Schedule.find({listingId: listingId}, '-_id -datesTaken._id -__v', callback);
};

module.exports = {
  Schedule,
  saveSchedule,
  findSchedule
};
