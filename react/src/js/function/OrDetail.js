import React from 'react';
import { Table, Badge, Menu, Dropdown, Icon } from 'antd';
import $ from "jquery";
import '../../css/Setting.css';

let count = 0;
class NestedTable extends React.Component {
    constructor() {
        super();
        this.state = {
            dataSource: [],
        };
    }
    render() {
        const expandedRowRender = (record) => {
            const columns = [
                {title: '书名', dataIndex: 'title', key: 'title'},
                {title: '数量', dataIndex: 'quantity', key: 'quantity'},
                {title: '单价', dataIndex: 'price', key: 'price'},
                {title: '总计', dataIndex: 'total', key: 'total'},

            ];
            let data = [];
            for (let k = 0; k < count; ++k) {
                $.ajax({
                    type: "get",
                    url: "http://127.0.0.1:8080/order/getDetail",
                    crossDomain: true,
                    async: false,
                    dataType: "json", //表示返回值类型，不必须
                    data: {name: localStorage.getItem('user'), index: k},
                    success: function (_data) {
                        for (var i in _data) {
                            let temp = {
                                "key": k,
                                "title": _data[i].title,
                                "quantity": _data[i].quantity,
                                "price": _data[i].price,
                                "total": _data[i].price * _data[i].quantity
                            };
                            data.push(temp);

                        }
                        console.log(data);
                    }.bind(this),
                    error: function () {
                        console.log("failed" + k);
                    }
                })
            }
            return (
                <Table
                    columns={columns}
                    dataSource={data[record.key]}
                    pagination={false}
                />
            );
        };
        const columns = [
            {title: '订单号', dataIndex: 'id', width: '25%',},
            {title: '数量', dataIndex: 'number',},
            {title: '交易额', dataIndex: 'price', width: '20%',},
            {title: '下单时间', dataIndex: 'time', width: '20%',},
        ];

        let data = [];
        $.ajax({
            type: "get",
            url: "http://127.0.0.1:8080/order/get",
            crossDomain: true,
            async: false,
            contentType: "application/json", //必须有
            dataType: "json", //表示返回值类型，不必须
            data: {name: localStorage.getItem('user')},
            success: function (_data) {
                console.log("count:" + count);
                for (var i in _data) {
                    let temp = {
                        "key": count,
                        "id": _data[i].orderid,
                        "number": _data[i].quantity + " 本",
                        "price": _data[i].price + " 元",
                        "time": _data[i].time
                    };
                    data.push(temp);
                    count++;
                }
                console.log(data);
            }.bind(this),
            error: function () {
                console.log("failed");
            }
        });
        return (
            <Table
                className="components-table-demo-nested"
                columns={columns}
                expandedRowRender={expandedRowRender}
                dataSource={data}
            />
        );
    };

}

export default NestedTable;