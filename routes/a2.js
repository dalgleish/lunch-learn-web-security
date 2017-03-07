var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('xxs', { title: 'XXS Attack' });
});

router.get('/reflected', function(req, res, next) {
	var searchQuery = req.query.search;
  res.send(searchQuery);
});

router.get('/stored', function(req, res, next) {
    store.comment += 'Message board comment<script>alert(\'hi\')<\/script>';
    res.send(JSON.stringify(store));	
});

var store = {
	comment: ''
};

module.exports = router;