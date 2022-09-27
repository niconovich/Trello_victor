import {$, log} from './helpers.js';
import {users} from './jsonplaceholder.js'
import {idToUserName, listUser, setEditCard} from './localStorage.js'

class ToDo {
    constructor(title, body, userNameId, dateCreate, state) {
        this.id = dateCreate.getTime()
        this.title = title
        this.body = body
        this.userNameId = userNameId
        this.userName = idToUserName(userNameId)
        this.dateCreate = dateCreate
        this.time = `${dateCreate.getHours()}:${dateCreate.getMinutes()}`
        this.state = state
    }
}

const allToDo = {
    'todo': [],
    'progress': [],
    'done': [],
}


function createToDo() {
    let cardStorage = localStorage.getItem('card');
    let card = cardStorage ? JSON.parse(cardStorage) : allToDo
    for (let key in allToDo) {
        allToDo[key] = card[key]
    }
    let state = 'todo'
    let title = $('[name="titleForm"]').value
    let body = $('[name="bodyForm"]').value
    let userNameId = $('[name="userName"]').value
    let dateCurrent = new Date()
    const cardTodo = new ToDo(title, body, userNameId, dateCurrent, 'todo')
    let array = allToDo[state]
    array.push(cardTodo)
    allToDo[state] = array
    localStorage.setItem('card', JSON.stringify(allToDo));
    render(allToDo)
}

function renderToDo({id, title, body, userName, time, state}) {
    let btnBack, buttonDel, buttonEdit, btnNext = ''
    // let btnNext = ''
    let colorTodo
    switch (state) {
        case 'todo':
            colorTodo = 'green'
            btnBack = 'none'

            break;
        case 'progress':
            colorTodo = 'gray'
            buttonEdit = 'none'
            buttonDel = 'none'
            break;
        case 'done':
            colorTodo = 'cyan'
            btnNext = 'none'
            buttonEdit = 'none'
            break;
    }
    let todo = `<div class="todo ${colorTodo}" id="${id}">
                    <div class="todo_head">

                        <div class="head_btn">
                        <div class="id"><span><b>ID: </b></span>${id}</div>
                        <div class="btnToDO">
                            <button type="button" class="btn btn-light todobtn ${buttonEdit}" data-bs-toggle="modal"
                                    data-bs-target="#modalEdit" id="EditTodo">
                                Изменить
                            </button>
                            <button type="button" class="btn btn-light todobtn ${buttonDel}" id="DeleteTodo" >
                                Удалить
                            </button>
                            </div>
                        </div>
                         <div class="head_title">
                        <span><b>Заголовок:</b></span>
                        ${title}
                        </div>
                    </div>
                    <div class="todo_body">
                        <button type="button" class="btn btn-light todo_back ${btnBack}" id="back"><</button>
                          <div class="body_text"><span><b>Описание:</b></span><br>
                        ${body}</div>
                         <button type="button" class="btn btn-light todo_next ${btnNext}" id="next">></button>
                    </div>
                    <div class="todo_footer">
                        <div class="todo_user"><span><b>Ответсвенный:</b></span><br>${userName}</div>
                        <div class="todo_time"><span><b>Время создания:</b></span><br>${time}</div>
                    </div>
                </div>
            </div>`
    return todo
}


function render(allList) {
    let count = {
        todo: 0,
        progress: 0,
        done: 0
    }
    const mainAllEllement = document.querySelectorAll('.card_main')
    mainAllEllement.forEach((item) => item.innerHTML = null)
    const countllEllement = document.querySelectorAll('.count')
    countllEllement.forEach((item) => item.textContent = 0)
    for (let key in allList) {
        allList[key].forEach((item) => {
            const mainEllement = $(`#main_${item.state}`)
            let startinnerHTML = mainEllement.innerHTML
            count[item.state] += 1
            const countTodoEllement = document.querySelector(`#count_${item.state}`)
            countTodoEllement.textContent = count[item.state]
            startinnerHTML += renderToDo(item)
            mainEllement.innerHTML = startinnerHTML
        })
    }

}


export {createToDo, render}


