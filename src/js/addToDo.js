import {$, log} from './helpers.js';
import {users} from './jsonplaceholder.js'
import {idToUserName, listUser} from './localStorage.js'

function renderList() {
    let userNameElement = $('#selectUser')
    let htmlSelect = ''

    listUser().forEach((item) => {
        //log(item)
        let {id, name} = item
        let optionEllement = `<option value=${id}>${name}</option>`
        htmlSelect += optionEllement
    })
    userNameElement.innerHTML = htmlSelect
    let titleEllement = $('[name="titleForm"]')
    let bodyEllement = $('[name="bodyForm"]')
    let userNameEllement = $('[name="userName"]')
    titleEllement.value = ''
    bodyEllement.value = ''
    userNameEllement.value = 0
}


function createToDo() {
    let object = {
        id: '',
        title: '',
        body: '',
        userNameId: '',
        userName: '',
        dateCreate: new Date(),
        time: '',
        state: ''
    }

    let dateCurrent = new Date()
    object.dateCreate = dateCurrent
    object.time = `${dateCurrent.getHours()}:${dateCurrent.getMinutes()}`
    object.id = dateCurrent.getTime()
    object.title = $('[name="titleForm"]').value
    object.body = $('[name="bodyForm"]').value
    object.userNameId = $('[name="userName"]').value
    let userName = idToUserName(object.userNameId)
    log(`userName - ${userName}`)
    object.userName = userName
    object.state = 'todo'
    // console.dir(object)
    //log(id,title,body,userName,dateCreate)

    let cardStorage = localStorage.getItem('card');
    let card = cardStorage ? JSON.parse(cardStorage) : []
    log(`card - ${card}`)
    card.push(object)
    localStorage.setItem('card', JSON.stringify(card));
    render(card)
}

function renderToDo({id, title, body, userName, time, state}) {
    let btnBack = ''
    let btnNext = ''
    let colorTodo
    switch (state) {
        case 'todo':
            colorTodo = 'green'
            btnBack = 'none'
            break;
        case 'progress':
            colorTodo = 'gray'
            break;
        case 'done':
            colorTodo = 'cyan'
            btnNext = 'none'
            break;
    }
    let todo = `<div class="todo ${colorTodo}" id="${id}">
                    <div class="todo_head">
                        <div class="head_title">${title}</div>
                        <div class="head_btn">
                            <button type="button" class="btn btn-light todobtn " data-bs-toggle="modal"
                                    data-bs-target="#exampleModal" id="EditTodo">
                                Edit
                            </button>
                            <button type="button" class="btn btn-light todobtn" id="DeleteTodo">
                                Delete
                            </button>
                        </div>
                    </div>
                    <div class="todo_body">
                        <div ><button type="button" class="btn btn-light todo_back ${btnBack}" id="back"><</button></div>
                          <div class="body_text">${body}</div>
                        <div > <button type="button" class="btn btn-light todo_next ${btnNext}" id="next">></button></div>
                    </div>
                    <div class="todo_footer">
                        <div class="todo_user">${userName}</div>
                        <div class="todo_time">${time}</div>
                    </div>
                </div>
            </div>`
    return todo
}

function render(allList) {
    let cout = {
        todo: 0,
        progress: 0,
        done: 0
    }

    const mainAllEllement = document.querySelectorAll('.card_main')
    mainAllEllement.forEach((item) => item.innerHTML = null)
    const countllEllement = document.querySelectorAll('.count')
    countllEllement.forEach((item) => item.textContent = 0)
    allList.forEach((item) => {
            log(item.state)

            const mainEllement = $(`#main_${item.state}`)
            let startinnerHTML = mainEllement.innerHTML
            cout[item.state] += 1
            const countTodoEllement = document.querySelector(`#count_${item.state}`)
            countTodoEllement.textContent = cout[item.state]
            startinnerHTML += renderToDo(item)
            log(mainEllement)
            mainEllement.innerHTML = startinnerHTML
        }
    )

}

export {renderList, createToDo, render}


