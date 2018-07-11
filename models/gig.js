var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    date:{ type: Date, required: true },
    venue: { type: String, required: true },
    description:{ type: String, required: true },
    website:{ type: String, required: false },
    ticketUrl: { type: String, required: false},
    enabled: { type: Boolean, required: true},
    permanent: { type: Boolean, required: true}
});

module.exports = mongoose.model('Gig', schema);