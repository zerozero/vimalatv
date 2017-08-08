var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    media_id: { type: String, required: false },
    type: { type: String, required: true },
    url: { type: String, required: false },
    title: { type: String, required: false },
    content: { type: String, required: false },
    caption:{ type: String, required: false },
    width: { type: Number, required: false },
    height: { type: Number, required: false },
    enabled: { type: Boolean, required: true}
});

module.exports = mongoose.model('Media', schema);