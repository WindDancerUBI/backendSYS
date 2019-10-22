/*
 * @Author: your name
 * @Date: 2019-10-20 10:14:50
 * @LastEditTime: 2019-10-21 22:11:22
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /backendSYS/src/api/index.js
 */
import ajax from './ajax' 
export const reqLogin = (username, password) => ajax('/user/login', {username, password}, 'POST')