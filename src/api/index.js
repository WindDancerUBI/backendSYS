/*
 * @Author: your name
 * @Date: 2019-10-20 10:14:50
 * @LastEditTime: 2019-10-21 22:11:22
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /backendSYS/src/api/index.js
 */
import ajax from './ajax' 
import jsonp from "jsonp";
import { message } from 'antd';

// 登录请求接口
export const reqLogin = (username, password) => ajax('/user/login', {username, password}, 'POST')

// 天气请求接口
export const reqWeather = (city) => {
    const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
    return new Promise((resolve,reject) => {
        // options选择默认值
        jsonp(url,{},(err,data) => {
            if(!err && data.status === 'success'){
                const { weather, dayPictureUrl } = data.results[0].weather_data[0];
                resolve({ weather, dayPictureUrl })
            }else{
                message.error('获取天气失败');
            }
        })
    })
}