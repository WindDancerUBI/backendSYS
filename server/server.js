/*
 * @Author: your name
 * @Date: 2019-10-21 19:51:39
 * @LastEditTime: 2019-10-27 12:03:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /backendSYS/server/server.js
 */
const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routers/userRouter')
const categoryRouter = require('./routers/categoryRouter')

// 产生应用对象
const app = express();

// 使用解析post请求的中间件
app.use(express.urlencoded({extended:true}));
// 请求体参数是json结构
app.use(express.json())
app.use('/user',userRouter)
app.use('/category',categoryRouter)

app.get('/',(req,res) => {
    res.send('<h1>这是后台管理系统的后端入口</h1>');
})

mongoose.connect('mongodb://localhost:27017/backendsys').then(() => {
    console.log('mongo connect success');
    app.listen(5000,() => {
        console.log("app's backend is starting at port 5000")
    })
}).catch(error => {
    console.error('database connect failed');
})

