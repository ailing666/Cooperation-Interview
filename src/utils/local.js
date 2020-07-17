// import axios from 'axios'
function saveLocal(value) {
    window.localStorage.setItem('token', value)
}
function getLocal() {
    return window.localStorage.getItem('token')
}
function removeToken() {
    return window.localStorage.removeItem('token')
}
export { saveLocal, getLocal, removeToken }