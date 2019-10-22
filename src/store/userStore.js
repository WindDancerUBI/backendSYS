/*
 * @Author: your name
 * @Date: 2019-10-21 21:24:51
 * @LastEditTime: 2019-10-21 22:29:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /backendSYS/src/store/userStore.js
 */
import { observable, action } from "mobx";
import { reqLogin } from "./../api/index";
import { message } from "antd";

class UserStore {
    @observable username = null;
    // 登录操作：后台验证数据、前台存储数据
    @action login(data,history){
        const {username,password} = data;
        reqLogin(username,password).then(res => {
            if(res.code === 0){
                this.username = res.data.username;
                sessionStorage.setItem('username',this.username);
                history.push('/');
            }else{
                message.error(res.msg);
            }
        }) 
    }
} 

export default UserStore;