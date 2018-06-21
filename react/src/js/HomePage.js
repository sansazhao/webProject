import React , { Component }from 'react';
import {  Link } from "react-router-dom";
import { Layout, Menu,Icon ,notification, Button,Input,Tag} from 'antd';
import Book from './function/Book';
import $ from "jquery";
import PropTypes from 'prop-types';
import '../css/HomePage.css';
const { Header, Content, Sider } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const Search = Input.Search;


const Notification = () => {
    notification.open({
        message: '消息提醒',
        description: '成功添加！',
        icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />,
    });
};

var console = "";

class HomePage extends React.Component {
    static contextTypes = {
        store: PropTypes.object
    }

    componentWillMount () {
        const { store } = this.context
        this._updateThemeColor()
        store.subscribe(() => this._updateThemeColor())
    }

    _updateThemeColor () {
        const { store } = this.context
        const state = store.getState()
        this.setState({ themeColor: state.themeColor,name: state.name })
    }

    constructor(props) {
        super(props);
        this.state = {
            val: '',
            arr: [],
            searchBook:'',
            name: ''
        };
        localStorage.setItem('user','');
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.setState({val: event.target.value});
    }
    handleData(v) {
        this.setState({
            val: v,
            arr: [this.state.val, ...this.state.arr]
        })
        let data;
        const _this = this;
        $.ajax({
            url : 'http://127.0.0.1:8080/book/query',
            type:'post',
            dataType:"json",
            data:{key:v},
            crossDomain: true,
            success : function(data) {
                //TODO 成功
                alert(" book:"+data.Book+"\n  lan: "+data.Language);
            },
            error : function(data) {
                alert("failed");
                //TODO 失败
            }
        })
    }
    onButtonClick(e) {
        this.setState({
            val: e.target.value
        })
        let val = this.state.val;
        alert('A name was submitted: ' + this.state.val);
        this.setState({
            arr: [val, ...this.state.arr]
        })
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

                        <Menu.Item key="1">你好！购买图书请登录！</Menu.Item>
                        <Menu.Item key="3"><Link to="/login"><Icon type="user" />登录</Link></Menu.Item>
                        <Search
                            id="searchkey"
                            style={{ marginLeft: '230px',width:'340px'}}
                            placeholder=""
                            onSearch={value => this.handleData(value)}
                            enterButton
                        />
                    </Menu>
                </Header>
                <Layout>
                    <Book></Book>
                </Layout>
            </Layout>
        );
    }
}

export default HomePage;