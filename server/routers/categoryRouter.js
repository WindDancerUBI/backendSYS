/*
 * @Author: your name
 * @Date: 2019-10-27 10:20:04
 * @LastEditTime: 2019-10-27 18:03:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /backendSYS/server/routers/categoryRouter.js
 */
const express = require('express');
const Router = express.Router();
const CategoryModel = require('../models/category');

// 请求卡片接口
Router.get('/list',(req,res) => {
    const parentId = req.query.parentId || '0'
    CategoryModel.find({parentId})
        .then(doc => {
            res.send({code: 0, data: doc})
        })
        .catch(error => {
            console.error('获取分类列表异常', error)
            res.send({code: 1, msg: '获取分类列表异常, 请重新尝试'})
        })
})

// 添加卡片分类接口
Router.post('/add',(req,res) => {
    const {categoryName,parentId} = req.body;
    console.log(categoryName);
    console.log(parentId);
    CategoryModel.findOne({name:categoryName},(err,doc) => {
        if(doc){
            return res.json({code:1,msg:'该分类名已存在'})
        }
        CategoryModel.create({name: categoryName, parentId: parentId || '0'},(err,doc) => {
            return res.send({code:0, data:doc,msg:'添加卡片分类成功'})
        }) 
    })
})

// 更新卡片分类名称
Router.post('/update', (req, res) => {
    const {categoryId, categoryName} = req.body;
    CategoryModel.findOne({name:categoryName},(err,doc) => {
        if(doc){
            return res.json({code:1,msg:'该分类名已存在'})
        }
        CategoryModel.findOneAndUpdate({_id: categoryId}, {name: categoryName,create_time: Date.now()},(err,doc) => {
            if(doc){
                return res.send({code:0, data:doc,msg:'修改卡片分类成功'})
            }
        })
    })
  })

module.exports = Router