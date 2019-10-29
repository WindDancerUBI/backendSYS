/*
 * @Author: your name
 * @Date: 2019-10-28 09:37:56
 * @LastEditTime: 2019-10-28 12:50:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /backendSYS/server/utils/tokenCheck.js
 */
const UserModel = require('../models/users');
const jwt = require('jsonwebtoken');

//检测token
function tokenCheck(token,res,next){
    UserModel.findOne({token},(err, doc)=>{
        if (err) {
            return res.json({code:1,msg:err})
        }
        if(doc){
            let secretOrPrivateKey="jwt"; // 这是加密的key（密钥） 
            jwt.verify(token, secretOrPrivateKey, function (err, decode) {
                if (err) {  
                    //  时间失效的时候/ 伪造的token          
                    return res.json({code:1,msg:'过期的token值'})     
                } else {
                   next();
                }
            })   
        }else{
            return res.json({code: 1, msg:'无效的token值'})
        }
    })
}

module.exports = tokenCheck;