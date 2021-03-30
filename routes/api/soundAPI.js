var express = require('express');
var router = express.Router();
const Sound = require('../../models/sound-models')
const path = require('path');

router.get('/', function(req, res, next) {
    res.sendFile('You are in soundAPI');
});

// Create POST /api/sound  route
router.post('/soundAPI/sound', ({ body }, res) => {
    console.log(body);
    
    // Pass model
    Sound.create(body)
    .then(function (data) {
        res.json(data);
        
    })
});

// Create GET /api/sound route
router.get('/soundAPI/sound', (req, res) => {
    console.log(res);
    Sound.find({})
    .then(dbSound => {
        res.json(dbSound);
    })
    .catch(err => {
        res.status(400).json(err);
    });

});



module.exports = router;