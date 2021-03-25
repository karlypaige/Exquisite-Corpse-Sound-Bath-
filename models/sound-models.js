const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Create new Schema.
const soundSchema = new Schema (
    {
        username: { type: String, required: true },
        URL: { type: String, required: true },
        category: { type: String },
    },
    { timestamps: true}

);


// Store model in variable Sound.
const Sound = mongoose.model('sound', soundSchema);

module.exports = Sound;