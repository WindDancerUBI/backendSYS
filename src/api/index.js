import ajax from './ajax' 
const reqLogin = (username, password) => ajax('/login', {username, password}, 'POST')