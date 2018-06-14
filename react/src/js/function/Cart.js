import { Table, Input, Icon, Button, Popconfirm, Layout, Menu,Modal } from 'antd';
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {  Link } from "react-router-dom";
import '../../css/Setting.css';
import $ from "jquery";

let data=[];
const { Header, Content, Sider } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
let cname='';
let temp=[];
let data1='';

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
            count: 0,
            name:'',
            ModalText: 'Content of the modal',
            visible: false,
            confirmLoading: false,
        };
        this.columns = [{
            title: '书名',
            dataIndex: 'name',
            width: '30%',
        }, {
            title: '数量',
            dataIndex: 'number',
            render: (text, record) => (
                <EditableCell
                    value={text}
                    onChange={this.onCellChange(record.name, 'number')}
                />
            ),
        },{
            title: '价格',
            dataIndex: 'price',
            width: '30%',
        }, {
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

        let _this = this;
        let data1='';

        const { count, dataSource } = this.state;

        _this=this;
        data = [];
        $.ajax({
            type: "get",
            url: "http://127.0.0.1:8080/cart/getBook",
            crossDomain: true,
            async : false,
            contentType: "application/json", //必须有
            dataType: "json", //表示返回值类型，不必须
            data: {"name":localStorage.getItem('user')},
            success: function (_data) {
                for(var i in _data){
                    temp = {"name":_data[i].bookname,"number":1,"price":_data[i].bookprice,};
                    data.push(temp);
                }
                _this.setState({
                    dataSource: data,
                });
                console.log(data);
            }.bind(this),
            error : function(_data) {
                alert("failed");
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

    onCellChange = (name, dataIndex) => {
        return (value) => {
            const dataSource = [...data];
            const target = dataSource.find(item => item.name === name);
            if (target) {
                target[dataIndex] = value;
                data = dataSource;
            }
        };
    }

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

    }
    handleCancel = () => {
        this.setState({
            visible: false,
        });
    }

    render() {
        const { dataSource,visible, confirmLoading, ModalText } = this.state;
        const columns = this.columns;
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
                                <Table bordered dataSource={data} columns={columns} size="small"/>
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

class EditableCell extends React.Component {
    state = {
        value: this.props.value,
        editable: false,
    }
    handleChange = (e) => {
        const value = e.target.value;
        this.setState({ value });
    }
    check = () => {
        this.setState({ editable: false });
        if (this.props.onChange) {
            this.props.onChange(this.state.value);
        }
    }
    edit = () => {
        this.setState({ editable: true });
    }
    render() {
        const { value, editable } = this.state;
        return (
            <div className="editable-cell">
                {
                    editable ? (
                        <Input
                            value={value}
                            onChange={this.handleChange}
                            onPressEnter={this.check}
                            suffix={
                                <Icon
                                    type="check"
                                    className="editable-cell-icon-check"
                                    onClick={this.check}
                                />
                            }
                        />
                    ) : (
                        <div style={{ paddingRight: 24 }}>
                            {value || ' '}
                            <Icon
                                type="edit"
                                className="editable-cell-icon"
                                onClick={this.edit}
                            />
                        </div>
                    )
                }
            </div>
        );
    }
}

export default CartTable
