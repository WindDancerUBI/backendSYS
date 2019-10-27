/*
 * @Author: your name
 * @Date: 2019-10-26 11:16:23
 * @LastEditTime: 2019-10-26 11:37:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /backendSYS/src/components/BreadCrumb/index.js
 */
import React, { Component } from 'react'
import { Breadcrumb } from 'antd';
import MenuList from "./../../config/menuConfig";
import { Link,withRouter } from "react-router-dom";

@withRouter
class BreadCrumbMenu extends Component {
    constructor(props) {
        super(props);
        this.menuUrlTitle = {};
        this.menuUrlComponent = {};
    }
    componentWillMount(){
        this.getMenuList(MenuList);
    }

    getMenuList(menuList){
        menuList.map(item => {
            if(item.children){
                this.menuUrlTitle[item.key] = item.title;
                this.menuUrlComponent[item.key] = item.component;
                this.getMenuList(item.children);
            }else{
                this.menuUrlTitle[item.key] = item.title;
                this.menuUrlComponent[item.key] = item.component;
            }
        })
    }

    render() {
        const pathSnippets = this.props.location.pathname.split('/').filter(i => i);
        const extraBreadCrumbItems = pathSnippets.map((_,index) => {
            const url = `/${pathSnippets.slice(0,index+1).join('/')}`;
            return(
                !this.menuUrlComponent[url]?
                <Breadcrumb.Item key={url}>
                    {this.menuUrlTitle[url]}
                </Breadcrumb.Item>:
                <Breadcrumb.Item key={url}>
                    <Link to={url}>
                        {this.menuUrlTitle[url]}
                    </Link>
                </Breadcrumb.Item>
            );
        });
        const breadcrumbItem = [
            <Breadcrumb.Item key="tohome">
                <Link to='/home'>返回首页</Link>
            </Breadcrumb.Item>
        ].concat(extraBreadCrumbItems);
        return <Breadcrumb>{breadcrumbItem}</Breadcrumb>
    }
}

export default BreadCrumbMenu