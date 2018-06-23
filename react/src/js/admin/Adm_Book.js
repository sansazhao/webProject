import React , { Component }from 'react';
import { Layout, Menu, Icon ,Table, notification,
    Button,Tag,Modal, Form, Input, Radio} from 'antd';
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
                    title="修改库存"
                    okText="提交"
                    cancelText="取消"
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form layout="vertical">
                        <FormItem label="图书ID">
                            {getFieldDecorator('bookid', {
                                rules: [{ required: true, message: '请输入书ID' }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem label="新的库存量">
                            {getFieldDecorator('stock', {
                                rules: [{ required: true, message: '请输入新的库存量' }],
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
class AdminBook extends React.Component {
    constructor() {
        super();
        this.state={
            data1: data,
            sortedInfo: null,
            selectRecord:null,
        };
        this.getBook();
    }

    clearAll = () => {
        this.setState({
            filteredInfo: null,
            sortedInfo: null,
        });
    };

    state = {
        visible: false,
    };
    showModal = () => {
        this.setState({ visible: true });
    }
    handleCancel = () => {
        this.setState({ visible: false });
    }
    handleCreate = () => {
        data=[];
        let b = 0;
        let s=0;
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            s = values.stock;
            b = values.bookid;
            console.log(values.bookid,values.stock);
            form.resetFields();
            this.setState({ visible: false });
        });
        $.ajax({
            type: "get",
            url: "http://127.0.0.1:8080/admin/modifyStock",
            crossDomain: true,
            contentType: "application/json", //必须有
            dataType: "json",
            data: {bid:b,newStock:s},
            success: function (_data) {
                for(var i in _data){
                    let temp = {"bookid":_data[i].id,"Book":_data[i].title,"Author":_data[i].author,
                        "Sales":_data[i].sales,"stock":_data[i].stock};
                    data.push(temp);
                }
                this.setState({
                    sortedInfo: null,
                });
            }.bind(this),
            error : function() {
                console.log("failed");
            }
        })
    }
    saveFormRef = (formRef) => {
        this.formRef = formRef;
    }

    getBook = () => {
        let _data="";
        data=[];
        $.ajax({
            type: "get",
            url: "http://127.0.0.1:8080/book/get",
            crossDomain: true,
            contentType: "application/json", //必须有
            dataType: "json", //表示返回值类型，不必须
            success: function (_data) {
                for(var i in _data){
                    let temp = {"bookid":_data[i].id,"Book":_data[i].title,"Author":_data[i].author,
                       "Sales":_data[i].sales,"stock":_data[i].stock};
                    data.push(temp);
                }
                console.log(data);
                this.setState({
                    filteredInfo: null,
                    sortedInfo: null,
                });
            }.bind(this),
            error : function() {
                console.log("failed");
            }
        })
    };



    render() {
        let { sortedInfo,data1 } = this.state;
        sortedInfo = sortedInfo || {};
        data1 = data1 || {};
        const columns = [{
            title: '     图书ID',
            dataIndex: 'bookid',
            key: 'bookid',
            width:'15%',
            render: text => <a href="#">{text}</a>,
            sorter: (a, b) => a.bookid - b.bookid,
            sortOrder: sortedInfo.columnKey === 'Book' && sortedInfo.order,
        },{
            title: '书名',
            dataIndex: 'Book',
            key: 'Book',
            width:'25%',
            render: text => <a href="#">{text}</a>,
            sorter: (a, b) => a.Book.substr(0,1).charCodeAt() - b.Book.substr(0,1).charCodeAt(),
            sortOrder: sortedInfo.columnKey === 'Book' && sortedInfo.order,
        },{
            title: '库存量',
            dataIndex: 'stock',
            key: 'stock',
            width:'10%',
            sorter: (a, b) => a.stock- b.stock,
            sortOrder: sortedInfo.columnKey === 'stock' && sortedInfo.order,
        },
            {
                title: '操作',
                dataIndex: 'operation',
                width:'40%',
                render: (text, record) => {
                    return (
                        <div>
                            <Button type="primary" onClick={this.showModal}>修改库存</Button>
                            <Button type="primary" style={{marginLeft:20}}onClick={()=>this.modify(record)}>撤离货架</Button>
                            <CollectionCreateForm
                                wrappedComponentRef={this.saveFormRef}
                                visible={this.state.visible}
                                onCancel={this.handleCancel}
                                onCreate={this.handleCreate.bind(this,record)}
                            />
                        </div>);
                },
            }];
        return (
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
        );
    }
}

export default AdminBook;
