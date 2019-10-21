/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-20 08:56:35
 * @LastEditTime: 2019-10-20 09:04:28
 * @LastEditors: Please set LastEditors
 */
const {override, fixBabelImports, addLessLoader, addDecoratorsLegacy} = require('customize-cra');

module.exports = override(
  // 针对antd实现按需打包: 根据import来打包(使用babel-plugin-import)
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,  // 自动打包相关的样式
  }),

  // 使用less-loader对源码中的less的变量进行重新指定
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {'@primary-color': '#1DA57A'},
  }),

  //使用装饰器
  addDecoratorsLegacy()
)