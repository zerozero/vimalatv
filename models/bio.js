var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    templates: { type: Array, default: [], required: false},
    enabled: { type: Boolean, required: true}
});

module.exports = mongoose.model('Bio', schema);