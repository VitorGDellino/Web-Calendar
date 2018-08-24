const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
     email : {type : String},
     title : {type : String},
     desc : {type : String, default : ''},
     local : {type : String},
     startDate : {type : String},
     finishDate : {type : String},
     over : {type : Number}
});

const Event = mongoose.model('events', eventSchema);
module.exports = Event;
