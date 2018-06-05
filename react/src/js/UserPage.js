import React , { Component }from 'react';
import {  Link } from "react-router-dom";
import { Layout, Menu,Icon ,notification, Button,Input,Alert} from 'antd';
import Book from './function/Book';
import PropTypes from 'prop-types'
import $ from "jquery";

const { Header, Content, Sider } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const Search = Input.Search;

function handleClick(e) {
    console.log('click', e);
}

const Notification = () => {
    notification.open({
        message: '消息提醒',
        description: '成功添加！',
        icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />,
    });
};

class UserPage extends React.Component {
    static contextTypes = {
        store: PropTypes.object
    }

    constructor(props) {
        super(props);
        this.state = {
            val: '',
            arr: [],
            name: ''
        };
        this.handleChange = this.handleChange.bind(this);

        let _this=this;
        let data='';
        const user = localStorage.getItem('user');
        console.log("auth:"+ user);
        if(user !== '') {
            this.setState({
                name: "你好，"+user,
            });
        }
        console.log("name :"+this.state.name);
    /*    $.ajax({
            type: "post",
            url: "http://127.0.0.1:8080/auth",
            crossDomain: true,
            success: function (data) {
                if(data !== '') {
                    _this.setState({
                        name: "你好，"+data,
                    });
                }
                console.log(_this.state.name);

            }.bind(this),
            error : function(_data) {
                console.log("failed");
                //TODO 失败
            }
        })*/
    }

    componentWillMount () {
        const auth = localStorage.getItem('auth');
        console.log("auth:"+ auth);
        if(auth !== 'true') {
            window.location.href = "/error";
        }
        const { store } = this.context;
    }

    componentWillUnmount = () => {
        this.setState = (state,callback)=>{
            return;
        };

    }

    handleSwitchColor (color) {
        const { store } = this.context
        store.dispatch({
            type:'SHOW',
            name: color
        })
    }

    quit(){
        $.ajax({
            url : 'http://127.0.0.1:8080/logout',
            type:'post',
            crossDomain: true,
            success : function() {
                //TODO 成功
                localStorage.setItem('auth','false');
                localStorage.setItem('user','');
                window.location.href = "/";
            }.bind(this),
            error : function(data) {
                console.log("failed");
                //TODO 失败
            }
        })
    }

    handleChange(event) {
        this.setState({val: event.target.value});
    }
    handleData(v) {
        this.setState({
            val: v,
            arr: [this.state.val, ...this.state.arr]
        })
        console.log('A name was submitted: ' + v);
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
                        <Menu.Item key="1"><Link to="/user"><Icon type="home" />首页</Link></Menu.Item>
                        <Menu.Item>你好，{localStorage.getItem('user')}</Menu.Item>

                        <Search
                            style={{ marginLeft: '230px',width:'340px'}}
                            placeholder=""
                            onSearch={value => this.handleData(value)}
                            enterButton
                        />
                        <Menu.Item style = {{textAlign: 'right'}}><Link to = '/' onClick={this.quit}>退出</Link></Menu.Item>
                    </Menu>
                </Header>
                <Layout>
                    <Sider width={200} style={{ background: '#ffffff' }}>
                        <Menu onClick={handleClick} style={{ width: 200 }} mode="vertical" >
                            <Menu.Item key="1">
                                <Link to="/cart" onClick={this.handleSwitchColor.bind(this,localStorage.getItem(''))}><Icon type="shopping-cart" />查看购物车</Link></Menu.Item>
                            <Menu.Item key="2">
                                <Link to="/order"><Icon type="clock-circle-o" />查询订单</Link></Menu.Item>
                            <Menu.Item key="3"><Link to="/setting"><Icon type="smile-o" />个人设置</Link></Menu.Item>
                            <Menu.Item key="4"><Link to="/"><Icon type="customer-service" />联系客服</Link></Menu.Item>
                        </Menu>
                    </Sider>
                    <Book name={this.state.name}/>
                </Layout>
            </Layout>
        );
    }
}

export default UserPage;