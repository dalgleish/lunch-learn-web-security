
var express = require('express')
var session = require('express-session')
var bodyParser = require('body-parser')
var http = require('http')
var path = require('path')

var router = express.Router()



router.use(bodyParser.urlencoded({ extended: false }))
router.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

router.get('/login', (req, res) => {
    // Bad: No check of `redirect_to` param
    console.log('GET /login   req.query:::' + JSON.stringify(req.query))
    var redirect_to = req.query.redirect_to || 'secret'
    var action = `login?redirect_to=${redirect_to}`
    console.log('GET /login   action:::' + JSON.stringify(action))

    if (req.session.username) {
        res.redirect('secret')
    } else {
        res.render('login', { action: action })
    }
})

// Simple User DB
// username => password
var users = {
    'andrew': 'h0tpads',
    'sara': 'cl1mbing',
}

router.post('/login', (req, res) => {
    let { username, password } = req.body
    // Bad: No check of `redirect_to` param
    var redirect_to = req.query.redirect_to || 'secret'

console.log('POST /login   redirect_to:::' + JSON.stringify(redirect_to))
    if (users[username] === password) {
        req.session.regenerate(function () {
            req.session.username = username
            req.session.success = 'Authenticated as ' + username
            console.log(JSON.stringify(req.session))
            res.redirect(redirect_to)
        })
    } else {
        req.session.error = 'Authentication failed. Please check your username and password.'
        res.redirect('login')
    }
})

router.get('/secret', (req, res) => {
    if (req.session.username) {
        res.render('secret')
    } else {
        res.redirect('login?redirect_to=' + req.originalUrl)
    }
})

router.get('/logout', (req, res) => {
    req.session.destroy(function () {
        res.redirect('login')
    })
})

module.exports = router;
