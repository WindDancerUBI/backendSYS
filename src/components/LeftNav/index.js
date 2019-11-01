/*
 * @Author: your name
 * @Date: 2019-10-23 10:18:26
 * @LastEditTime: 2019-10-29 12:15:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /backendSYS/src/components/LeftNav/index.js
 */
import React, { Component } from 'react'
import MenuList from './../../config/menuConfig'
import { Icon, Menu  } from "antd";
import { Link } from "react-router-dom";
import logo from "./../../assets/images/logo.png";
import { withRouter } from "react-router-dom";
import './index.scss'

@withRouter
class LeftNav extends Component {
    constructor(props) {
        super(props)
        this.state = {
            leftMenu: null,
            openKeys: [],
            collapsed:false
        }
    }
    

    componentWillMount(){
        const leftMenu = this.getLeftMenu(MenuList);
        this.setState({
            leftMenu,
            openKeys: [this.defaultOpenKeys]
        })
    }

    // 获取左侧导航栏中的内容
    getLeftMenu(menuList){
        return menuList.map(item => {
            if(item.children && !item.childHidden){
                const cItem = item.children.find(cItem => this.props.location.pathname.indexOf(cItem.key)===0)
                if(cItem){
                    this.defaultOpenKeys = item.key;
                }
                return(
                    <Menu.SubMenu 
                        key={item.key}
                        title={<span><Icon type={item.icon} /><span>{item.title}</span></span>}
                    >
                        {this.getLeftMenu(item.children)}
                    </Menu.SubMenu>
                )
            }else{
                return(
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
            }
        })
    }

    // 左侧导航栏只允许有一个展开的Menu
    openChangeHandle = openKeys => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        this.setState({
            openKeys: latestOpenKey ? [latestOpenKey] : [],
          });
    }


    render() {
        const { leftMenu,openKeys } = this.state;
        const pathname = this.props.location.pathname === '/'?'/home':this.props.location.pathname;
        return (
            <div className='leftnav'>
                <Link to='/home'>
                <div className='leftnav-header'>
                    <img src={logo} alt='logo'/>
                    <span>后台管理</span>
                </div>
                </Link>
                <Menu
                    mode="inline"
                    theme="dark"
                    openKeys={openKeys}
                    selectedKeys={[pathname]}
                    onOpenChange={this.openChangeHandle}
                >
                    {leftMenu}
                </Menu>
            </div>
        )
    }
}


export default LeftNav