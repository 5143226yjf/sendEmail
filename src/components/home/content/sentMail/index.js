/**
 * Created by yjf on 16-10-19.
 */
import React from 'react';
import './index.styl';
import getStorage from '../../../../library/getStorage';
import { Table } from 'antd';
import fetch from 'isomorphic-fetch';
import codeHandler from  '../../../../library/codeHandler';

class SentMail extends React.Component{
  constructor(props){
    super(props);
    this.state={
      data:[]
    }
  }
  componentDidMount() {
      let myToken=localStorage.getItem('token');
      fetch(`http://api.work.qoder.cn/work`, {
        method: 'GET',
        headers: {
          'token':myToken
        },
      }).then(
        response=>{
          return response.json()
        })
        .then(
          json=> {
            if(json.code===0){
              this.setState({
                data:json.data.works
              });
            }else{
              codeHandler(json.code);
            }
          }
        )

  }

  render(){
    const columns = [{
      title:'发件人',
      dataIndex:'belongTo',
      key:'belongTo',
    }, {
      title: '邮件标题',
      dataIndex: 'title',
      key:'title',
    }, {
      title: '作业次数',
      dataIndex: 'times',
      key:'times',
    }, {
      title: '接收邮箱',
      dataIndex: 'sendTo',
      key:'sendTo',
    }];
    return(
      <div className="sentMail">
        <div className="box-top">
          <h1>已发送邮件</h1>
        </div>
        <Table
          columns={columns}
          dataSource={this.state.data}
        />
      </div>
    );

  }
}
export default SentMail;
