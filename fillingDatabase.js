const model = require('./model/user.model');
const fs = require('fs');

 function fill(param){
    if(param){
        const user = model;
        fs.readFile('users1.json', 'utf8',function (error, data){
            if(error) throw error;

            const obj = JSON.parse(data);
            user.create(obj, (err, doc)=>{

                if(err) return console.log(err);

                // console.log(doc)
            });

        });

    }
}

module.exports = fill;