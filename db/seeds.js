const mongoose = require('mongoose');
const db = require("../models");



// This file empties the Sound collection and inserts the sounds below
mongoose.connect(
    process.env.MONGODB_URI ||
    "mongodb://localhost/funkySound", {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true
    }
).catch(e => {
    console.log('Connection error', e.message)
})



const urlSeed = [{
        username: "admin",
        URL: "https://res.cloudinary.com/exquisite-corpse-sound-bath/video/upload/v1615663107/InkyBoisSound_r0gdgd.mp3",
        category: ""
    },
    {
        username: "admin",
        URL: "https://res.cloudinary.com/exquisite-corpse-sound-bath/video/upload/v1616265722/autrfo5tdnhh35q0lh4l.wav",
        category: ""
    },
    {
        username: "admin",
        URL: "https://res.cloudinary.com/exquisite-corpse-sound-bath/video/upload/v1615661248/my-audio-file-name_3_wtyhca.webm",
        category: ""
    },
    {
        username: "admin",
        URL: "https://res.cloudinary.com/exquisite-corpse-sound-bath/video/upload/v1616280792/u8tmkzab5wqtexu55w1b.mp3",
        category: ""
    },
    {
        username: "admin",
        URL: "https://res.cloudinary.com/exquisite-corpse-sound-bath/video/upload/v1616280781/bhi2hfzboiuqg0parhhn.mp3",
        category: ""
    },
    {
        username: "admin",
        URL: "https://res.cloudinary.com/exquisite-corpse-sound-bath/video/upload/v1616280781/p7maieoemjvqj2byjuyx.mp3",
        category: ""
    },
    {
        username: "admin",
        URL: "https://res.cloudinary.com/exquisite-corpse-sound-bath/video/upload/v1616280782/hqkxjma7mmjay9cfqeep.mp3",
        category: ""
    },
    {
        username: "admin",
        URL: "https://res.cloudinary.com/exquisite-corpse-sound-bath/video/upload/v1616280784/p1ftjiiqnxcppjfmvsbb.mp3",
        category: ""
    },
    {
        username: "admin",
        URL: "https://res.cloudinary.com/exquisite-corpse-sound-bath/video/upload/v1616281248/itgbbwye7eckeqki7pln.mp3",
        category: ""
    },
    {
        username: "admin",
        URL: "https://res.cloudinary.com/exquisite-corpse-sound-bath/video/upload/v1616281249/s7wtlmgd3by2mbzmptyj.mp3",
        category: ""
    },
    {
        username: "admin",
        URL: "https://res.cloudinary.com/exquisite-corpse-sound-bath/video/upload/v1616392270/jsgjvi5njgcrpdqoy0az.mp3"
    },


];

db.Sound.remove({})
    .then(() => db.Sound.collection.insertMany(urlSeed))
    .then(data => {
        console.log(data.result.n + " records inserted!");
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });

