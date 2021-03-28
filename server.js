const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const apiPort = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/funkySound', {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log("DB Connected!")
}).catch(err => {
    console.log(Error, err.message);
});

// List of all the files that should be served as-is
// let protected = ['transformed.js', 'main.css', 'favicon.ico']

// app.get("*", (req, res) => {

//     let path = req.params['0'].substring(1)
  
//     if (protected.includes(path)) {
//       // Return the actual file
//       res.sendFile(`${__dirname}/build/${path}`);
//     } else {
//       // Otherwise, redirect to /build/index.html
//       res.sendFile(`${__dirname}/client/src/index.html`);
//     }
//   });

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  // app.use(express.static("client/build"));
  app.use(express.static("__dirname"));
}

// send the user to index html page inspite of the url
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, './'));
// });

const SoundRoute = require('./routes/soundAPI');

app.use(SoundRoute);

app.use(express.static(__dirname + '/dist'))
app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))