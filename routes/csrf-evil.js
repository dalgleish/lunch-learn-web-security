var express = require('express')
var router = express.Router()

router.get('/win-free-ipad', (req, res) => {
    res.render('csrf-evil')
})

module.exports = router;
