/*
 * @Author: your name
 * @Date: 2019-10-20 08:42:54
 * @LastEditTime: 2019-10-22 12:08:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /backendSYS/src/pages/admin/index.js
 */
import React, { Component } from 'react'
import { observer, inject } from "mobx-react";
import { Redirect } from "react-router-dom";

@observer
@inject('userStore')
class Admin extends Component {

    render() {
        if(!localStorage.getItem('token')){
            return <Redirect to = '/login' />
        }
        const userStore = this.props.userStore.username || localStorage.getItem('username');
        return (
            <div>
                Admin,{userStore}
            </div>
        )
    }
}

export default Admin