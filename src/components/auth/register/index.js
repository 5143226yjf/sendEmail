/**
 * Created by yjf on 16-10-11.
 */
import React from 'react';
import { Button, Form, Input,message } from 'antd';
import './index.styl';
import Regex from  '../../../library/regex';
import codeHandler from '../../../library/codeHandler';
import goto from '../../../library/goto';

const createForm = Form.create;
const FormItem = Form.Item;

function noop() {
  return false;
}

class Register extends React.Component{
  constructor(props){
    super(props);
    this.handleSubmit=this.handleSubmit.bind(this);
    this.checkPass2=this.checkPass2.bind(this);
  }
  handleReset(e) {
    e.preventDefault();
    // this.props.form.resetFields();
    goto('/auth/login');
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        console.log('Errors in form!!!');
        return;
      }
      const { getFieldValue } = this.props.form;
      let data = {
        username:getFieldValue('name'),
        password:getFieldValue('passwd')
      };
      fetch(`http://api.work.qoder.cn/auth/register`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: data.username,
          password: data.password
        })
      }).then(
        response=>{
          return response.json()
        })
        .then(
          json=> {
            if(json.code===0){
              message.success('注册成功');
            }else{
              console.log("失败");
              codeHandler(json.code);
            }
          }
        );
      console.log(values);

    });
  }
  checkPass(rule,value, callback) {
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

  checkPass2(rule,value, callback) {
    const { getFieldValue } = this.props.form;
    if (value && value !== getFieldValue('passwd')) {
      callback('两次密码输入不一致');
    } else {
      callback();
    }
  }

  render() {
    const { getFieldDecorator} = this.props.form;
    const formItemLayout = {
      labelCol: { span: 7, },
      wrapperCol: { span: 14 ,offset:1},};
    return (
      <Form horizontal className="register-box">
        <div className="box-top">
          <h1>注册</h1>
        </div>
        <FormItem
          {...formItemLayout}
          label="用&ensp;户&ensp;名"
          hasFeedback
         >
          {getFieldDecorator('name', {
            validate: [{
              rules: [
                {required: true, min: 1, message: '用户名不能空'},
                {validator: this.userExists},
              ],
              trigger: ['onBlur','onChange']
            }]
          })(

            <Input type="text"/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="密&#12288;码&#12288;"
          hasFeedback
        >
          {getFieldDecorator('passwd',
            {
              validate: [{
                rules: [
                  {required: true, min: 1, message: '密码不能为空'},
                  {validator: this.checkPasswd},
                ],
                trigger: 'onBlur',
              }],

          })(
            <Input type="password" autoComplete="off"
                   onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
            />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="确认密码"
          hasFeedback
        >
          {getFieldDecorator('rePasswd', {
            validate:[{
              rules: [{
                required: true,
                whitespace: true,
                message: '请确认密码',
              }, {
                validator: this.checkPass2,
              }],
            }]

          })(
            <Input type="password" autoComplete="off"
                   onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
            />
          )}
        </FormItem>
        <FormItem wrapperCol={{ span: 12, offset: 7 }}>
          <Button type="primary" onClick={this.handleSubmit}>注册</Button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button type="ghost" onClick={this.handleReset}>返回登陆</Button>
        </FormItem>
      </Form>
    );
  }
}

export default createForm()(Register);
