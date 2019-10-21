/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-20 08:42:04
 * @LastEditTime: 2019-10-20 09:13:34
 * @LastEditors: Please set LastEditors
 */
import React, { Component } from 'react'
// import { Button, Input } from "antd";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Login from './pages/login';
import Admin from './pages/admin';

class App extends Component {

    render() {
        return (
            <div>
                <BrowserRouter>
                    <Switch>
                        <Route path='/login' component={Login}/>
                        <Route path='/' component={Admin}/>   
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }
}

export default App