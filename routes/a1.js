var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    // var url = req['redirect_to'];
    // res.redirect(url);
    store.hello += '<script>alert(\'hi\')<\/script>';
    res.send(JSON.stringify(store));
});

var store = {};

/* GET users listing. */
router.get('/admin', function(req, res, next) {
    var id = req['userid'];
    var user = db.getuser(id)
    res.send(user);
});

module.exports = router;
