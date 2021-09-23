const { Entries } = require('../models');
let router = require('express').Router();
const withAuth = require('../utils/withAuth')
const alreadyLoggedIn = require('../utils/loggedIn')

router.get('/', alreadyLoggedIn, function (req, res) {
    Entries.findAll({
    }).then(dbRes => {
        // res.json(dbRes);
        
        // dbRes = dbRes.get({ plain: true }) // broken
        const data = dbRes.map(entry => entry.get({ plain: true }));

        res.render('index', { data, splashPage: true });
        // console.log(dbRes);
    });
});

router.get('/index', function (req, res) {
    Entries.findAll({
    }).then(dbRes => {
        // res.json(dbRes);
        
        // dbRes = dbRes.get({ plain: true }) // broken
        const data = dbRes.map(entry => entry.get({ plain: true }));

        res.render('index', { data, splashPage: true});
        // console.log(dbRes);
    });
});

router.get('/search', function (req, res) {
    res.render('search');
});

router.get('/login', function (req, res) {
    res.render('login');
});

router.get('/post', withAuth, function (req, res) {
    res.render('post', {id: true});
});

router.get('/dashboard', withAuth, function (req, res) {
    res.render('dashboard', {id: true});
});

router.get('/zipcode/:zipcode', withAuth, (req, res) => {
    Entries.findAll({
        where: {
            zipcode: req.params.zipcode
        }
    }).then(dbRes => {
        // res.json(dbRes);
        
        // dbRes = dbRes.get({ plain: true }) // broken
        const data = dbRes.map(entry => entry.get({ plain: true }));

        res.render('search-results', { data, id: true});
        // console.log(dbRes);
    });
});

module.exports = router;