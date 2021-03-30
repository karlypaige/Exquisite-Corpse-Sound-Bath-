const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


const app = express();
const apiPort = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

// require ('./routes/htmlRoutes')(app)
// require ('./routes/soundAPI')(app)

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/funkySound', {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true

});

const SoundRoute = require('./routes/api/htmlRoutes.js');
app.use(SoundRoute);
app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))
