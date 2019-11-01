/*
 * @Author: your name
 * @Date: 2019-10-24 09:53:16
 * @LastEditTime: 2019-10-29 11:02:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /backendSYS/src/pages/product/category.js
 */
import React, { Component } from 'react'
import { Card, Button, Icon, Table, Modal, message } from 'antd'
import { reqCategory, reqAddCategory, reqUpdateCategory } from '../../../api/index';
import AddForm from './addform';
import './category.scss';
import { formateDate } from '../../../utils/dateUtils';
import UpdateForm from './updateform';

class ProductCategory extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            parentId: '0',
            parentName: '',
            showStatus: 0,
            pageSize: 5,
            pageNum: 1,
            total: 0
        }
    }

    componentWillMount(){
        this.initColumns();
    }

    componentDidMount(){
        const { parentId, pageNum, pageSize} = this.state
        this.getCategory(parentId, pageNum, pageSize);
    }
    
    // 初始化表格头部信息
    initColumns = () => {
        this.columns = [
            {
                title: '分类的名称',
                dataIndex: 'name', // 显示数据对应的属性名
            },
            {
                title: '更新时间',
                render: (category) => {
                    const create_time = formateDate(category.create_time);
                    return create_time;
                }
            },
            {
                title: '操作',
                width: 300,
                render: (category) => ( // 返回需要显示的界面标签
                    <span>
                        <Button type='link' onClick={() => this.showUpdate(category)}>修改分类</Button>
                        {this.state.parentId==='0' ? 
                            <Button type='link' onClick={() => this.showSubCategory(category)}>查看子分类</Button> 
                            : null
                        }
                    </span>
                )
            }
        ]
    }

    // 获取卡片分类列表
    getCategory = async(parentId,pageNum,pageSize) => {
        this.setState({
            loading:true,
            pageNum,
        })
        parentId = parentId || this.state.parentId
        const res = await reqCategory(parentId,pageNum,pageSize);
        this.setState({
            loading:false,
        })
        if(res.code === 0){
            const result = res.data;
            const { total,list } = result
            if(parentId === '0'){
                this.setState({
                    category:list,
                    total
                })
            }else{
                this.setState({
                    subCategory: list,
                    total
                })
            }
        }else{
            message.error(res.msg)
            this.props.history.push('/login')
        }
    }

    // 隐藏添加或修改分类的Modal
    cancelHandle = () => {
        this.setState({
            showStatus: 0,
        })
    }

    // 显示添加分类的Modal
    showAdd = () => {
        this.setState({
            showStatus: 1,
        })
    }

    // 显示修改分类的Modal
    showUpdate = (category) => {
        this.categoryName = category.name;
        this.categoryId = category._id;
        this.setState({
            showStatus: 2,
        })
    }

    // 点击确认添加分类按钮的操作
    addCategory = () => {
        const { pageNum,pageSize } = this.state
        this.form.validateFields(async(err,values) => {
            if(!err){
                this.setState({
                    showStatus: 0
                })
                // 收集数据
                const { parentId, categoryName } = values;
                // 清除输入的数据
                this.form.resetFields();
                const res = await reqAddCategory(categoryName,parentId);
                console.log(res)
                if(res.code === 0){
                    message.success(res.msg);
                    // 添加的分类就是当前分类列表下的分类
                    if(parentId===this.state.parentId) {
                        // 重新获取当前分类列表显示
                        this.getCategory(parentId, pageNum, pageSize)
                    } else if (parentId==='0'){ 
                        // 在二级分类列表下添加一级分类, 重新获取一级分类列表, 但不需要显示一级列表
                        this.getCategory('0',pageNum, pageSize)
                    }
                }else{
                    message.error(res.msg);
                }
            }
        })
    }

    updateCategory = () => {
        const { parentId,pageNum,pageSize } = this.state
        this.form.validateFields(async (err, values) => {
            if(!err) {
              // 1. 隐藏确定框
              this.setState({
                showStatus: 0
              })
      
              // 准备数据
              const categoryId = this.categoryId
              const {categoryName} = values
              // 清除输入数据
              this.form.resetFields()
              console.log(categoryId)
              console.log(categoryName)
              // 2. 发请求更新分类
              const res = await reqUpdateCategory({categoryId, categoryName})
              if (res.code===0) {
                // 3. 重新显示列表
                this.getCategory(parentId,pageNum,pageSize)
              }else{
                Modal.error({
                    title: '错误',
                    content: res.msg,
                  });
              }
            }
          })
    }

    // 前往子类时的操作
    showSubCategory = (category) => {
        this.setState({
            parentId: category._id,
            parentName: category.name
        },() => {
            const { parentId,pageNum,pageSize } = this.state
            this.getCategory(parentId,pageNum,pageSize);
        })
    }

    // 前往父类时的操作
    showCategory = () => {
        this.setState({
            parentId: '0',
            parentName: ''
        })
    }

    render() {
        const { parentId,parentName,loading,category,showStatus,subCategory,pageNum,total,pageSize } = this.state;
        const title = parentId === '0'?'卡片类型':(
            <span>
                <Button type='link' onClick={this.showCategory}>
                    卡片类型
                </Button>
                <Icon type='arrow-right' style={{marginRight: 5}}/>
                <span>{parentName}</span>
            </span>
        );
        const extra = (
            <Button type='primary' onClick={this.showAdd}>
                <Icon type='plus'/>
                添加
            </Button>
        )


        return (
            <div className='category'>
                <Card className='card' title={title} extra={extra} >
                    <Table
                        className='table'
                        bordered
                        loading={loading}
                        rowKey='_id'
                        columns={this.columns}
                        dataSource={this.state.parentId === '0'?category:subCategory}
                        pagination={{
                            current: pageNum,
                            total,
                            defaultPageSize: pageSize,
                            showQuickJumper: true,
                            onChange: (pageNum) =>this.getCategory(parentId,pageNum,pageSize)
                        }}
                    />
                    <Modal
                        title='添加分类'
                        visible={showStatus===1}
                        onOk={this.addCategory}
                        onCancel={this.cancelHandle}
                    >
                        <AddForm 
                            setForm={(form) => {this.form = form}}
                            category={category}
                            parentId={parentId}
                        />
                    </Modal>
                    <Modal
                        title="更新分类"
                        visible={showStatus===2}
                        onOk={this.updateCategory}
                        onCancel={this.cancelHandle}
                    >
                        <UpdateForm 
                            setForm={(form) => {this.form = form}}
                            categoryName={this.categoryName}
                        />
                    </Modal>
                </Card>
            </div>
        )
    }
}

export default ProductCategory