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

export {idToUserName, listUser}