import { Alert } from 'antd';
import React from 'react';

const onClose = function (e) {
    console.log(e, 'I was closed.');
    window.location.href = "/";
};

class errorPage extends React.Component {
    render() {
        return (
            <div>
                <Alert
                    message="您好！您尚无权限访问该页面！请关闭对话框，返回首页"
                    type="warning"
                    closable
                    onClose={onClose}
                />
            </div>
        );
    }
}

export default errorPage
