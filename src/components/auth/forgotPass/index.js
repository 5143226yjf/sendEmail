/**
 * Created by yjf on 16-10-20.
 */
import React from 'react';
import { Button, Form, Input ,message} from 'antd';
import './index.styl';
import Regex from  '../../../library/regex';
import storage from '../../../library/storage';
import goto from '../../../library/goto';

const createForm = Form.create;
const FormItem = Form.Item;

class ForgotPass extends React.Component{
  constructor(props){
    super(props);
    this.handleSubmit=this.handleSubmit.bind(this);
    this.checkPass2=this.checkPass2.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        console.log('Errors in form!!!');
        return;
      }
      let data = {
        username:this.props.form.getFieldValue('name'),
        password:this.props.form.getFieldValue('passwd')
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
              storage(data.agreement,json.data.token);
              message.success('重置密码成功');
              goto('/auth/login');
            }else{
              console.log("失败");
            }
          }
        );
      console.log(values);

    });
  }
  checkPass(rule, value, callback) {
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

  checkPass2(rule, value, callback) {
    const { getFieldValue } = this.props.form;
    if (value && value !== getFieldValue('passwd')) {
      callback('两次密码输入不一致');
    } else {
      callback();
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form horizontal className="forgetPass">
        <div className="box-top">
          <h1>重置密码</h1>
        </div>
        <FormItem
          hasFeedback
        >
          {getFieldDecorator('name', {
            validate: [{
              rules: [
                {required: true, min: 1, message: '用户名不能空'},
              ],
              trigger: ['onBlur', 'onChange']
            }]
          })(
            <Input type="text" placeholder="用户名"/>
          )}
        </FormItem>


        <FormItem
          hasFeedback
        >
          {getFieldDecorator('passwd',
            {
              validate: [{
                rules: [
                  {required: true, min: 1, message: '密码不能为空'},
                  {validator: this.checkPasswd}
                ],
                trigger: 'onBlur',
              }],

            })(
            <Input type="password" placeholder="密码" autoComplete="off"/>
          )}
        </FormItem>

        <FormItem
          hasFeedback
        >
          {getFieldDecorator('rePasswd', {
            validate: [{
              rules: [{
                required: true,
                whitespace: true,
                message: '请确认密码',
              }, {
                validator: this.checkPass2,
              }],
            }]

          })(
            <Input type="password" placeholder="确认密码" autoComplete="off"  />
          )}
        </FormItem>


        <FormItem>
          <Button style={{width: '100%'}} type="primary" onClick={this.handleSubmit}>确认修改</Button>
        </FormItem>
      </Form>
    );
  }
}
export default createForm()(ForgotPass);
