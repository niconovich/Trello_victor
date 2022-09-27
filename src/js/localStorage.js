import {$, log} from './helpers.js'
import { Modal } from 'bootstrap'

const delAllEllement=$('#DeleteALL')
const upLimitEllement=$('#upLimit')
function idToUserName(id) {
    let usersJson = JSON.parse(localStorage.getItem('usersJson'));
    let user = ''
    usersJson.forEach((item) => {
        if (item.id == id) {
            user = item.name
        }
    })
    //log(`По ${id} найдена запись ${user}`)
    return user
}

function listUser() {
    const usersJson = JSON.parse(localStorage.getItem('usersJson'));
    return usersJson
}

function getCard(id) {
    let allCard = JSON.parse(localStorage.getItem('card'));
    for (let key in allCard) {
        for (let it of allCard[key]) {
            if (it.id == id) return it
        }
    }
    log('Объект не найден')
    return []
}

function setCard(id, title, body, userNameId) {
    log(`setCard ${id}.`)
    let allCard = JSON.parse(localStorage.getItem('card'));
    if (id != null) {
        let card = getCard(id)
        for (let item of allCard[card.state]) {
            if (item.id == id) {
                item.title = title
                item.body = body
                item.userNameId = userNameId
                item.userName = idToUserName(userNameId)
                item.userName = idToUserName(userNameId)
                log(`title- ${title}`)
            }
        }
    } else {

    }
    log(JSON.stringify(allCard))
    localStorage.setItem('card', JSON.stringify(allCard))
}

function changeState(idCurrent, oldState, newState) {
    if (newState=='done') {delAllEllement.disabled=false}
    let allCard = JSON.parse(localStorage.getItem('card'));
    let newStateObject = []
    let oldStateObject = []
    if (allCard[newState].length==5) {
        console.dir(upLimitEllement)
        const myModal = new Modal(document.getElementById('upLimit'))
        myModal.show();
        }
    allCard[newState].forEach((item) => {
        newStateObject.push(item)})
    const changeCard = getCard(idCurrent)
    changeCard.state = newState
    newStateObject.push(changeCard)
      allCard[oldState].forEach((item, i, array) => {
        if (item.id != idCurrent) {
           oldStateObject.push(item)
        }
    })
    allCard[newState] =newStateObject
    allCard[oldState]=oldStateObject
    if (allCard['done'].length==0) {delAllEllement.disabled=true}
    localStorage.setItem('card', JSON.stringify(allCard))
}

function deleteCard(idCurrent) {
    let allCard = JSON.parse(localStorage.getItem('card'));
    const card = getCard(idCurrent)
    let newCards = []
    allCard[card.state].forEach((item, i, array) => {
        if (item.id != idCurrent) {
            newCards.push(item)
        }
    })
    allCard[card.state] =newCards
    localStorage.setItem('card', JSON.stringify(allCard))
}

export {idToUserName, listUser, getCard, setCard, changeState,deleteCard}