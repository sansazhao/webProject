import React , { Component }from 'react';
import {  Link } from "react-router-dom";
import { Layout, Menu,Icon ,notification, Button,Input,Alert,Avatar} from 'antd';
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

let pic ="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png";
let pic1="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1529732847879&di=8d8e3a3c51f2f3b06a8ec6e33a49c2d7&imgtype=0&src=http%3A%2F%2Fimg06.tooopen.com%2Fimages%2F20170806%2Ftooopen_sy_219295022122.jpg";
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
        localStorage.setItem('auth','false');
        localStorage.setItem('user','');
        window.location.href = "/";
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
        $.ajax({
            type: "post",
            url: "http://127.0.0.1:8080/pic",
            crossDomain: true,
            data: {"name":"book9","bin":"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1529732847879&di=8d8e3a3c51f2f3b06a8ec6e33a49c2d7&imgtype=0&src=http%3A%2F%2Fimg06.tooopen.com%2Fimages%2F20170806%2Ftooopen_sy_219295022122.jpg"},
            success: function (_data) {
                   console.log(_data);
                pic = _data;
            }.bind(this),
            error : function() {
                console.log("failed");
            }
        });
        $.ajax({
            url : 'http://127.0.0.1:8080/book/query',
            type:'post',
            dataType:"json",
            async:false,
            data:{key:"book8"},
            crossDomain: true,
            success : function(data) {
                //TODO 成功
                console.log (data);
                pic = data;
                this.setState({
                   val:'',
                });
            },
            error : function(data) {
                //TODO 失败
            }
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
                        <Menu.Item key="1"><Link to="/user"><Icon type="home" />首页</Link></Menu.Item>
                        <Menu.Item>你好，{localStorage.getItem('user')}</Menu.Item>
                        <Menu.Item style = {{textAlign: 'right'}}><Link to = '/' onClick={this.quit}>退出</Link></Menu.Item>

                        <Search
                            style={{ marginLeft: '230px',width:'340px'}}
                            placeholder=""
                            onSearch={value => this.handleData(value)}
                            enterButton
                        />
                        <div>
                            <Avatar icon="user" />
                            <Avatar>U</Avatar>
                            <Avatar>USER</Avatar>
                            <Avatar src={{pic}} />
                            <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>U</Avatar>
                            <Avatar style={{ backgroundColor: '#87d068' }} icon="user" />
                        </div>
                        <Menu.Item style = {{textAlign: 'right'}}><Link to = '/' onClick={this.quit}>退出</Link></Menu.Item>
                    </Menu>
                </Header>
                <Layout>
                    <Sider width={200} style={{ background: '#ffffff' }}>
                        <Menu onClick={handleClick} style={{ width: 200 }} mode="vertical" >
                            <Menu.Item key="1">
                                <Link to="/cart" onClick={this.handleSwitchColor.bind(this,localStorage.getItem(''))}><Icon type="shopping-cart" />查看购物车 </Link>
                                </Menu.Item>
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