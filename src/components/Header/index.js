/*
 * @Author: your name
 * @Date: 2019-10-23 10:18:48
 * @LastEditTime: 2019-10-27 09:08:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /backendSYS/src/components/Header/index.js
 */
import React, { Component } from 'react'
import './index.scss'
import { Menu, Button, Dropdown, Icon } from 'antd'
import { withRouter } from "react-router-dom";
import { observer, inject } from "mobx-react";
import BreadCrumbMenu from "./../BreadCrumb/index";
import { formateDate } from '../../utils/dateUtils';
import { reqWeather } from '../../api';


@withRouter
@observer
@inject('userStore')
class Header extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: null,
            dayPictureUrl: '',
            weather: '',
            currentTime: ''
        }
        this.cityName = '';
    }

    componentDidMount(){
        this.getTime();
        this.getWeather();
        const username = this.props.userStore.username || localStorage.getItem('username');
        this.setState(
            {username}
        )
    }

    // 获取时间
    getTime(){
        this.timer = setInterval(() => {
            const currentTime = formateDate(Date.now())
            this.setState(
                {currentTime}
            )
        }, 1000);
    }

    // 获取天气
    getWeather = async() => {
        // 调用接口请求异步获取数据
        const {dayPictureUrl, weather} = await reqWeather('武汉市')
        // 更新状态
        this.setState({dayPictureUrl, weather})
    }

    // 退出登录，清除存储在localstorage中的数据
    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        this.props.history.push('/login')
    }

    render() {
        const menu = (
            <Menu>
                <Menu.Item>
                    <Button type='link'>
                        设置
                    </Button>
                </Menu.Item>
                <Menu.Item>
                    <Button type='link' onClick={this.logout}>
                        退出
                    </Button>
                </Menu.Item>
            </Menu>
        )

        const {currentTime,dayPictureUrl,weather,username} = this.state;
        return (
            <div className='header'>
                <div className='header-left'>
                    <Icon className="menu-logo" type='menu' />
                    <BreadCrumbMenu />
                </div>
                <div className='header-right'>
                    <span>{currentTime}</span>
                    <img src={dayPictureUrl} alt="weather"/>
                    <span>{weather}</span>
                    <span> 欢迎，{username}</span>
                    <Dropdown overlay={menu}>
                        <Icon type='setting' theme='filled'/>
                    </Dropdown>
                </div>
            </div>
        )
    }
}

export default Header