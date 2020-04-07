console.log('script.js..');

'use strict';
import { Post, Get} from './rest'
import {Message} from "./message";

/* variables */
const loginBtn =        document.querySelector('.sign-in__btn-submit');
const tabcontent =      document.querySelectorAll(".tabs-content");
const tablinks =        document.querySelectorAll(".container-nav__links");
const tabUser =         document.querySelector('#tabUser');
const tabFriend =       document.querySelector('#tabFriend');

const divUsers =        document.querySelector('.user-block__list');
const friendsBlock =    document.querySelector('.frd-frd_list');
const incomingBlock =   document.querySelector('.pd-rq_ind');
const outgoingBlock =   document.querySelector('.pd-rq_out');

const outgoingBlock2 =  document.querySelector('.usr-block-o');
const friendsBlock2 =   document.querySelector('.usr-block-f');



/* functions */

/*insert data from database*/
function InsertUsersToPage(data, to, btn ,msg){
    const users = JSON.parse(data);
    users.map( user => {
        const div = `<li class="user-block__item user-item" >
                        <div class="user-item__block">
                            <img class="user-item__picture" src="${user.icon}" alt="${user._id}">
                            <p class="user-item__name">${user.name} </p>
                            <p class="status-message">${ msg ? msg : ''}</p>
                        </div>
                        <button data-id="${user._id}" class="user-item__bnt">${btn}</button>
                    </li>`;
        to.insertAdjacentHTML('beforeend', div);
    });

}

function InsertToIncomingBlock(data, to) {
    const users = JSON.parse(data);
    users.map( user => {
        const div = `<li class="user-block__item user-item" >
                        <div class="user-item__block">
                            <img class="user-item__picture" src="${user.icon}" alt="${user._id}">
                            <p class="user-item__name">${user.name} </p>
                        </div>
                        <button data-id="${user._id}" class="user-item__bnt ignore">Ignore</button>
                        <button data-id="${user._id}" class="user-item__bnt accept">Accept</button>
                    </li>`;
        to.insertAdjacentHTML('beforeend', div);
    });
}

/* handlers */
if(window.location.pathname == '/profile'){

    /*****METHODS******/
    /*get all user and insert from page*/
    Get('/profile/people')
        .then( data => InsertUsersToPage(data, divUsers, 'Add Friend') )
        .catch(error => console.log(error) );

    /*get all friends*/
    Get("/profile/friends")
        .then(users => {
            console.log('remove fri');
            InsertUsersToPage(users , friendsBlock, 'Remove friend', "friend");
            InsertUsersToPage(users , friendsBlock2, 'Remove friend', "friend");
        })
        .catch(error => console.log(error) );

    /*get all incoming req*/
    Get("/profile/friendin")
        .then(data => InsertToIncomingBlock(data, incomingBlock) )
        .catch(error => console.log(error) );

    Get("/profile/friendout")
        .then(data => {
            InsertUsersToPage(data, outgoingBlock, 'Cancel request','pending request');
            InsertUsersToPage(data, outgoingBlock2, 'Cancel request','pending request');
        } )
        .catch(error => console.log(error) );


    document.querySelector('#search').addEventListener('keyup', function(){
        Get('/profile/search?q='+this.value).then( data => {
            console.log(data);
            outgoingBlock2.remove();
            friendsBlock2.remove();
            divUsers.innerHTML= '';

            InsertUsersToPage(data, divUsers, 'Add Friend' );

        });
    }, false);



    /******END METHODS*****/


        /*add to friend request*/
    divUsers.addEventListener('click', function(e){

        if(e.target.tagName === "BUTTON"){

            const state = JSON.stringify({
                recipient_id: e.target.getAttribute('data-id'),
                status: 'request_sent'
            });
            Post('/profile/people', state).then( action =>{

                if(action == 'request_sent'){
                    e.target.innerHTML = 'Cancel request';

                    e.target.previousElementSibling.children[2].innerHTML = "req sending";
                    Message("Success","Request successfully sent", false);
                    setTimeout(()=>{
                       e.target.parentNode.remove();
                    },2000);

                } else if(action == 'cancel'){
                    e.target.innerHTML = 'Add friend';
                    Message("Success","Request successfully cancel", true);
                    setTimeout(()=>{
                        e.target.parentNode.remove();
                    },2000);
                }
            })

        }

    }, false);

    /* remove from friend */
    friendsBlock.addEventListener('click', function (e) {
        if(e.target.tagName === "BUTTON" ){
            const state = JSON.stringify({
                id_rep: e.target.getAttribute('data-id'),
                status: 'removed'
            });
            console.log(state);
            Post('/profile/friend',state)
                .then( data =>{
                    Message("Removed","User succesufully removed", false);
                    setTimeout(()=>{
                        e.target.parentNode.remove();
                    },2000);
                    console.log(data);

                })
                .catch(err => console.log(err) )
        }
    }, false);
    friendsBlock2.addEventListener('click', function (e) {
        if(e.target.tagName === "BUTTON" ){
            const state = JSON.stringify({
                id_rep: e.target.getAttribute('data-id'),
                status: 'removed'
            });
            console.log(state);
            Post('/profile/friend',state)
                .then( data =>{
                    Message("Removed","User succesufully removed", false);
                    setTimeout(()=>{
                        e.target.parentNode.remove();
                    },2000);
                    console.log(data);

                })
                .catch(err => console.log(err) )
        }
    }, false);

    /* select incoming block accept/ignore*/
    incomingBlock.addEventListener('click', function (e) {
        if(e.target.tagName === "BUTTON" && e.target.classList.contains('ignore')){
            const state = JSON.stringify({
                id_rep: e.target.getAttribute('data-id'),
                status: 'ignore'
            });
            console.log(state);
            Post('/profile/friendin',state)
                .then( data =>{
                    Message("Removed","Request succesufully removed", false);
                    setTimeout(()=>{
                        e.target.parentNode.remove();
                    },2000);
                    console.log(data);

                })
                .catch(err => console.log(err) )
        }else if(e.target.tagName === "BUTTON" && e.target.classList.contains('accept')){

            const state = JSON.stringify({
                id_rep: e.target.getAttribute('data-id'),
                status: 'accept'
            });
            Post('/profile/friendin',state)
                .then( data => {
                    Message("Accept","Request succesufully accepted", false);
                    setTimeout(()=>{
                        e.target.parentNode.remove();
                    },2000);
                    console.log(data);
                })
                .catch(err => console.log(err))
        }
    }, false);

    /* select outgoing block */
    outgoingBlock.addEventListener('click', function (e) {
        if(e.target.tagName === "BUTTON" ){
            const state = JSON.stringify({
                id_rep: e.target.getAttribute('data-id'),
                status: 'cancel'
            });
            console.log(state);
            Post('/profile/friendout',state)
                .then( data =>{
                    console.log(data);
                    setTimeout(()=>{
                        e.target.parentNode.remove();
                    },2000);
                })
                .catch(err => console.log(err) )
        }
    }, false);
    outgoingBlock2.addEventListener('click', function (e) {
        if(e.target.tagName === "BUTTON" ){
            const state = JSON.stringify({
                id_rep: e.target.getAttribute('data-id'),
                status: 'cancel'
            });
            console.log(state);
            Post('/profile/friendout',state)
                .then( data =>{
                    console.log(data);
                    setTimeout(()=>{
                        e.target.parentNode.remove();
                    },2000);
                })
                .catch(err => console.log(err) )
        }
    }, false);

    /*tab user*/
    tabUser.addEventListener('click', (e) => {
        tabcontent.forEach(item => {
            item.style.display = "none";
            item.style.transform = ".3s"
        });
        tablinks.forEach( item => item.className = item.className.replace(" active", ""));
        document.getElementById('userBlock').style.display = "block";
        e.target.className += " active";
    }, false);

    /*tab friends*/
    tabFriend.addEventListener('click', (e ) =>{
        tabcontent.forEach(item => {
            item.style.display = "none";
            item.style.transform = ".3s";
        });
        tablinks.forEach( item => item.className = item.className.replace(" active", ""));
        document.getElementById('friendsBlock').style.display = "block";
        e.target.className += " active";
    }, false);

}
if(window.location.pathname === '//users/login'){
    loginBtn.addEventListener('click', function () {
        Get('/users/profile').then(data => console.log(data));
    }, false);
}
