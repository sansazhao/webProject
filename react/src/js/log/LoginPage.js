import React, { Component } from 'react';
import LoginForm from './Login';
import { Route, Link } from "react-router-dom";
import '../../css/index.css'
import { Layout, Menu,Icon ,Input} from 'antd';
import PropTypes from 'prop-types'
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
                        <Menu.Item key="1"><Link to="/"><Icon type="home" />返回首页</Link></Menu.Item>

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