var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    type: { type: String, required: true },
    artist_id: { type: String, required: false },
    templates: { type: Array, default: [], required: false},
    enabled: { type: Boolean, required: true}
});

module.exports = mongoose.model('Page', schema);