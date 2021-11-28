var express = require('express');
var router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express App' });
});




// Welcome Page
// router.get("/", forwardAuthenticated, (req, res) => res.render("index"));

// Dashboard
router.get("/dashboard", ensureAuthenticated, (req, res) =>
	res.render("dashboard", {
		user: req.user,
	})
);

module.exports = router;
module.exports = router;
