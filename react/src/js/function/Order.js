import React, { Component } from 'react';
import '../../css/HomePage.css'
import { List,Card,Table, Input, Icon, Button,  Badge, Menu, Dropdown,Popconfirm, Layout, Modal,InputNumber } from 'antd';
import {  Link } from "react-router-dom";
import $ from "jquery";

const { Header, Content, Sider } = Layout;
let data = [];

function handleClick(e) {
    console.log('click', e);
}

class Order extends React.Component {
    constructor() {
        super();
        this.state = {
            dataSource: [],
            filterDropdownVisible: false,
            sortedInfo: null,
            data,
            searchText: '',
            filtered: false,
        };

        data = [];
        $.ajax({
            type: "get",
            url: "http://127.0.0.1:8080/order/get",
            crossDomain: true,
            async : false,
            contentType: "application/json",
            dataType: "json",
            data: {name:localStorage.getItem('user')},
            success: function (_data) {
                console.log(_data);
                for(var i in _data){
                    let temp = {"id":_data[i].orderid,"number":_data[i].quantity+" 本","price":_data[i].price+" 元","time":_data[i].time};
                    data.push(temp);
                }
                this.setState({
                    dataSource: data,
                });
                console.log(data);
            }.bind(this),
            error : function() {
                console.log("failed");
            }
        })
    }
    onInputChange = (e) => {
        this.setState({ searchText: e.target.value });
    }
    detail = (record) =>{
        localStorage.setItem('detailid',record.id);
        window.location.href = "/detail";
    }
    setAgeSort = () => {
        this.setState({
            sortedInfo: {
                order: 'descend',
                columnKey: 'Sales',
            },
        });
    }
    render() {
        let { sortedInfo } = this.state;
        sortedInfo = sortedInfo || {};
        const columns = [{
            title: '订单号',
            dataIndex: 'id',
            key:'id',
            width: '20%',
            render: text => <a href="#">{text}</a>,
            sorter: (a, b) => a.id - b.id,
        }, {
            title: '数量',
            dataIndex: 'number',
            width: '20%',
        },{
            title: '交易额',
            dataIndex: 'price',
            width: '20%',
            render: text => <a href="#">{text}</a>,
            sorter: (a, b) => a.price.split('元')[0] - b.price.split('元')[0],
        }, {
            title: '下单时间',
            dataIndex: 'time',
            width: '25%',
            render: text => <a href="#">{text}</a>,
            sorter: (a, b) => a.id - b.id,
        },
            {
                title: '操作',
                dataIndex: 'operation',
                render: (text, record) => {
                    return (
                        <Button type="primary" onClick={()=>this.detail(record)}>查看详情</Button>
                    );
                },
            }];

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
                            <Menu.Item key="3">
                                <Link to="/setting"><Icon type="smile-o" />个人设置</Link></Menu.Item>
                            <Menu.Item key="4">
                                <Link to="/"><Icon type="customer-service" />联系客服</Link></Menu.Item>
                        </Menu>
                    </Sider>
                    <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
                        <div style={{marginTop: 20}}>
                            <Table columns={columns}
                                   bordered
                                   title={() => '全部订单'}
                                   footer={() => ''}
                                   dataSource={data} />;                        </div>
                    </Content>
                </Layout>
            </Layout>
        )
    }
}

export default Order;