import React , { Component }from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Layout, Menu,Icon ,notification, Button,Input} from 'antd';
import Book from '../function/Book';


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


class AdmisPage extends React.Component {
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
                        <Menu.Item key="2" onClick="Notification"><Icon type="shopping-cart" />管理员</Menu.Item>
                        <Menu.Item key="3"><Link to="/login"><Icon type="user" />登录</Link></Menu.Item>
                        <Search
                            style={{ marginLeft: '230px',width:'340px'}}
                            placeholder=""
                            onSearch={value => console.log(value)}
                            enterButton
                        />
                    </Menu>
                </Header>
                <Layout>
                    <Sider width={200} style={{ background: '#ffffff' }}>
                        <Menu onClick={handleClick} style={{ width: 200 }} mode="vertical" >
                            <Menu.Item key="4">
                                <Link to="/order"><Icon type="clock-circle-o" />库存管理</Link></Menu.Item>
                            <Menu.Item key="9"><Link to="/setting"><Icon type="smile-o" />用户管理</Link></Menu.Item>
                            <Menu.Item key="10"><Link to="/"><Icon type="customer-service" />销售统计</Link></Menu.Item>
                        </Menu>
                    </Sider>
                    <Book></Book>
                </Layout>
            </Layout>

        );
    }
}

export default AdmisPage;