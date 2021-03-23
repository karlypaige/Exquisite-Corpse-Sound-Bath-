const db = require('../models');

// Defining methods for the tracksController
module.exports = {
    
    findAll: function(req, res) {
        db.Sound
            .find(req.query)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }


};