
var express = require('express')
var session = require('express-session')
var bodyParser = require('body-parser')

var router = express.Router()

// Simple User DB
// username => password
var users = {
    'andrew': 'h0tpads',
    'sara': 'cl1mbing',
}

router.use(bodyParser.urlencoded({ extended: false }))
router.use(session({
    secret: 'forward secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

router.get('/login', (req, res) => {
    // Bad: No check of `redirect_to` param
    var redirect_to = req.query.redirect_to || 'secret'
    var action = `login?redirect_to=${redirect_to}`

    if (req.session.username) {
        res.redirect('secret')
    } else {
        res.render('login', { action: action })
    }
})

router.post('/login', (req, res) => {
    let { username, password } = req.body
    // Bad: No check of `redirect_to` param
    var redirect_to = req.query.redirect_to || 'secret'

    if (users[username] === password) {
        req.session.regenerate(function () {
            req.session.username = username
            req.session.success = 'Authenticated as ' + username
            res.redirect(redirect_to)
        })
    } else {
        req.session.error = 'Authentication failed.'
        res.redirect('login')
    }
})

router.get('/secret', (req, res) => {
    if (req.session.username) {
        res.render('secret')
    } else {
        res.redirect(`login?redirect_to=${req.originalUrl}`)
    }
})

router.get('/logout', (req, res) => {
    req.session.destroy(function () {
        res.redirect('login')
    })
})

module.exports = router;
