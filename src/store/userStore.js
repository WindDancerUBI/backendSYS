/*
 * @Author: your name
 * @Date: 2019-10-21 21:24:51
 * @LastEditTime: 2019-10-22 15:56:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /backendSYS/src/store/userStore.js
 */
import { observable, action } from "mobx";
import { reqLogin } from "./../api/index";
// import { message } from "antd";

class UserStore {

    // 登录用户名
    @observable username = null;
    // 登录错误信息
    @observable loginError = null;

    // 登录操作：后台验证数据、前台存储数据
    @action login(data,history){
        const {username,password} = data;
        reqLogin(username,password).then(res => {
            if(res.code === 0){
                this.username = res.data.username;
                this.loginError = null;
                // 存储username，解决刷新页面后状态丢失的问题
                localStorage.setItem('username',this.username);
                // 存储token，用于之后的身份验证
                localStorage.setItem('token',res.token);
                history.push('/');
            }else{
                this.loginError = res.msg;
                return res.msg
            }
        }) 
    }
} 

export default UserStore;