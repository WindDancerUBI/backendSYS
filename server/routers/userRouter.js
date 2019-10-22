/*
 * @Author: your name
 * @Date: 2019-10-21 20:29:52
 * @LastEditTime: 2019-10-21 21:07:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /backendSYS/server/routers/userRouter.js
 */
const express = require('express');
const Router = express.Router();
const UserModel = require('../models/users');

Router.get('/add',(req,res) => {
    UserModel.create({username:'test',password:1234},(err,doc)=>{
        if(!err){
            return res.json({code:0,data:doc});
        }
    })
})

Router.post('/login',(req,res) => {
    const {username,password} = req.body;
    UserModel.findOne({username,password},(err,doc) => {
        console.log(username);
        console.log(password);
        if(err){
            return res.json({code:1,msg:'服务器维护中'});
        }
        if(!doc){
            return res.json({code:1,msg:'用户名或密码不存在'});
        }
        return res.json({code:0,data:doc,msg:'login success'});
    })
})

module.exports = Router