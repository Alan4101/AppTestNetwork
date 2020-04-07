const express = require('express');
const passport = require('passport');

const router = express.Router();

const { forwardAuthenticated } = require('./auth-pass');



router.get('/login', forwardAuthenticated, (req, res) => res.render('auth'));



router.post('/login', (req, res, next) => {
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            req.flash('error_msg', 'Please, enter right data');
            return next(err);
        }
        if (!user) { req.flash('error_msg', 'User not found');
            return res.redirect('/users/login'); }
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            return res.redirect('/profile');
        });
    })(req, res, next);

});

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
});


module.exports = router;
