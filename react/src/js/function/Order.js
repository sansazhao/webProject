import React, { Component } from 'react';
import { Route, Link } from "react-router-dom";
import { Button } from 'antd';
import '../../css/index.css'


class Order extends React.Component {
    render(){
        const { children } = this.props;
        if (children) {
            return children;
        }
        return (
            <div >
                <li><Link to="/"><Button className="center">返回首页</Button></Link></li>
            </div>
        )
    }
}

export default Order;