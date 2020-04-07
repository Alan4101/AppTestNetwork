const express = require('express');
const fillingDatabase = require('../fillingDatabase');

const { ensureAuthenticated  } = require('../router/auth-pass');

const userModel = require('../model/user.model');

const router = express.Router();
 /***** get methods *******/
/*get all users*/
router.get('/people', (req, res)=>{

    const uid = req.session.passport.user;

    userModel.find({_id: uid}, {login: 0, password: 0}).exec((error, data) => {
       if(error) console.log(error);

        userModel.find({_id: data[0].freeUsers}).exec((err, doc) =>{
            res.send(doc);
        })
    });
});

/*req get only incoming*/
router.get('/friendin/', ensureAuthenticated, (req, res)=> {
    const uid = req.session.passport.user;

    userModel.find( {_id: uid} )
        .exec(function (err, doc){
            if(err) console.log(err);

            userModel.find({_id: {$in: doc[0].friends.incomeRequests}}, {name: true, icon: true}, )
                .exec(function(error, data){
                    if(error) console.log(error);

                    res.send(data);
                })

        })

});

/*req get only outgoing*/
router.get('/friendout/',ensureAuthenticated , (req, res)=> {
    const uid = req.session.passport.user;

    userModel.find( {_id: uid} )
        .exec(function (err, doc){
            if(err) console.log(err);

            userModel.find({_id: {$in: doc[0].friends.outcomeRequests}}, {name: true, icon: true}, )
                .exec(function(error, data){
                    if(error) console.log(error);

                    res.send(data);
                })

        })

});

/*req get only friends*/
router.get('/friends/', (req, res)=> {

    const uid = req.session.passport.user;

    userModel.find( {_id: uid} )
        .exec(function (err, doc){
            if(err) console.log(err);

            userModel.find({_id: {$in: doc[0].friends.friends }}, {name: true, icon: true}, )
                .exec(function(error, data){
                    if(error) console.log(error);

                    res.send(data);
                })

        })
});
/*** search name ****/
router.get('/search/',(req,res)=>{
  const q = req.query.q;
  let regex = new RegExp(q);

  userModel.find({ _id: {$ne: req.session.passport.user}, name: {$regex: regex}}, { __v:0, login: 0, password: 0})
      .exec((err, data)=>{
      if(err) console.log(err);
      console.log('search');
      res.json(data)
  })
});

/**** functions ****/

/*видалення запитів (_id) з масивів */
function pullTo(res, id_user, id_friend){
    console.log('pullTo===');
    userModel.update({_id: id_user} ,{$pull: {'friends.outcomeRequests': id_friend}})
        .exec(function (err, doc) {if(err) console.log(err)});

    userModel.update({_id: id_friend} ,{$pull: {'friends.incomeRequests': id_user}})
        .exec(function (err, doc) { if(err) console.log(err);});
    res.send('cancel');
    updateUserFieldFreeUser(id_user, id_friend);
    updateUserFieldFreeUser(id_friend, id_user);
}

/*додавання (_id) в масиви incoming/ougoing +*/
function pushTo(res, id_user, id_friend, status) {
    console.log('poshto');
    //додаэмо в масив out авторизованого користувача
    userModel.update({_id: id_user}, {$push : {'friends.outcomeRequests': id_friend} })
        .exec((error, doc)=>{
            if(error) console.log(error);
            removeUserFieldFreeUser(id_user, id_friend);
            console.log('**remFreeUser =====')
            res.send(status)
        });
    //
    userModel.find({_id: id_friend}).exec(function(err, doc){
        if(err) console.log(err);

        if(doc[0].friends.incomeRequests.length !== 0){
            //якщо масив не пустий перевіряємо на співпадіння
            if(doc[0].friends.incomeRequests.indexOf(id_friend)===-1){
                //користувач відсутній, тоді записуємо запит
                userModel.update({_id: id_friend}, {$push : {'friends.incomeRequests': id_user}} )
                    .exec((error, docu)=>{
                        if(error) console.log(error);
                        console.log('user not found write');
                        removeUserFieldFreeUser(id_friend, id_user);
                        // console.log(docu);
                    })
            }else{
                // збіг знайдено видаляємо запит
                pullTo(res,id_user, id_friend);
            }
        } else{
            //пустий додаємо відразу
            userModel.update({_id: id_friend}, {$push : {'friends.incomeRequests': id_user}} )
                .exec((error, doc)=>{
                    if(error) console.log(error);
                    console.log('add income id_friend')
                    removeUserFieldFreeUser(id_friend, id_user);
                })
        }

    })
}

// updatePullIn
function removeFromIn(id1, id2){
    userModel.update({_id: id2}, {$pull : {'friends.incomeRequests': id1}})
        .exec(function(err, doc){
            if(err) console.log(err);

            console.log("***removeIn" ,doc);
        });
}
//updatePullOut
function removeFromOut(id1, id2){
    // userModel.update({_id: id2}, {$pull : {'friends.outcomeRequests': id1}})
    userModel.update({_id: id1}, {$pull : {'friends.outcomeRequests': id2}})
        .exec(function(err, doc){
            if(err) console.log(err);
            console.log("***remOut");
        });
}
/*add user in friends*/
function updateFriends(id1,id2) {
    userModel.update({_id: id1},{$push : {'friends.friends': id2}})
        .exec(function(err, doc){
            if(err) console.log( err);
            console.log('**upFriend');
        });
}
/*remove user from friends*/
function removeFromFriends(id1,id2) {
    userModel.update({_id: id1},{$pull : {'friends.friends': id2}})
        .exec(function(err, doc){
            if(err) console.log( err);
            console.log('**removeFromFriend');
        });
}
/*add freeUser array in auth user */
function updateUserFieldFreeUser(id1,id2) {
    userModel.update({_id: id1},{$push : {'freeUsers': id2}})
        .exec(function(err, doc){
            if(err) console.log( err);
            console.log('**update freeUser')
        });
}
/*add freeUser arr in friend*/
function removeUserFieldFreeUser(id1,id2) {
    userModel.update({_id: id1},{$pull : {'freeUsers': id2}})
        .exec(function(err, doc){
            if(err) console.log( err);
            console.log('**remove freeUser')
        });
}

/***** post methods ******/

/*filling data in database*/
router.post('/users', (req, res) => {

    if(!req.body) return res.sendStatus(400);

    fillingDatabase(req.body.flag);

    res.send('disabled');
});

/*  a query that adds users to an array "outcomeRequests"  and adds queries another */
router.post('/people',(req, res)=>{

    if(!req.body) return res.sendStatus(400);

    const obj = {
        user_id: req.session.passport.user,
        recipient_id: req.body.recipient_id,
        status: req.body.status
    };

    userModel.find({_id: obj.user_id}, {_id: true, name: true, icon: true, friends: true})
        .exec(function(err, data){
            if(err) console.log(err);

            // array not empty
            if(data[0].friends.outcomeRequests.length !== 0){
                if(data[0].friends.outcomeRequests.indexOf(obj.recipient_id)===-1 ){
                    pushTo(res, obj.user_id, obj.recipient_id, obj.status)

                }else {
                    pullTo(res, obj.user_id, obj.recipient_id);
                }
            } else {
                //array is empty
               pushTo(res, obj.user_id, obj.recipient_id, obj.status);
            }
    });
});

/*update incoming block +**/
router.post('/friendin', (req, res)=>{
   if(!req.body) return res.sendStatus(400);


   const state = {
       id_user: req.session.passport.user,
       id_rep: req.body.id_rep,
       status: req.body.status
   };

   if(state.status === 'ignore'){
       console.log('ignore');
       removeFromIn(state.id_rep, state.id_user);
       removeFromOut(state.id_rep, state.id_user);

       updateUserFieldFreeUser(state.id_user, state.id_rep);
       updateUserFieldFreeUser(state.id_rep, state.id_user);
       res.send(state.status)

   }else if(state.status === 'accept'){
       console.log('accept');

       removeFromIn(state.id_rep, state.id_user);
       removeFromOut(state.id_rep, state.id_user);

       updateFriends(state.id_user, state.id_rep);
       updateFriends(state.id_rep, state.id_user);

       res.send(state.status)

   }

});

/*update outgoind block+*/
router.post('/friendout', (req, res)=>{
    if(!req.body) return res.sendStatus(400);


    const state = {
        id_user: req.session.passport.user,
        id_rep: req.body.id_rep,
        status: req.body.status
    };
    removeFromOut(state.id_user, state.id_rep);
    removeFromIn(state.id_user, state.id_rep);

    updateUserFieldFreeUser(state.id_user, state.id_rep);
    updateUserFieldFreeUser(state.id_rep, state.id_user );

    res.send(state.status)

});

/*remove from friend+*/
router.post('/friend', (req, res)=>{
    if(!req.body) return res.sendStatus(400);


    const state = {
        id_user: req.session.passport.user,
        id_rep: req.body.id_rep,
        status: req.body.status
    };
    console.log('remFromFriend');
    removeFromFriends(state.id_user, state.id_rep);
    removeFromFriends(state.id_rep, state.id_user);

    updateUserFieldFreeUser(state.id_user, state.id_rep);
    updateUserFieldFreeUser(state.id_rep, state.id_user );
    res.send(state.status)

});


module.exports = router;


