/*
 * @Author: your name
 * @Date: 2019-10-27 12:48:07
 * @LastEditTime: 2019-10-27 17:21:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /backendSYS/src/pages/product/category/addform.js
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Form, Select, Input } from 'antd'

const Item = Form.Item
const Option = Select.Option

// 添加分类的form组件
@Form.create()
class AddForm extends Component {

  componentWillMount () {
    this.props.setForm(this.props.form)
  }

  render() {
    const {category, parentId} = this.props
    const { getFieldDecorator } = this.props.form

    return (
      <Form>
        <Item>
          {
            getFieldDecorator('parentId', {
              initialValue: parentId
            })(
              <Select>
                <Option value='0'>卡片分类</Option>
                {
                  category.map(item => <Option value={item._id}>{item.name}</Option>)
                }
              </Select>
            )
          }

        </Item>

        <Item>
          {
            getFieldDecorator('categoryName', {
              initialValue: '',
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

AddForm.propTypes = {
    setForm: PropTypes.func.isRequired, // 用来传递form对象的函数
    category: PropTypes.array.isRequired, // 一级分类的数组
    parentId: PropTypes.string.isRequired, // 父分类的ID
  }

export default AddForm

