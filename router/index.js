const express = require('express');
const router = express.Router();
const userModel = require('../model/user.model');

const { ensureAuthenticated, forwardAuthenticated } = require('../router/auth-pass');
//start page
router.get('/', forwardAuthenticated, (req, res) => res.render('start'));

router.get('/profile/', ensureAuthenticated, (req, res) =>{
        loadUsers();
        res.render('profile', {user: req.user});
    }
);

function loadUsers(){


    userModel.find({},{_id:true})
        .exec((err, data)=>{
            if(err) console.log(err);

        data.map(i => {
            userModel.find({_id: i}, { _id: false,  freeUsers: true})
                .exec( (err, data)=>{
                    if(err) console.log(err);

                    if(data[0].freeUsers.length === 0 ){
                        userModel.find({ _id: {$ne : i}}, {_id: true}).exec( (error, ele)=>{

                            userModel.update({_id: i}, {$push : {'freeUsers': ele}}).exec((error, doc) =>{
                                if(err) console.log(err);

                                console.log('data insrt',doc);
                            })
                        })

                    }

                });
        })
    })
}

module.exports = router;