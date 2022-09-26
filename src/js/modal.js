import {$, log} from "./helpers";
import {listUser, getCard, setCard} from "./localStorage";

function renderAdd() {
    let titleEllement = $('[name="titleForm"]')
    let bodyEllement = $('[name="bodyForm"]')
    let userNameEllement = $('#selectUser')
    userNameEllement.innerHTML = listUserRender()
    titleEllement.value = ''
    bodyEllement.value = ''
    userNameEllement.value = 0
}

function renderEdit(idCurrent) {
    let modalEditEllement=$('#modalEdit')
    modalEditEllement.setAttribute('title',idCurrent)
    log(modalEditEllement)
    let titleEllement = $('[name="titleFormEdit"]')
    let bodyEllement = $('[name="bodyFormEdit"]')
    let userNameEllement = $('[name="userNameEdit"]')
    userNameEllement.innerHTML = listUserRender()
    let {title, body, userNameId} =getCard(idCurrent)
    titleEllement.value = title
    bodyEllement.value = body
    userNameEllement.value = userNameId

}

function listUserRender(){
    log('listUserRender')
    let htmlSelect = ''
    listUser().forEach((item) => {
        let {id, name} = item
        let optionEllement = `<option value=${id}>${name}</option>`
        htmlSelect += optionEllement
    })
    return htmlSelect
}

export {renderAdd, renderEdit}