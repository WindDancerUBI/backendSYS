/*
 * @Author: your name
 * @Date: 2019-10-21 20:21:25
 * @LastEditTime: 2019-10-28 09:21:06
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /backendSYS/server/models/users.js
 */
const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    username:{type:String,required:true},
    password:{type:String,required:true},
    token:{type:String},
    phone:String,
    email:String,
    create_time:{type:String,default:Date.now},
    role_id:String
});

const UserModel = mongoose.model('User',usersSchema);

module.exports = UserModel;