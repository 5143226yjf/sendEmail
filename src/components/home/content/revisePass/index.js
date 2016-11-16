/**
 * Created by yjf on 16-10-29.
 */
import React from 'react';
import { Button, Form, Input ,message} from 'antd';
import './index.styl';
import Regex from  '../../../../library/regex';
import storage from '../../../../library/storage';
import goto from '../../../../library/goto';

const createForm = Form.create;
const FormItem = Form.Item;

class RevisePass extends React.Component{
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
              message.success('修改密码成功');
              storage(data.agreement,json.data.token);
            }else{
              message.error("失败");
            }
          }
        );
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
    const { getFieldDecorator} = this.props.form;
    const formItemLayout = {
      labelCol: { span: 7, },
      wrapperCol: { span: 14 ,offset:1},};
    return (
      <Form horizontal className="revisePass">
        <div className="box-top">
          <h1>修改密码</h1>
        </div>

        <div style={{overflow:'hidden'}}>
          <FormItem
            hasFeedback
          >
            {getFieldDecorator('passwd',
              {
                validate: [{
                  rules: [
                    {required: true, min: 1, message: '密码不能为空'},
                  ],
                  trigger: 'onBlur',
                }, {
                  rules: [
                    {validator: this.checkPasswd}
                  ],
                  trigger: ['onChange'],
                }],

              })(
              <Input type="password" placeholder="新密码" autoComplete="off"/>
            )}
          </FormItem>
        </div>
        <div style={{overflow:'hidden'}}>
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
        </div>
        <div style={{overflow:'hidden'}}>
          <FormItem>
            <Button style={{width:'100%'}} type="primary" onClick={this.handleSubmit}>确认修改</Button>
          </FormItem>
        </div>
      </Form>
    );
  }
}
export default createForm()(RevisePass);
