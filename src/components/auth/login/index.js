/**
 * Created by stonehx on 16-10-5.
 */
import React from 'react';
import {Form, Input, Button, Checkbox} from 'antd';
import Regex from  '../../../library/regex';
import {Link} from 'react-router'
import './index.styl';
const createForm = Form.create;
const FormItem = Form.Item;


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.checkPasswd = this.checkPasswd.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        console.log('Errors in form!!!');
        return;
      }else {
        this.props.action.login(values)
      }
    });
  }


  checkPasswd(rule, value, callback) {
    if (value) {
      if (!Regex.passwd.test(value)) {
        callback([new Error('密码不合法')]);
        return;
      } else {
        callback();
        return;
      }
    }
    callback();
  }

  render() {

    const {getFieldDecorator} = this.props.form;
    return (
      <div className="login-box">
        <div className="logo">
          <h1>登录</h1>
        </div>
        <Form horizontal>

          <FormItem
            hasFeedback
          >
            {getFieldDecorator('username', {
              validate: [{
                rules: [
                  {required: true,min:1, message: '用户名不能为空'},
                ],
                trigger: ['onChange','onBlur'],
              }],
            })(
              <Input type="text" placeholder="请输入用户名"/>
            )}
          </FormItem>

          <FormItem
            hasFeedback
          >
            {getFieldDecorator('passwd', {
              validate: [{
                rules: [
                  {required: true, min: 1, message: '密码不能为空'},
                ],
                trigger: 'onBlur',
              }, {
                rules: [
                  {validator: this.checkPasswd}
                ],
                trigger: 'onBlur',
              }],
            })(
              <Input type="password" autoComplete="off" placeholder="请输入密码"
              />
            )}
          </FormItem>


          <FormItem>
            <Button style={{width: '100%'}} type="primary" onClick={this.handleSubmit}>OK</Button>
          </FormItem>

          <FormItem
          >
            <div style={{float: 'left'}}>
              {getFieldDecorator('agreement', {initialValue: false, valuePropName: 'checked'})(
                <Checkbox >记住密码</Checkbox>
              )}</div>
            <div style={{float: 'right'}}>
              <Link to="/auth/forgotPass">忘记密码？</Link>
            </div>
          </FormItem>
        </Form>
      </div>
    )
  }
}

export default createForm()(Login);
