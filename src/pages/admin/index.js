/*
 * @Author: your name
 * @Date: 2019-10-20 08:42:54
 * @LastEditTime: 2019-10-26 10:28:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /backendSYS/src/pages/admin/index.js
 */
import React, { Component } from 'react'
import { observer, inject } from "mobx-react";
import { Redirect,Switch,Route } from "react-router-dom";
import { Layout } from "antd";
import LeftNav from '../../components/LeftNav';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './index.scss'
import menuList from './../../config/menuConfig';

@observer
@inject('userStore')
class Admin extends Component {
    constructor(props) {
        super(props)
        this.RouteList = []
    }

    componentWillMount(){
        this.getRouteList(menuList);
    }

    getRouteList(menuList){
        menuList.map(item => {
            if(!item.children){
                this.RouteList.push(item);
            }else{
                this.getRouteList(item.children);
            }
        })
    }

    render() {
        
        if(!localStorage.getItem('token')){
            return <Redirect to = '/login' />
        }

        return (
            <div>
                <Layout className='admin'>
                    <Layout.Sider className='admin-leftnav'>
                        <LeftNav />
                    </Layout.Sider>
                    <Layout>
                        <Layout.Header className='admin-header'>
                            <Header />
                        </Layout.Header>
                        <Layout.Content className='admin-content'>
                            
                            <Switch>
                                <Redirect exact from='/' to='/home' />
                                {this.RouteList.map(item => 
                                    <Route path={item.key} component={item.component} />  
                                )}
                                
                            </Switch>

                        </Layout.Content>
                        <Layout.Footer className='admin-footer'>
                            <Footer />
                        </Layout.Footer>
                    </Layout>
                </Layout>
            </div>
        )
    }
}

export default Admin