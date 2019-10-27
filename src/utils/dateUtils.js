/*
 * @Author: your name
 * @Date: 2019-10-26 12:18:10
 * @LastEditTime: 2019-10-26 12:32:39
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /backendSYS/src/utils/dateUtils.js
 */
export function formateDate(time){
    if(!time){
        return ''
    }else{
        let date = new Date(time);
        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
    }
}