var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    artist_id: { type: String, required: true },
    templates: { type: Array, default: [], required: false},
    enabled: { type: Boolean, required: true}
});

module.exports = mongoose.model('Collab', schema);