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

const delAllEllement=$('#DeleteALL')
const wrapperEllement = $('.wrapper')
const wrapperBtnEllement = $('.wrapperBtn')
const modalAddEllement = $('#modalAdd')
const modalEditEllement = $('#modalEdit')
const delConfirmEllement = $('#delConfirm')

modalAddEllement.addEventListener('click', function (event) {
    let target = event.target

    if (target.id == 'addConfirm') {
        log('addConfirm')
        createToDo()
    }
})


delConfirmEllement.addEventListener('click', function (event) {
    const target = event.target
    if (target.id == 'delConfirm') {
        log('DeleteALL')
        let cardStorage = JSON.parse(localStorage.getItem('card'))
        let newCardStorage = []
        cardStorage['done'].forEach((item) => {
            if (item.state != 'done') {
                newCardStorage.push(item)
            }
        })
        cardStorage['done'] = newCardStorage
        localStorage.setItem('card', JSON.stringify(cardStorage))
        render(cardStorage)
        delAllEllement.disabled = true
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
        let card = cardStorage ? JSON.parse(cardStorage) : allToDo
        render(card)

    }
})


wrapperBtnEllement.addEventListener('click', function (event) {
    let target = event.target
    if (target.id == 'addTodo') {
        log('addTodo')
        //Формирование списка пользователей
        renderAdd()
    }
       // localStorage.setItem('card', JSON.stringify(newCardStorage));
       // render(newCardStorage)
 })

wrapperEllement.addEventListener('click', function (event) {
    let target = event.target
    let idCurrent = target.parentElement.parentElement.id

    if (target.id == 'next') {
        let todo=getCard(idCurrent)
        let nextState=todo.state=='todo'?'progress':'done'
        changeState(idCurrent,todo.state,nextState)
        let cardStorage = JSON.parse(localStorage.getItem('card'))
        render(cardStorage)
    } else if (target.id == 'back') {
        let todo=getCard(idCurrent)
        let nextState=todo.state=='done'?'progress':'todo'
        changeState(idCurrent,todo.state,nextState)
        let cardStorage = JSON.parse(localStorage.getItem('card'))
        render(cardStorage)
    } else if (target.id == 'DeleteTodo') {
        idCurrent=event.target.parentElement.parentElement.parentElement.parentElement.id
        log(idCurrent)
        deleteCard(idCurrent)
        let cardStorage = JSON.parse(localStorage.getItem('card'))
        render(cardStorage)
        if (cardStorage['done'].length==0) {delAllEllement.disabled=true}
    } else if (target.id == 'EditTodo') {
        target = event.target
        idCurrent=target.parentElement.parentElement.parentElement.parentElement.id
        renderEdit(idCurrent)
    }


})

window.addEventListener("load", function (event) {
    log('All resources finished loading!');

    let cardStorage = localStorage.getItem('card');
    let allCard = cardStorage ? JSON.parse(cardStorage) : allToDo
    localStorage.setItem('card', JSON.stringify(allCard))
    if (allCard['done'].length==0)    {
        delAllEllement.disabled=true
    } else {
        delAllEllement.disabled=false
    }

    render(allCard)
})
