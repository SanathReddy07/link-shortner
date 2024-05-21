const mongoose = require('mongoose');
const shortid = require('shortid');

const UrlSchema = new mongoose.Schema({
    urlCode: {
        type: String,
        required: true,
        unique: true,
        default: shortid.generate
    },
    longUrl: {
        type: String,
        required: true
    },
    shortUrl: {
        type: String,
        required: true
    },
    date: {
        type: String,
        default: Date.now
    }
});

module.exports = mongoose.model('Url', UrlSchema);
