/**
 * Created by yjf on 16-10-19.
 */
import React from 'react';
import './index.styl';
import fetch from 'isomorphic-fetch';
import { Form, Table, Button,Input ,message,Select} from 'antd';
import goto from '../../../../library/goto';
import Regex from '../../../../library/regex';
import codeHandler from '../../../../library/codeHandler';

const createForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option;

class UpdateMail extends React.Component{
  constructor(props){
    super(props);
    this.state= {
      data: [],
      options: [],
      key:''
    };
    this.handleSubmit=this.handleSubmit.bind(this,this.state.data,this.state.key);
    this.checkEmail=this.checkEmail.bind(this);
    this.handleSender=this.handleSender.bind(this);
    this.handleChange=this.handleChange.bind(this);
  }
  componentDidMount(){
    let myToken=localStorage.getItem('token');
    fetch(`http://api.work.qoder.cn/email`, {
      method: 'GET',
      headers: {
        'token': myToken
      },
    }).then(
      response=> {
        return response.json()
      })
      .then(
        json=> {
          if (json.code === 0) {
            json.data.email.map((email,index)=>{
              email.index=index;
              this.setState({
                data:json.data.email,
              });
            });
          }
          else {
            codeHandler(json.code);
          }
        }
      )
  }
  handleSender(value) {
    console.log(`selected ${value}`);
    let key=value;
    this.setState({
      key:value
    });
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

  checkEmail(rule,value, callback) {
    if (value) {
      if (!Regex.email.test(value)) {
        callback([new Error('收件人邮箱不合法')]);
        return;
      } else {
        callback();
        return;
      }
    }
    callback();
  }
  handleSubmit(e) {
    this.props.form.validateFields((errors, values) => {
      if(errors){
        message.error('Errors in form!!!');
        return;
      }else {
        let myToken = localStorage.getItem('token');
        //let key = localStorage.getItem('key');
        fetch(`http://api.work.qoder.cn/work`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'token': myToken
          },
          body: JSON.stringify({
            mailId: this.state.data[this.state.key].id,
            sendTo: values.email,
            times: values.timers,
            lesson: values.lesson,
            content: values.content,
          })
        }).then(
          response=> {
            return response.json()
          })
          .then(
            json=> {
              if (json.code === 0) {
                message.success("发送成功");
              }
              else {
                codeHandler(json.code);
              }
            }
          )
      }
    });
  }
  handleClose(e){
    e.preventDefault();
    goto('/home');
  }
  render(){
    const children = [];
    for (let i = 0; i < this.state.data.length; i++) {
      children.push(<Option key={i}>{this.state.data[i].belongTo}</Option>);
    }
    const {getFieldDecorator} = this.props.form;
    const {getFieldProps}=this.props.form;

    const formItemLayout = {
      labelCol: {span: 3,},
      wrapperCol: {span: 14, offset: 1},
    };
    return (
      <Form horizontal className="sendMail">
        <div className="box-top">
          <h1>发送邮件</h1>
        </div>
        <div style={{overflow: 'hidden'}}>
          <FormItem
            {...formItemLayout}
            label="发送人"
          >
            {getFieldDecorator('sender', {
              rules: [
                { required: true, message: 'Please select your country!' },
              ],
            })(
              <Select  multiple searchPlaceholder="标签模式"  onChange={this.handleSender}>
                {children}
              </Select>
            )}
          </FormItem>
        </div>
        <div style={{overflow: 'hidden'}}>
          <FormItem
            {...formItemLayout}
            label="收件人"
            hasFeedback
          >
            {getFieldDecorator('email',
              {
                validate: [{
                  rules: [
                    {required: true, min: 1, message: '收件人邮箱不能为空'},
                    {validator:this.checkEmail}

                  ],
                  trigger: 'onBlur',
                }]
              }
            )(
              <Select combobox onChange={this.handleChange} filterOption={false}>
                {this.state.options}
              </Select>
            )}
          </FormItem>
        </div>
        <div style={{overflow: 'hidden'}}>
          <FormItem
            {...formItemLayout}
            label="作业次数"
            hasFeedback
          >
            {getFieldDecorator('timers', {
              validate: [{
                rules: [
                  {required: true, min: 1, message: '作业次数不能空'}
                ],
                trigger: ['onBlur', 'onChange']
              }]
            })(
              <Input type="text" autoComplete="off"/>
            )}
          </FormItem>
        </div>
        <div style={{overflow: 'hidden'}}>
          <FormItem
            {...formItemLayout}
            label="课程名"
            hasFeedback
          >
            {getFieldDecorator('lesson',
              {
                validate: [{
                  rules: [
                    {required: true, min: 1, message: '' +
                    '' + '课程名不能为空'},
                  ],
                  trigger: 'onBlur',
                }],

              })(
              <Input type="text" autoComplete="off"/>
            )}
          </FormItem>
        </div>
        <div style={{overflow: 'hidden'}}>
          <FormItem
            {...formItemLayout}
            label="邮件内容"
            hasFeedback
          >
            {getFieldDecorator('content', {
              validate: [{
                rules: [
                  {required: true, min: 1, message: '邮件内容不能空'}
                ],
                trigger: ['onBlur', 'onChange']
              }]
            })(
              <Input type="textarea" rows={20}/>
            )}
          </FormItem>
        </div>
        <div style={{overflow: 'hidden'}}>
          <FormItem wrapperCol={{span: 14, offset: 9}}>
            <Button type="primary" onClick={this.handleSubmit}>发送</Button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button type="primary" onClick={()=>this.handleClose}>取消</Button>
          </FormItem>
        </div>
      </Form>
    );
  }
}
export default createForm()(UpdateMail);
