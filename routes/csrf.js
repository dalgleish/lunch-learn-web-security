
var express = require('express')
var session = require('express-session')
var bodyParser = require('body-parser')
var _ = require('lodash/core')

var router = express.Router()

// Simple User DB
// username => password
var users = [{
        username: 'andrew',
        password: 'h0tpads',
        email: 'adalgleish@hotpads.com'
    }, {
        username: 'andrew',
        password: 'cl1mbing',
        email: 'sgudeman@hotpads.com'
    }
]

router.use(bodyParser.urlencoded({ extended: false }))
router.use(session({
    secret: 'csrf secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

router.get('/login', (req, res) => {
    res.render('csrf-login')
})

router.post('/login', (req, res) => {
    let { username, password } = req.body
    let user = _.find(users, (user) => {
        return user.username === username
    })

    if (user && user.password === password) {
        req.session.regenerate(function () {
            req.session.user = user
            res.redirect('authenticated')
        })
    } else {
        res.send('login failed')
    }
})

function checkUser(req, res, next) {
    let { user } = req.session;

    if (!user) {
        res.redirect('login')
        return;
    }

    next()
}

router.get('/authenticated', checkUser, (req, res) => {
    let { user } = req.session;
    // let message = `Hello, ${user.username}. Your email is ${user.email}`
    res.render('csrf-authenticated', {
        name: req.session.user.username,
        email: req.session.user.email
    })
})

router.post('/change-email', checkUser, (req, res) => {
    let { email } = req.body

    req.session.user.email = email;
    // TODO: May not need this
    // _.remove(users, function(target) {
    //     return target.username === user.username;
    // });
    // users.push(user)

    res.render('csrf-authenticated', {
        name: req.session.user.username,
        email: req.session.user.email
    })
})

router.get('/win-free-ipad', (req, res) => {
    res.render('csrf-evil')
})

router.get('/logout', (req, res) => {
    req.session.destroy(function () {
        res.redirect('login')
    })
})

module.exports = router;
