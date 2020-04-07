const mongoose = require('mongoose');
const config = require('./config');

mongoose.Promise = global.Promise;

mongoose.connection
    .on('error', error => console.log(error))
    .on('close', ()=> console.log("database connection closed"))
    .once('open', ()=>{
        const info = mongoose.connections[0];
        console.log(`Connected to ${info.host}:${info.port}/${info.name}`);
    });

// mongoose.connect('mongodb://localhost:27017/social_network', {useNewUrlParser: true});
mongoose.connect(config.MONGO_URL, {useNewUrlParser: true});