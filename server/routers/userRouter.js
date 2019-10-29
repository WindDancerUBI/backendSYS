/*
 * @Author: your name
 * @Date: 2019-10-21 20:29:52
 * @LastEditTime: 2019-10-28 15:38:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /backendSYS/server/routers/userRouter.js
 */
const express = require('express');
const Router = express.Router();
const UserModel = require('../models/users');
const jwt = require('jsonwebtoken');

Router.get('/add',(req,res) => {
    UserModel.create({username:'test',password:1234},(err,doc)=>{
        if(!err){
            return res.json({code:0,data:doc});
        }
    })
})

// 用户登录接口
Router.post('/login',(req,res) => {
    const {username,password} = req.body;
    UserModel.findOne({username,password},(err,doc) => {
        if(err){
            return res.json({code:1,msg:'服务器打盹中，请稍后再试'});
        }
        if(!doc){
            return res.json({code:1,msg:'用户名或密码不存在'});
        }
        // 要生成token的主题信息
        let content ={username:req.body.username}; 
        // 这是加密的key（密钥）
        let secretOrPrivateKey="jwt";
        // 根据参数生成token值
        let token = jwt.sign(content, secretOrPrivateKey, {
            expiresIn: 60*60*12 // 12小时过期
        });
        doc.token = token;
        UserModel(doc).save((err,doc) => {
            if(err){
                return res.json({code:1,msg:err});
            }
            return res.json({code:0,data:doc,token:token,msg:'登录成功'});
        })
    })
})

module.exports = Router