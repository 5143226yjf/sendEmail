/**
 * Created by yjf on 16-10-19.
 */
import React from 'react';
import './index.styl';
import fetch from 'isomorphic-fetch';
import { Form,Button,Input,message ,Select,Popover} from 'antd';
import codeHandler from '../../../../library/codeHandler';
import Regex from '../../../../library/regex';

const createForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option;
function noop() {
  return false;
}

class AddMail extends React.Component{
  constructor(props){
    super(props);
    this.state={
      options:[]
    };
    this.handleSubmit=this.handleSubmit.bind(this,);
    this.handleChange=this.handleChange.bind(this);
  }
  handleChange(value) {
    let options;
    if (!value || value.indexOf('@') >= 0) {
      options = [];
    } else {
      options = ['gmail.com', '163.com', 'qq.com'].map((domain) => {
        const email = `${value}@${domain}`;
        return <Option key={email}>{email}</Option>;
      });
    }
    this.setState({ options });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        console.log('Errors in form!!!');
        return;
      }
      console.log(values);
      let myToken=localStorage.getItem('token');
      fetch(`http://api.work.qoder.cn/email`,{
        method:'POST',
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'token':myToken
        },
        body:JSON.stringify({
          name:values.name,
          email:values.email,
          pass:values.passwd,
          stuCode:values.stuCode
        }),
      }).then(
        response=>{
          return response.json();
        }
      ).then((json)=>{
        if(json.code===0){
          message.success('添加成功');
        }else{
          codeHandler(json.code);
        }
      });
    });
  }
  checkEmail(rule,value,callback){
    if(value){
      if(!Regex.email.test(value)){
        callback([new Error('邮箱不合法')]);
        return;
      }
      else{
        callback();
        return;
      }
    }
    callback();
  }


  render() {
    const { getFieldDecorator} = this.props.form;
    const {getFieldProps}=this.props.form;
    const content = (
      <div>
        <p>qq邮箱的SMTP在密码设置/账户中开启POP3/SMTP服务获取</p>
      </div>
    );
    const formItemLayout = {
      labelCol: { span: 7, },
      wrapperCol: { span: 14 ,offset:1},};
    return (
      <Form horizontal className="addMail">
        <div className="box-top">
          <h1>添加邮箱</h1>
        </div>
        <div style={{overflow:'hidden'}}>
          <FormItem
            {...formItemLayout}
            label="发送人"
            hasFeedback
          >
            {getFieldDecorator('name', {
              validate: [{
                rules: [
                  {required: true, min: 1, message: '发送人不能空'}
                ],
                trigger: ['onBlur','onChange']
              }]
            })(

              <Input type="text"/>
            )}
          </FormItem>
        </div>

        <div style={{overflow:'hidden'}}>
          <FormItem
            {...formItemLayout}
            label="邮箱"
            hasFeedback
          >
            {getFieldDecorator('email',
              {
                validate: [{
                  rules: [
                    {required: true, min: 1, message: '邮箱不能为空'},
                  ],
                  trigger: 'onBlur',
                },{
                  rules:[
                    {validator: this.checkEmail},
                  ],
                  trigger:'onBlur',
                }]
              }
              )(
              <Select combobox onChange={this.handleChange} filterOption={false}>
                {this.state.options}
              </Select>
            )}
          </FormItem>
        </div>
        <div style={{overflow:'hidden'}}>
          <FormItem
            {...formItemLayout}
            label="密码"
            hasFeedback
          >
            {getFieldDecorator('passwd',
              {
                validate: [{
                  rules: [
                    {required: true, min: 1, message: '密码不能为空'},
                  ],
                  trigger:'onBlur' ,
                }],

              })(
              <Input type="text" autoComplete="off"
                     onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
              />
            )}
          </FormItem>
        </div>
        <div style={{overflow:'hidden'}}>
          <FormItem
            {...formItemLayout}
            label="学号"
            hasFeedback
          >
            {getFieldDecorator('stuCode', {
              validate: [{
                rules: [
                  {required: true, min: 1, message: '学号不能空'}
                ],
                trigger: 'onBlur',
              }]
            })(

              <Input type="text"/>
            )}
          </FormItem>
        </div>
        <div style={{overflow:'hidden'}}>
          <FormItem wrapperCol={{ span: 12, offset: 11}}>
            <Button type="primary" onClick={this.handleSubmit}>确认添加</Button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Popover content={content} title="SMTP密码">
              <Button type="primary" style={{width:'80px',height:'33px',fontSize:'14px'}}>密码信息</Button>
            </Popover>
          </FormItem>
        </div>

      </Form>
    );
  }
}

export default createForm()(AddMail);
