import React, { Component } from 'react';
import LoginForm from './Login';
import { Route, Link } from "react-router-dom";
import './index.css'
import { Layout, Menu,Icon ,Input} from 'antd';
const { Header, Content } = Layout;



class LoginPage extends React.Component {
    render(){
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
                        <Menu.Item key="1"><Link to="/"><Icon type="home" />首页</Link></Menu.Item>
                        <Menu.Item key="1"><Link to="/admis"><Icon type="home" />管理员</Link></Menu.Item>

                    </Menu>
                </Header>
                <Layout>
                    <LoginForm></LoginForm>
                </Layout>
            </Layout>
        )
    }
}

export default LoginPage;