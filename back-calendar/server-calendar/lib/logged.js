const mongoose = require('mongoose');

const loggedSchema = new mongoose.Schema({
     id : { type : String, unique : true },
     email : { type : String }
});

const Logged = mongoose.model('logged', loggedSchema);
module.exports = Logged;
