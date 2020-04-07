const LocalStrategy = require('passport-local').Strategy;

// Load User model
const User = require('./model/user.model');

module.exports = function(passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'login' }, (login, password, done) => {
            User.findOne({
                login: login
            }).then(user => {
                if (!user) {
                    return done(null, false, { message: 'That email is not registered' });
                }
                if (user.password !== password) {
                    console.log("** no pass");
                    return done(null, false, { message: 'Incorrect password.' });
                }

                return done(null, user);
            });
        })
    );

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            // console.log("**desi:",id);
            done(err, user);
        });
    });
};

