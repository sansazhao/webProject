import { Table, Input, Icon, Button, Popconfirm, Layout, Menu,Modal,InputNumber } from 'antd';
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {  Link } from "react-router-dom";
import '../../css/HomePage.css';
import $ from "jquery";

let data=[];
const { Header, Content, Sider } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;


function handleClick(e) {
    console.log('click', e);
}

class CartTable extends React.Component {
    static contextTypes = {
        store: PropTypes.object
    }

    constructor() {
        super();
        this.state = {
            dataSource: [],
            count: 1,
            name:'',
            ModalText: '',
            visible: false,
            confirmLoading: false,
        };
        this.columns = [{
            title: '书名',
            dataIndex: 'name',
            width: '25%',
        }, {
            title: '数量',
            dataIndex: 'number',
            render: (text, record) => (
                <InputNumber
                    min={1} max={30} defaultValue={record.number}
                    onChange={this.onChange.bind(this,record.name)}
                />
            ),
        },{
            title: '单价',
            dataIndex: 'price',
            width: '20%',
        }, {
            title: '总计',
            dataIndex: 'total',
            width: '20%',
        },
            {
            title: '操作',
            dataIndex: 'operation',
            render: (text, record) => {
                return (
                    this.state.dataSource.length >= 0 ?
                        (
                            <Popconfirm title="确定将该书移出购物车?" onConfirm={() => this.onDelete(record.name)}>
                                <a href="javascript:;">移出购物车</a>
                            </Popconfirm>
                        ) : null
                );
            },
        }];
        data = [];
        $.ajax({
            type: "get",
            url: "http://127.0.0.1:8080/cart/getBook",
            crossDomain: true,
            async : false,
            contentType: "application/json", //必须有
            dataType: "json", //表示返回值类型，不必须
            data: {name:localStorage.getItem('user')},
            success: function (_data) {
                for(var i in _data){
                    let temp = {"name":_data[i].bookname,"number":_data[i].quantity,"price":_data[i].bookprice,"total":_data[i].bookprice*_data[i].quantity};
                    data.push(temp);
                }
                this.setState({
                    dataSource: data,
                });
                console.log(data);
            }.bind(this),
            error : function() {
                console.log("failed");
                //TODO 失败
            }
        })
    }

    componentWillMount () {
        const auth = localStorage.getItem('auth');
        console.log("auth:"+ auth);
        if(auth !== 'true') {
            window.location.href = "/error";
        }
        const { store } = this.context;
    }

    onChange = (name,value) => {
        console.log(value+ "  "+name);
        $.ajax({
            type: "post",
            url: "http://127.0.0.1:8080/cart/changeQuan",
            crossDomain: true,
            data:{user:localStorage.getItem('user'),book:name,q:value},
            success: function (data1) {
                data = [];
                console.log("添加成功" );
                for(var i in data1){
                    let temp = {"name":data1[i].bookname,"number":data1[i].quantity,"price":data1[i].bookprice,"total":data1[i].bookprice*data1[i].quantity};
                    data.push(temp);
                    console.log(temp);
                }
                this.setState({dataSource:data});
            }.bind(this),
            error: function () {
                console.log("failed");
                //TODO 失败
            }
        });
    };

    onDelete = (name) => {
        let _this = this;
        console.log(name);
        $.ajax({
            type: "post",
            url: "http://127.0.0.1:8080/cart/delete",
            crossDomain: true,
            data: {user:localStorage.getItem('user'),book:name},  //相当于
            success: function (_data) {
                console.log("取消选择书本:" + _data);
                data = data.filter(item => item.name !== name);
                this.setState({dataSource:data});
            }.bind(this),
            error: function (data) {
                console.log("failed");
                //TODO 失败
            }
        });
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
        $.ajax({
            type: "post",
            url: "http://127.0.0.1:8080/cart/preOrder",
            crossDomain: true,
            data: {user:localStorage.getItem('user')},  //相当于
            success: function (_data) {
                this.setState({
                    ModalText: '请确认，总计：'+_data+'元！',
                });
            }.bind(this),
            error: function (data) {
                console.log("failed");
                //TODO 失败
            }
        });

    }
    handleOk = () => {
        this.setState({
            visible: false,
        });
        $.ajax({
            type: "post",
            url: "http://127.0.0.1:8080/cart/createOrder",
            crossDomain: true,
            data: {user:localStorage.getItem('user')},  //相当于
            success: function (_data) {
                alert("下单成功！");
            }.bind(this),
            error: function (data) {
                console.log("failed");
                //TODO 失败
            }
        });
        window.location.href="/user";

    }
    handleCancel = () => {
        this.setState({
            visible: false,
        });
    }

    render() {
        const { dataSource,visible, confirmLoading, ModalText } = this.state;
      //  const columns = this.columns;
        return (
            <Layout>
                <Header className="header">
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['2']}
                        style={{ lineHeight: '64px' }}
                    >
                        <Menu.Item key="1"><Link to="/user"><Icon type="home" />返回首页</Link></Menu.Item>
                        <Menu.Item>{this.state.name}</Menu.Item>
                    </Menu>
                </Header>
                <Layout>
                    <Sider width={200} style={{ background: '#ffffff' }}>
                    <Menu onClick={handleClick} style={{ width: 200 }} mode="vertical" >
                        <Menu.Item key="1" >
                            <Link to="/cart"><Icon type="shopping-cart" />查看购物车</Link></Menu.Item>
                        <Menu.Item key="2">
                            <Link to="/order"><Icon type="clock-circle-o" />查询订单</Link></Menu.Item>
                        <Menu.Item key="3"><Link to="/setting"><Icon type="smile-o" />个人设置</Link></Menu.Item>
                        <Menu.Item key="4"><Link to="/"><Icon type="customer-service" />联系客服</Link></Menu.Item>
                    </Menu>
                </Sider>
                    <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
                        <div style={{marginTop: 20}}>
                                <Table bordered dataSource={data} columns={this.columns} size="small"/>
                        </div>
                        <Button type="primary" size="large" onClick={this.showModal}>下单</Button>
                        <div>
                        <Modal title="结算"
                               visible={visible}
                               onOk={this.handleOk}
                               confirmLoading={confirmLoading}
                               onCancel={this.handleCancel}
                        >
                            <p>{ModalText}</p>
                        </Modal>
                    </div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}



export default CartTable
