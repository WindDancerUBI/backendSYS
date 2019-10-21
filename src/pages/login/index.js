/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-20 08:42:44
 * @LastEditTime: 2019-10-21 15:57:46
 * @LastEditors: Please set LastEditors
 */
import React, { Component } from 'react'
import logo from "./../../assets/images/logo.png";
import { Form, Input, Icon, Button } from "antd";
import "./index.scss"
// import PropTypes from 'prop-types'

@Form.create()
class Login extends Component {

    // 登陆表单提交处理
    submitHandle = (event) => {
        event.preventDefault();

        // 对所有表单字段进行检验
        this.props.form.validateFields(async (err, values) => {
            // 检验成功
            if (!err) {
                // 请求登陆
                console.log(values);
            } else {
                console.log('检验失败!')
            }
        });
    }

    validatePwd = (rule,value,callback) => {
        console.log('validatePwd()', rule, value)
        if(!value){
            callback('密码必须输入');
        }else if(value.length < 4){
            callback('密码必须大于四位');
        }else{
           callback(); 
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form

        return (
            <div className="login">
                <div className="login-header">
                    <img src={logo} alt="logo" />
                    <h1>后台管理系统</h1>
                </div>
                <div className="login-content">
                    <h2>用户登录</h2>
                    <Form className="login-form" onSubmit={this.submitHandle}>
                        <Form.Item>
                            {
                                getFieldDecorator('username',{
                                    rules:[
                                        { required: true, whitespace: true, message: '用户名必须输入' }
                                    ]
                                })(
                                    <Input prefix={<Icon type="user"/>} placeholder="请输入用户名"/>
                                )
                            }
                        </Form.Item>
                        <Form.Item>
                            {
                                getFieldDecorator('password',{
                                    rules:[
                                        {validator: this.validatePwd}
                                    ]
                                })(
                                    <Input prefix={<Icon type="lock" />} placeholder="请输入密码" type="password" />
                                )
                            }
                        </Form.Item>
                        <Form.Item>
                            <Button className="login-button" type="primary" htmlType="submit">登录</Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}

// Login.propTypes = {

// }

export default Login