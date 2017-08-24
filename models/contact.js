var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    twitterUrl: { type: String, required: false },
    fbUrl: { type: String, required: false },
    instaUrl: { type: String, required: false },
    email: { type: String, required: false }
});

module.exports = mongoose.model('Contact', schema);