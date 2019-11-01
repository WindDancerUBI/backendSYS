/*
 * @Author: your name
 * @Date: 2019-10-27 10:20:04
 * @LastEditTime: 2019-10-29 10:34:49
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /backendSYS/server/routers/categoryRouter.js
 */
/*
 * @Author: your name
 * @Date: 2019-10-27 10:20:04
 * @LastEditTime: 2019-10-28 12:54:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /backendSYS/server/routers/categoryRouter.js
 */
const express = require('express');
const Router = express.Router();
const CategoryModel = require('../models/category');
const tokenCheck = require('../utils/tokenCheck')
const pageFilter = require('../utils/pageFilter')

Router.use((req,res,next) => tokenCheck(req.headers['token'],res,next))
// 请求卡片接口
Router.get('/list',(req,res) => {
    const parentId = req.query.parentId || '0'
    const { pageNum,pageSize } = req.query
    CategoryModel.find({parentId},(err,doc) => {
        if(err){
            return res.json({code: 1, msg:err})
        }
        if(doc){
            return res.json({code: 0, data: pageFilter(doc,pageNum,pageSize)})
        }
    })
})

// 添加卡片分类接口
Router.post('/add',(req,res) => {
    const {categoryName,parentId} = req.body;
    // console.log(categoryName);
    // console.log(parentId);
    CategoryModel.findOne({name:categoryName},(err,doc) => {
        if(doc){
            return res.json({code:1,msg:'该分类名已存在'})
        }
        CategoryModel.create({name: categoryName, parentId: parentId || '0'},(err,doc) => {
            return res.json({code:0, data:doc,msg:'添加卡片分类成功'})
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