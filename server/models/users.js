const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    username:{type:String,required:true},
    password:{type:String,required:true},
    phone:String,
    email:String,
    create_time:{type:String,default:Date.now},
    role_id:String
});

const UserModel = mongoose.model('User',usersSchema);

module.exports = UserModel;