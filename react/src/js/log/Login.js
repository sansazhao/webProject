import React , { Component }from 'react';
import { Link ,withRouter} from 'react-router-dom';
import { Form, Icon, Input, Button, Checkbox,message } from 'antd';
import '../../css/Setting.css'
import $ from "jquery";
import PropTypes from 'prop-types'

const FormItem = Form.Item;
let name = '';

const success = () => {
    message.success('登录成功！');
};

class NormalLoginForm extends React.Component {
    static contextTypes = {
        store: PropTypes.object
    }

    constructor () {
        super()
        this.state = { themeColor: '' ,name:'',pwd:''}
        localStorage.setItem('auth','');
        localStorage.setItem('user','');
    }

    componentWillMount () {
        const { store } = this.context
        this._updateThemeColor()
        store.subscribe(() => this._updateThemeColor())
    }

    _updateThemeColor () {
        const { store } = this.context
        const state = store.getState()
        this.setState({ themeColor: state.themeColor,name:'你好，'+state.name })
    }

    // dispatch action 去改变颜色
    handleSwitchColor (color) {
        const { store } = this.context
        store.dispatch({
            // type: 'CHANGE_COLOR',
            // themeColor: color,
            type:'SHOW',
            name: color
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            this.name = this.props.form.getFieldValue('name');
            name = this.props.form.getFieldValue('name');
            this.pwd =  this.props.form.getFieldValue('pwd');
            if (!err) {
                console.log('Received values of form: ', values);
                const _this = this;
                $.ajax({
                    url : 'http://127.0.0.1:8080/login',
                    type:'post',
                    data:{name:this.name,pwd:this.pwd},
                    crossDomain: true,
                    success : function(data) {
                        //TODO 成功
                        if(data == "user") {
                            success();
                            localStorage.setItem('auth','true');
                            localStorage.setItem('user',_this.name);
                            window.location.href = "/user";
                            console.log(_this.name);
                        }
                        else if(data == "admin") {
                            localStorage.setItem('auth','admin');
                            localStorage.setItem('user',_this.name);
                            window.location.href = "/admin";
                        }
                        else{}
                    }.bind(this),
                    error : function(data) {
                        alert("failed");
                        //TODO 失败
                    }
                })
                    .then(res => {
                        _this.setState({
                            name: name,
                        });
                        _this.handleSwitchColor.bind(this, _this.name);
                    })
            }
        });
    }

    componentWillUnmount = () => {
        this.setState = (state,callback)=>{
            return;
        };
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="form" style={{width:260,height:260}}>
                <FormItem>
                    {getFieldDecorator('name', {
                        rules: [{ required: true, message: '请输入您的用户名!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('pwd', {
                        rules: [{ required: true, message: '请输入您的密码!' }],
                    })(
                        <Input name="password" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password"  placeholder="Password" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,})(
                        <Checkbox>记住我</Checkbox>
                    )}
                    <a className="login-form-forgot" href="">忘记密码？</a>
                    <p><Button  type="primary" htmlType="submit"
                                href="" className="login-form-button">
                        登录
                </Button>  或  <Link to="/regis">现在注册！</Link></p>
                </FormItem>
            </Form>
        );
    }
}

const LoginForm = Form.create()(NormalLoginForm);

export default withRouter(LoginForm);

