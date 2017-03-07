var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('xxs', { title: 'XSS Attack' });
});

router.get('/reflected', function(req, res, next) {
	var searchQuery = req.query.search;
	if (searchQuery) {
		res.send(searchQuery);
	} else {
		res.render('xxs-reflected', { title: 'Reflected XSS Attack'})
	}
});

router.get('/stored', function(req, res, next) {
  store.comment += 'Message board comment<script>alert(\'hi\')<\/script>';
  res.send(JSON.stringify(store));
});

var store = {
	comment: ''
};

module.exports = router;