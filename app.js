const express =         require('express');
const passport =        require('passport');
const session =         require('express-session');
const expressLayouts =  require('express-ejs-layouts');
const flash =           require('connect-flash');
const bodyParser = require('body-parser');


const app = express();
require('ejs');
//database connection
require('./db');

/*passport config*/
require('./pasport.config')(passport);

// import config file
const config = require('./config');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(bodyParser.json({ type: 'application/*+json' }));
//
// // parse some custom thing into a Buffer
// app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));

/*_______________*/
app.use(session({
    // required secret word
    secret: 'erwTH345Fef',
    resave: false,
    saveUninitialized: false
}));

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//using ejs
app.use(expressLayouts);
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/dist'));

//body-parser
app.use(express.urlencoded({ extended: true }));

//connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

//routing
app.use('/', require('./router/index.js'));
app.use('/users', require('./router/login.route.js'));
app.use('/profile', require('./router/user.router'));

// catch 404 and forward to error handler
app.use((req, res, next)=>{
    const err = new Error('Not Found');
    err.status= 404;
    next(err);
});

app.listen(config.PORT, ()=>{
   console.log(`App listening on port ${config.PORT}`);
});

