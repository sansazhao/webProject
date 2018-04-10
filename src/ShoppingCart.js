import React , { Component }from 'react';
import { Button, notification, Icon } from 'antd';

const openNotification = () => {
    notification.open({
        message: '消息提醒',
        description: '成功添加书籍进入购物车！',
        icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />,
    });
};

class ShoppingCart extends React.Component {
    render() {
        return (
            <Button type="primary" onClick={openNotification}>消息</Button>
        )
    };
}
export default ShoppingCart;