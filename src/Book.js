import React , { Component }from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom'
import { Layout, Menu, Icon ,Table, notification, Button,Input, Badge} from 'antd';

const { Header, Content, Sider } = Layout;
const MenuItemGroup = Menu.ItemGroup;
const data = [{
    Book: 'Dream of the Red Chamber',
    Author: 'Cao Xueqin',
    Language: 'Chinese',
    Published: '1754-1791',
    Sales:'10 million',
}, {
    Book: 'The Hobbit',
    Author: 'J.R.R.Tolkien',
    Language: 'English',
    Published: '1937',
    Sales:'20 million',
}, {
    Book: 'She: A History of Adventure',
    Author: 'H.Rider Haggard',
    Language: 'English',
    Published: '1887',
    Sales:'30 million',
}, {
    Book: 'The Lord of the Rings',
    Author: 'J.R.R.Tolkien',
    Language: 'English',
    Published: '1954-1955',
    Sales:'40 million',
}, {
    Book: 'Harry Potter and the Philosopher\'s Stone',
    Author: 'J.K. Rowling',
    Language: 'English',
    Published: '1997',
    Sales:'107 million',
}, {
    Book: 'Le Petit Prince(The Little Prince)',
    Author: 'Antoine de Saint-Exupery',
    Language: 'French',
    Published: '1943',
    Sales:'150 million',
}];

const add = () => {
    notification.open({
        message: '消息提醒',
        description: '成功添加书籍进入购物车！',
        icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />,
    });
};


class Book extends React.Component {
    state = {
        filteredInfo: null,
        sortedInfo: null,
    }
    handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        this.setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
    }

    clearFilters = () => {
        this.setState({ filteredInfo: null });
    }
    clearAll = () => {
        this.setState({
            filteredInfo: null,
            sortedInfo: null,
        });
    }
    setAgeSort = () => {
        this.setState({
            sortedInfo: {
                order: 'descend',
                columnKey: 'Sales',
            },
        });
    }
    render() {
        let { sortedInfo, filteredInfo } = this.state;
        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {};
        const columns = [{
            title: '操作',
            dataIndex: 'Select',
            key: 'Select',
            render: text => <Button onClick={add}>加入购物车</Button>,
        },{
            title: '     书籍',
            dataIndex: 'Book',
            key: 'Book',
            render: text => <a href="#">{text}</a>,
            sorter: (a, b) => a.Book.substr(0,1).charCodeAt() - b.Book.substr(0,1).charCodeAt(),
            sortOrder: sortedInfo.columnKey === 'Book' && sortedInfo.order,
        }, {
            title: '作者',
            dataIndex: 'Author',
            key: 'Author',
            filters: [
                { text: 'Antoine de Saint-Exupery', value: 'Antoine' },
                { text: 'J.R.R.Tolkien', value: 'J.R.R.Tolkien' },
                { text: 'Cao Xueqin', value: 'Cao' },
                { text: 'H.Rider Haggard', value: 'Haggard' },
                { text: 'J.K. Rowling', value: 'Rowling' },

            ],
            filteredValue: filteredInfo.Author || null,
            onFilter: (value, record) => record.Author.includes(value),
            sorter: (a, b) => a.Author.substring(0,1).charCodeAt() - b.Author.substring(0,1).charCodeAt(),
            sortOrder: sortedInfo.columnKey === 'Author' && sortedInfo.order,
        }, {
            title: '语言',
            dataIndex: 'Language',
            key: 'Language',
            filters: [
                { text: 'Chinese', value: 'Chinese' },
                { text: 'English', value: 'English' },
                { text: 'French', value: 'French' },

            ],
            filteredValue: filteredInfo.Language || null,
            onFilter: (value, record) => record.Language.includes(value),
            sorter: (a, b) => a.Language.substring(0,1).charCodeAt()  - b.Language.substring(0,1).charCodeAt() ,
            sortOrder: sortedInfo.columnKey === 'Language' && sortedInfo.order,
        }, {
            title: '出版时间',
            dataIndex: 'Published',
            key: 'Published',
            sorter: (a, b) => a.Published.split('-')[0] - b.Published.split('-')[0],
            sortOrder: sortedInfo.columnKey === 'Published' && sortedInfo.order,
        },{
            title: '销售量',
            dataIndex: 'Sales',
            key: 'Sales',
            sorter: (a, b) => a.Sales.split(' ')[0] - b.Sales.split(' ')[0],
            sortOrder: sortedInfo.columnKey === 'Sales' && sortedInfo.order,
        },];
        return (
                <Layout>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
                            <div>
                                <div className="table-operations">
                                    <Button onClick={this.setAgeSort}>按销量排序</Button>
                                    <Button onClick={this.clearFilters}>取消筛选</Button>
                                    <Button onClick={this.clearAll}>取消筛选和排序</Button>
                                </div>
                                <Table columns={columns} dataSource={data} onChange={this.handleChange} size="small"/>
                            </div>
                        </Content>
                    </Layout>
                </Layout>
        );
    }
}

export default Book;
