/*
 * @Author: your name
 * @Date: 2019-10-27 10:04:20
 * @LastEditTime: 2019-10-27 17:08:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /backendSYS/server/models/category.js
 */
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name:{type:String,required:true},
    parentId:{type:String,required:true,default:'0'},
    create_time:{type:Number,required:true,default:Date.now},
});

const CategoryModel = mongoose.model('categories',categorySchema);

module.exports = CategoryModel;