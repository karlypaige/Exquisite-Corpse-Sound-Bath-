var express = require('express');
var router = express.Router();
const apiRoutes = require("./api");

// API Routes
router.use("/api", apiRoutes)

// If no API routes are hit, send the React app
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../client/src/index.html"));
});

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

module.exports = router;
