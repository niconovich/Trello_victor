import {log} from './helpers.js'

function idToUserName(id) {
    let usersJson = JSON.parse(localStorage.getItem('usersJson'));
    let user = ''
    usersJson.forEach((item) => {
        if (item.id == id) {
            user = item.name
        }
    })
    log(`По ${id} найдена запись ${user}`)
    return user
}

function listUser() {
    const usersJson = JSON.parse(localStorage.getItem('usersJson'));
    return usersJson
}

function getCard(id) {
    let allCard = JSON.parse(localStorage.getItem('card'));
    for (let it of allCard) {
        if (it.id == id)   return it
    }
    log('Объект не найден')
    return []
}

function setCard(id,title,body,userNameId){
    log(`setCard ${id}.`)
    let allCard = JSON.parse(localStorage.getItem('card'));
    for (let item of allCard) {
        log(item)
        if (item.id == id)   {
            item.title=title
            item.body=body
            item.userNameId=userNameId
            item.userName=idToUserName(userNameId)
            log(`title- ${title}`)
        }
    }
    log(JSON.stringify(allCard))
    localStorage.setItem('card',JSON.stringify(allCard))
}

export {idToUserName, listUser, getCard, setCard}