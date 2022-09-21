import { Modal } from 'bootstrap';
import { $ } from './helpers.js';
import { clock } from './clock.js';
import { users } from './jsonplaceholder.js'


setInterval(clock, 1000);
clock();


console.log(users())

//modal.show()
let AddEllement=document.querySelector('#addTodo')
AddEllement.addEventListener('click',function(event) {
    let preventDefault=event.preventDefault();
    console.log(event)
    let modalElem =  document.querySelector('.modalAdd')
    console.log(modalElem)
    modalElem.classList.add('active');
    overlay.classList.add('active');
})