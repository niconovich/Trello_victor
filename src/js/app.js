import {Modal} from 'bootstrap';
import {$, $$, log} from './helpers.js';
import {clock} from './clock.js';
import {users} from './jsonplaceholder.js'
import {createToDo, render} from './addToDo.js'
import {renderAdd, renderEdit} from './modal.js'
import {setCard, changeState, getCard,deleteCard} from "./localStorage";

setInterval(clock, 1000);
clock();
users();

const allToDo = {
    'todo': [],
    'progress': [],
    'done': [],
}

let wrapperEllement = $('.wrapper')
let wrapperBtnEllement = $('.wrapperBtn')
let modalAddEllement = $('#modalAdd')
let modalEditEllement = $('#modalEdit')

modalAddEllement.addEventListener('click', function (event) {
    let target = event.target
    if (target.id == 'addConfirm') {
        log('addConfirm')
        createToDo()
    }
})

modalEditEllement.addEventListener('click', function (event) {
    let target = event.target
    if (target.id == 'EditConfirm') {
        log('EditConfirm')
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
        log('addTodo')
        //Формирование списка пользователей
        renderAdd()
    } else if (target.id == 'DeleteALL') {
        let cardStorage = JSON.parse(localStorage.getItem('card'))
        let newCardStorage = []
        cardStorage['done'].forEach((item)=>{
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
    let todo=getCard(idCurrent)
    if (target.id == 'next') {
        let nextState=todo.state=='todo'?'progress':'done'
        changeState(idCurrent,todo.state,nextState)
        let cardStorage = JSON.parse(localStorage.getItem('card'))
        render(cardStorage)
    } else if (target.id == 'back') {
        let nextState=todo.state=='done'?'progress':'todo'
        changeState(idCurrent,todo.state,nextState)
        let cardStorage = JSON.parse(localStorage.getItem('card'))
        render(cardStorage)
    } else if (target.id == 'DeleteTodo') {
        // const idDelete = target.parentElement.parentElement.parentElement.id
        deleteCard(idCurrent)
        let cardStorage = JSON.parse(localStorage.getItem('card'))
        render(cardStorage)
    } else if (target.id == 'EditTodo') {
        renderEdit(idCurrent)
    }


})

window.addEventListener("load", function (event) {
    log('All resources finished loading!');
    let cardStorage = localStorage.getItem('card');
    let card = cardStorage ? JSON.parse(cardStorage) : allToDo
    render(card)
})
