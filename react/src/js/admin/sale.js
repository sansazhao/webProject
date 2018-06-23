import React , { Component }from 'react';
import { Layout, Menu, Icon ,Table, notification,
    Button,Tag,Modal, Form, Input, Radio} from 'antd';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import $ from 'jquery';
import PropTypes from 'prop-types';

const { Header, Content, Sider } = Layout;
let data = [];
const FormItem = Form.Item;


class sale extends React.Component {
    constructor() {
        super();
        this.state={
            data1: data,
            sortedInfo: null,
            selectRecord:null,
        };
        this.getUser();
    }
    componentWillMount () {
        const auth = localStorage.getItem('auth');
        console.log("auth:"+ auth);
        if(auth !== 'admin') {
            window.location.href = "/error";
        }
        const { store } = this.context;
    }

    clearAll = () => {this.setState({sortedInfo: null,});};

    state = {visible: false,visible1:false};

    handleCancel = () => {this.setState({ visible: false });}

    getUser = () => {
        let _data="";
        data=[];
        $.ajax({
            type: "get",
            url: "http://127.0.0.1:8080/order/getTotal",
            crossDomain: true,
            contentType: "application/json", //必须有
            dataType: "json", //表示返回值类型，不必须
            success: function (_data) {
                for(var i in _data){
                    let temp = {"id":_data[i].orderid,"q":_data[i].price,"total":_data[i].price*_data[i].quantity};
                    data.push(temp);
                }
                console.log(data);
                this.setState({sortedInfo: null,});
            }.bind(this),
            error : function() {
                console.log("failed");
            }
        })
    };

    quit(){
        localStorage.setItem('auth','false');
        localStorage.setItem('user','');
        window.location.href = "/";
    }

    render() {
        let { sortedInfo,data1 } = this.state;
        sortedInfo = sortedInfo || {};
        data1 = data1 || {};
        const columns = [{
            title: '订单ID',
            dataIndex: 'id',
            key: 'id',
            width:'20%',
            render: text => <a href="#">{text}</a>,
            sorter: (a, b) => a.id - b.id,
        },{
            title: '数量',
            dataIndex: 'q',
            key: 'q',
            width:'20%',
        },
            {
                title: '总金额',
                dataIndex: 'total',
                key: 'total',
                width:'20%',
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
                        <Menu.Item key="2" onClick="Notification"><Icon type="shopping-cart" />管理员</Menu.Item>
                        <Menu.Item style = {{textAlign: 'right'}}><Link to = '/' onClick={this.quit}>退出</Link></Menu.Item>
                    </Menu>
                </Header>
                <Layout>
                    <Sider width={200} style={{ background: '#ffffff' }}>
                        <Menu style={{ width: 200 }} mode="vertical" >
                            <Menu.Item key="1">
                                <Link to="/admin"><Icon type="clock-circle-o" />库存管理</Link></Menu.Item>
                            <Menu.Item key="2"><Link to="/userManagement"><Icon type="smile-o" />用户管理</Link></Menu.Item>
                            <Menu.Item key="3"><Link to="/sale"><Icon type="customer-service" />销售统计</Link></Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout>
                        <Layout style={{ padding: '0 24px 24px' }}>
                            <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
                                <div>
                                    <div style={{marginTop: 20}}>
                                        <Table columns={columns} loading={this.loading} dataSource={data}
                                               onChange={this.handleChange} size="small"/></div>
                                </div>
                            </Content>
                        </Layout>
                    </Layout>
                </Layout>
            </Layout>

        );
    }
}

export default sale;
