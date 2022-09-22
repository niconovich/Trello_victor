import {Modal} from 'bootstrap';
import {$,$$, log} from './helpers.js';
import {clock} from './clock.js';
import {users} from './jsonplaceholder.js'
import {renderList, createToDo, render} from './addToDo.js'


setInterval(clock, 1000);
clock();
users();


let wrapperEllement = $('.wrapper')
let wrapperBtnEllement = $('.wrapperBtn')
let modalAddEllement = $('#modalAdd')

modalAddEllement.addEventListener('click', function (event) {
    let target = event.target
    if (target.id == 'addConfirm') {
        log('addConfirm')
        createToDo()
    }
})

wrapperBtnEllement.addEventListener('click', function (event) {
    let target = event.target
    console.log(event)
    console.log(target)
   if (target.id == 'addTodo') {
        //Формирование списка пользователей
        renderList()
    }  else if (target.id == 'DeleteALL') {
    let cardStorage = JSON.parse(localStorage.getItem('card'))
    const idDelete = target.parentElement.parentElement.parentElement.id
    let newCardStorage = []
     localStorage.setItem('card', JSON.stringify(newCardStorage));
    render(newCardStorage)}


})

wrapperEllement.addEventListener('click', function (event) {
    let target = event.target
    console.log(event)
    console.log(target)
    if (target.id == 'next') {
        let cardStorage = JSON.parse(localStorage.getItem('card'))
        const idCurrent = target.parentElement.parentElement.parentElement.id
        cardStorage.forEach((item) => {
            if (item.id == idCurrent&&item.state=='todo'){
                item.state='progress'
            } else if (item.id == idCurrent&&item.state=='progress') {
                item.state='done'
            }
        })
        localStorage.setItem('card', JSON.stringify(cardStorage));
        render(cardStorage)
    } else if (target.id == 'back') {
        let cardStorage = JSON.parse(localStorage.getItem('card'))
        const idCurrent = target.parentElement.parentElement.parentElement.id
        cardStorage.forEach((item) => {
            if (item.id == idCurrent&&item.state=='progress'){
                item.state='todo'
            } else if (item.id == idCurrent&&item.state=='done') {
                item.state='progress'
            }
        })
        localStorage.setItem('card', JSON.stringify(cardStorage));
        render(cardStorage)
    } else if (target.id == 'DeleteTodo') {
        let cardStorage = JSON.parse(localStorage.getItem('card'))
        const idDelete = target.parentElement.parentElement.parentElement.id
        let newCardStorage = []
        cardStorage.forEach((item) => {
            if (item.id != idDelete) {
                newCardStorage.push(item)
            }
        })
        localStorage.setItem('card', JSON.stringify(newCardStorage));
        render(newCardStorage)
    }



})

window.addEventListener("load", function (event) {
    log('All resources finished loading!');
    let cardStorage = localStorage.getItem('card');
    let card = cardStorage ? JSON.parse(cardStorage) : []
    render(card)
})
