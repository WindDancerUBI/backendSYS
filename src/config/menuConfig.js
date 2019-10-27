/*
 * @Author: your name
 * @Date: 2019-10-23 10:46:35
 * @LastEditTime: 2019-10-26 10:33:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /backendSYS/src/config/menuConfig.js
 */

import Home from "./../pages/home/index";
import ProductCategory from "./../pages/product/category";
import ProductManage from "./../pages/product/manage";
import User from "./../pages/user/index";
import Role from "./../pages/role/index";
import Bar from "./../pages/chart/bar";
import Line from "./../pages/chart/line";
import Pie from "./../pages/chart/pie";

const menuList = [
  {
    title: '首页', // 菜单标题名称
    key: '/home', // 对应的path
    icon: 'home', // 图标名称
    isPublic: true, // 公开的
    component: Home
  },
  {
    title: '商品',
    key: '/product',
    icon: 'appstore',
    children: [ // 子菜单列表
      {
        title: '品类管理',
        key: '/product/category',
        icon: 'bars',
        component: ProductCategory
      },
      {
        title: '商品管理',
        key: '/product/manage',
        icon: 'tool',
        component: ProductManage
      },
    ]
  },

  {
    title: '用户管理',
    key: '/user',
    icon: 'user',
    component: User
  },
  {
    title: '角色管理',
    key: '/role',
    icon: 'safety',
    component: Role
  },

  {
    title: '图形图表',
    key: '/charts',
    icon: 'area-chart',
    children: [
      {
        title: '柱形图',
        key: '/charts/bar',
        icon: 'bar-chart',
        component: Bar
      },
      {
        title: '折线图',
        key: '/charts/line',
        icon: 'line-chart',
        component: Line
      },
      {
        title: '饼图',
        key: '/charts/pie',
        icon: 'pie-chart',
        component: Pie
      },
    ]
  },

  // {
  //   title: '订单管理',
  //   key: '/order',
  //   icon: 'windows',
  // },
]

export default menuList