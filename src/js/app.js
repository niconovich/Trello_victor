import {Modal} from 'bootstrap';
import {$, $$, log} from './helpers.js';
import {clock} from './clock.js';
import {users} from './jsonplaceholder.js'
import {createToDo, render, editToDo} from './addToDo.js'
import {renderAdd, renderEdit} from './modal.js'
import {setCard} from "./localStorage";

setInterval(clock, 1000);
clock();
users();


let wrapperEllement = $('.wrapper')
let wrapperBtnEllement = $('.wrapperBtn')
let modalAddEllement = $('#modalAdd')
let modalEditEllement = $('#modalEdit')

modalAddEllement.addEventListener('click', function (event) {
    let target = event.target
    if (target.id == 'addConfirm') {
        createToDo()
    }
})

modalEditEllement.addEventListener('click', function (event) {
    let target = event.target
    if (target.id == 'EditConfirm') {
        let idCurrent = $('[name="modalEdit"]').title
        let title = $('[name="titleFormEdit"]').value
        let body = $('[name="bodyFormEdit"]').value
        let userNameId = $('[name="userNameEdit"]').value
        setCard(idCurrent,title,body,userNameId)
        let cardStorage = localStorage.getItem('card');
        let card = cardStorage ? JSON.parse(cardStorage) : []
        render(card)

    }
})


wrapperBtnEllement.addEventListener('click', function (event) {
    let target = event.target
    if (target.id == 'addTodo') {
        //Формирование списка пользователей
        renderAdd()
    } else if (target.id == 'DeleteALL') {
        let cardStorage = JSON.parse(localStorage.getItem('card'))
        let newCardStorage = []
        cardStorage.forEach((item)=>{
            if (item.state!='done'){
                newCardStorage.push(item)
            }
        })
        localStorage.setItem('card', JSON.stringify(newCardStorage));
        render(newCardStorage)
    }


})

wrapperEllement.addEventListener('click', function (event) {
    let target = event.target
    const idCurrent = target.parentElement.parentElement.parentElement.id
    if (target.id == 'next') {
        let cardStorage = JSON.parse(localStorage.getItem('card'))
        //const idCurrent = target.parentElement.parentElement.parentElement.id
        cardStorage.forEach((item) => {
            if (item.id == idCurrent && item.state == 'todo') {
                item.state = 'progress'
            } else if (item.id == idCurrent && item.state == 'progress') {
                item.state = 'done'
            }
        })
        localStorage.setItem('card', JSON.stringify(cardStorage));
        render(cardStorage)
    } else if (target.id == 'back') {
        let cardStorage = JSON.parse(localStorage.getItem('card'))
        //const idCurrent = target.parentElement.parentElement.parentElement.id
        cardStorage.forEach((item) => {
            if (item.id == idCurrent && item.state == 'progress') {
                item.state = 'todo'
            } else if (item.id == idCurrent && item.state == 'done') {
                item.state = 'progress'
            }
        })
        localStorage.setItem('card', JSON.stringify(cardStorage));
        render(cardStorage)
    } else if (target.id == 'DeleteTodo') {
        let cardStorage = JSON.parse(localStorage.getItem('card'))
        // const idDelete = target.parentElement.parentElement.parentElement.id
        let newCardStorage = []
        cardStorage.forEach((item) => {
            if (item.id != idCurrent) {
                newCardStorage.push(item)
            }
        })
        localStorage.setItem('card', JSON.stringify(newCardStorage));
        render(newCardStorage)
    } else if (target.id == 'EditTodo') {
        renderEdit(idCurrent)
    }


})

window.addEventListener("load", function (event) {
    log('All resources finished loading!');
    let cardStorage = localStorage.getItem('card');
    let card = cardStorage ? JSON.parse(cardStorage) : []
    render(card)
})
