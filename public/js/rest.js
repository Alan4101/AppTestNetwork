"use strict";

export function Get(url) {
    return new Promise(function(success, fail){

        let req = new XMLHttpRequest();

        req.open('GET', url, true);

        req.addEventListener('load', ()=> {
            req.status<400 ?
                success(req.responseText) :
                    fail( new Error(`Request failed: ${req.status} `));
        });

       req.addEventListener('error', ()=> {
           fail(new  Error("Network error"));
       });
        req.send();
    })
}

export function Post(url, reqBody){
    return new Promise(function(success, fail){

        let req = new XMLHttpRequest();

        req.open("POST", url, true);

        // req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        req.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

        req.addEventListener('load', function(){
            req.status < 400 ?
                success(req.responseText) :
                    fail(new Error('Request failed: '+ req.status));
        });

        req.addEventListener('error', ()=>{
            fail( new Error("network error!"));
        });
        req.send(reqBody);
    })
}
