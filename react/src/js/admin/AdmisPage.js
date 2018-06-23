import React , { Component }from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Layout, Menu,Icon ,notification, Button,Input} from 'antd';
import AdminBook from './Adm_Book';

const { Header, Content, Sider } = Layout;

class AdmisPage extends React.Component {
    componentWillMount () {
        const auth = localStorage.getItem('auth');
        console.log("auth:"+ auth);
        if(auth !== 'admin') {
            window.location.href = "/error";
        }
        const { store } = this.context;
    }
    quit(){
        localStorage.setItem('auth','false');
        localStorage.setItem('user','');
        window.location.href = "/";
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
                        <Menu.Item key="1"><Link to="/"><Icon type="home" />首页</Link></Menu.Item>
                        <Menu.Item key="2" onClick="Notification"><Icon type="customer-service" />管理员</Menu.Item>
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
                    <AdminBook/>
                </Layout>
            </Layout>

        );
    }
}

export default AdmisPage;