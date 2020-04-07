"use strict";

import { Post} from "./rest";
import { Message } from "./message";

const fillDatabase =      document.querySelector('#fillDB');

/*button for insert database*/
if(window.location.pathname == '/'){
    /*function*/

    /* checking create or not database / disabled button*/
    (function(){
        if(window.localStorage.length > 0 ){
            fillDatabase.setAttribute('disabled','true');
        }else{
            fillDatabase.removeAttribute('disabled');
        }
    })();

    /*handlers*/

    /* filling/create database */
    fillDatabase.addEventListener('click', function(e){
        window.localStorage.setItem('flag', 'true');

        var isFillDb = JSON.stringify({flag: window.localStorage.getItem('flag')});

        Post('/profile/users', isFillDb)
            .then( res => {
                window.localStorage.setItem('flag','false');
                e.target.setAttribute(res, "true");
                Message('Success', 'Successful filling database.', false)
            }).catch( err => {
                console.log(err)
        });

    }, false);
}


