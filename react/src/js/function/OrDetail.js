import { Table, Input, Icon, Button, Popconfirm, Layout, Menu,Modal,InputNumber } from 'antd';
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {  Link } from "react-router-dom";
import '../../css/HomePage.css';
import $ from "jquery";

let data=[];
const { Header, Content, Sider } = Layout;

function handleClick(e) {
    console.log('click', e);
}

class OrderDetail extends React.Component {
    static contextTypes = {
        store: PropTypes.object
    };

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
            width: '30%',
        }, {
            title: '数量',
            dataIndex: 'number',
            width: '15%',
        },{
            title: '单价',
            dataIndex: 'price',
            width: '20%',
        }, {
            title: '总计',
            dataIndex: 'total',
            width: '20%',
        }];
        data = [];
        $.ajax({
            type: "get",
            url: "http://127.0.0.1:8080/order/getDetail",
            crossDomain: true,
            async : false,
            //contentType: "application/json",
            dataType: "json",
            data: {orderid:localStorage.getItem('detailid')},
            success: function (_data) {
                console.log(_data);
                for(var i in _data){
                    let temp = {"name":_data[i].title,"number":_data[i].quantity+" 本","price":_data[i].price+" 元","total":_data[i].price*_data[i].quantity};
                    data.push(temp);
                }
                this.setState({
                    dataSource: data,
                });
            }.bind(this),
            error : function() {
                console.log("failed");
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

    render() {
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
                            <Table bordered
                                   title={() => '订单号：'+ localStorage.getItem('detailid')}
                                   dataSource={data}
                                   columns={this.columns}
                                   size="small"/>
                        </div>

                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default OrderDetail
