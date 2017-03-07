var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('bank', { title: 'Vulnerable Banking' });
});

// router.get('/bank-accounts/:user', function(req, res, next) {
// 	var user = req.params['user'];
// });

// hard coded in for example purposes
router.get('/bank-accounts/sara', function(req, res, next) {
  res.render('bank-account', { title: 'Sara\'s Bank Account', name: 'Sara', quantity: '$1,000,000' });
});
router.get('/bank-accounts/andrew', function(req, res, next) {
  res.render('bank-account', { title: 'Andrew\'s Bank Account', name: 'Andrew', quantity: '$2,000,000' });
});

module.exports = router;
