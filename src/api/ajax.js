/*
 * @Author: your name
 * @Date: 2019-10-20 10:14:38
 * @LastEditTime: 2019-10-28 10:48:40
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /backendSYS/src/api/ajax.js
 */
import axios from 'axios'
import {message} from 'antd'

export default function ajax(url, data={}, type='GET') {

  const token = localStorage.getItem('token');

  return new Promise((resolve, reject) => {
    let promise
    // 1. 执行异步ajax请求
    if(type==='GET') { // 发GET请求
      promise = axios.get(
        url, 
        { // 配置对象
          params: data ,
          headers:{
            token
          }
        },
      )
    } else { // 发POST请求
      promise = axios.post(
        url, 
        data,
        {
          headers:{
            token
          }
        } 
      )
    }
    // 2. 如果成功了, 调用resolve(value)
    promise.then(response => {
      resolve(response.data)
    // 3. 如果失败了, 不调用reject(reason), 而是提示异常信息
    }).catch(error => {
      // reject(error)
      message.error('请求出错了: ' + error.message)
    })
  })
}