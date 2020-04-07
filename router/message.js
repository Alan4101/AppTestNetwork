'use strict';
export function Message(header, msg, err){

    let div = document.createElement('div');

    div.classList.add('msg-body');
    div.innerHTML= `<h5>${header}</h5><p>${msg}</p>`;
    document.body.appendChild(div);

    setInterval(function () {
        div.style.opacity = 0;
    },2000);

    div.addEventListener('mouseenter',() => div.style.opacity = 0);

    err ?  div.style.background = "#28a745" :  div.style.background = '#e57373';


}