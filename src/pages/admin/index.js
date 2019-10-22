/*
 * @Author: your name
 * @Date: 2019-10-20 08:42:54
 * @LastEditTime: 2019-10-21 22:35:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /backendSYS/src/pages/admin/index.js
 */
import React, { Component } from 'react'
import { observer, inject } from "mobx-react";

@observer
@inject('userStore')
class Admin extends Component {

    render() {
        const userStore = this.props.userStore.username || sessionStorage.getItem('username');
        return (
            <div>
                Admin,{userStore}
            </div>
        )
    }
}

export default Admin