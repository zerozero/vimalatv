var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    name: { type: String, required: true },
    enabled: { type: Boolean, required: true}
});

module.exports = mongoose.model('Artist', schema);