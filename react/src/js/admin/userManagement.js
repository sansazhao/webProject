import React , { Component }from 'react';
import { Layout, Menu, Icon ,Table, notification,
    Button,Tag,Modal, Form, Input, Radio} from 'antd';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import $ from 'jquery';
import PropTypes from 'prop-types';

const { Header, Content, Sider } = Layout;
let data = [];
const FormItem = Form.Item;

const CollectionCreateForm = Form.create()(
    class extends React.Component {
        render() {
            const { visible, onCancel, onCreate, form } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal
                    visible={visible}
                    title="确认封禁"
                    okText="提交"
                    cancelText="取消"
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form layout="vertical">
                        <FormItem label="用户ID">
                            {getFieldDecorator('id',{
                                rules: [{ required: true, message: '请输入书ID' }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                    </Form>
                </Modal>
            );
        }
    }
);
class userManagement extends React.Component {
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
    showModal = () => {this.setState({ visible: true });}
    showModal1 = () => {this.setState({ visible1: true });}
    handleCancel = () => {this.setState({ visible: false });}
    handleCancel1 = () => {this.setState({ visible1: false });}
    handleCreate = () => {
        data=[];
        let id = 0;
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            id = values.id;
            if (err) {
                console.log(err);
                return;
            }

            form.resetFields();
            this.setState({ visible: false });
        });
        console.log(id);
        $.ajax({
            type: "get",
            url: "http://127.0.0.1:8080/admin/stopUser",
            crossDomain: true,
            contentType: "application/json", //必须有
            dataType: "json",
            data: {uid:id},
            success: function (_data) {
                for(var i in _data){
                    let temp = {"id":_data[i].id,"avail":_data[i].avail};
                    data.push(temp);
                }
                this.setState({sortedInfo: null});
            }.bind(this),
            error : function() {
                console.log("failed");
            }
        })
    }
    handleCreate1 = () => {
        data=[];
        let userid = 0;
        const form = this.formRef1.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            userid = values.id;
            form.resetFields();
            this.setState({ visible1: false });
        });
        console.log(userid);
        $.ajax({
            type: "get",
            url: "http://127.0.0.1:8080/admin/openUser",
            crossDomain: true,
            contentType: "application/json", //必须有
            dataType: "json",
            data: {uid:userid},
            success: function (_data) {
                for(var i in _data){
                    let temp = {"id":_data[i].id,"avail":_data[i].avail};
                    data.push(temp);
                }
                this.setState({sortedInfo: null,});
            }.bind(this),
            error : function() {
                console.log("failed");
            }
        })
    }
    saveFormRef = (formRef) => {this.formRef = formRef;}
    saveFormRef1 = (formRef) => {this.formRef1 = formRef;}

    getUser = () => {
        let _data="";
        data=[];
        $.ajax({
            type: "get",
            url: "http://127.0.0.1:8080/admin/getAlluser",
            crossDomain: true,
            contentType: "application/json", //必须有
            dataType: "json", //表示返回值类型，不必须
            success: function (_data) {
                for(var i in _data){
                    let temp = {"id":_data[i].id,"avail":_data[i].avail};
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
            title: '用户ID',
            dataIndex: 'id',
            key: 'id',
            width:'20%',
            render: text => <a href="#">{text}</a>,
            sorter: (a, b) => a.id - b.id,
        },{
            title: '权限',
            dataIndex: 'avail',
            key: 'avail',
            width:'20%',
        },
            {
                title: '操作',
                dataIndex: 'operation',
                render: (text, record) => {
                    return (
                        <div>
                            <Button type="primary" onClick={this.showModal}>封禁</Button>
                            <CollectionCreateForm
                                wrappedComponentRef={this.saveFormRef}
                                visible={this.state.visible}
                                onCancel={this.handleCancel}
                                onCreate={this.handleCreate}
                            />
                            <Button type="primary" style={{marginLeft:20}} onClick={this.showModal1}>开放</Button>
                            <CollectionCreateForm
                                wrappedComponentRef={this.saveFormRef1}
                                visible={this.state.visible1}
                                onCancel={this.handleCancel1}
                                onCreate={this.handleCreate1}
                            />
                        </div>);
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

export default userManagement;
