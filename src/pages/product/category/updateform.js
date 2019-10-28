/*
 * @Author: your name
 * @Date: 2019-10-27 17:21:18
 * @LastEditTime: 2019-10-27 17:22:47
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /backendSYS/src/pages/product/category/updateform.js
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Form,Input} from 'antd'

const Item = Form.Item

/*
更新分类的form组件
 */
@Form.create()
class UpdateForm extends Component {

  componentWillMount () {
    // 将form对象通过setForm()传递父组件
    this.props.setForm(this.props.form)
  }

  render() {

    const {categoryName} = this.props
    const { getFieldDecorator } = this.props.form

    return (
      <Form>
        <Item>
          {
            getFieldDecorator('categoryName', {
              initialValue: categoryName,
              rules: [
                {required: true, message: '分类名称必须输入'}
              ]
            })(
              <Input placeholder='请输入分类名称'/>
            )
          }
        </Item>
      </Form>
    )
  }
}


UpdateForm.propTypes = {
    categoryName: PropTypes.string.isRequired,
    setForm: PropTypes.func.isRequired
  }

export default UpdateForm