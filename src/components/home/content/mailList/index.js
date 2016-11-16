/**
 * Created by yjf on 16-10-19.
 */
import React from 'react';
import './index.styl';
import { Table, Icon ,Popconfirm} from 'antd';
import goto from '../../../../library/goto';
import fetch from 'isomorphic-fetch';
import codeHandler from  '../../../../library/codeHandler';


class MailList extends React.Component{
  constructor(props) {
    super(props);
    this.state ={
      data:[]
    };
  }

  componentDidMount() {
    let myToken = localStorage.getItem('token');
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
            });
            this.setState({
              data:json.data.email,
            });
          }
          else {
            codeHandler(json.code);
          }
        }
      )
  }
  handleUpdate(value){
    console.log(value);
  }
  confirm(value,index){
    let myToken = localStorage.getItem('token');
    fetch(`http://api.work.qoder.cn/email/${value}`, {
      method: 'DELETE',
      headers: {
        'token': myToken
      },
    }).then(
      response=> {
        return response.json()
      }).then(
      json=> {
        if(json.code===0){
          let data=this.state.data;
          data.splice(index,1);
          this.setState({data:data});
        }
        else{
          codeHandler(json.code);
        }
      }
    )

  }

  render(){
    const columns = [{
      title: '发送人',
      dataIndex: 'belongTo',
      key: 'belongTo',
    }, {
      title: '学号',
      dataIndex: 'stuCode',
      key: 'stuCode',
    }, {
      title: '邮箱地址',
      dataIndex: 'email',
      key: 'email',
    },
      { title: 'Action',
        dataIndex: '',
        key: 'x',
        render: ({id,belongTo,index}) =>
        <div>
          <Popconfirm title={`确认要修改邮箱信息吗？`} okText="Yes" cancelText="No" onConfirm={()=>this.handleUpdate(id)}>
            <a href="javaScript:;">编辑</a>
          </Popconfirm>
          &nbsp;&nbsp;&nbsp;
          <Popconfirm title={`确认要删除${belongTo}的邮箱吗？`} okText="Yes" cancelText="No" onConfirm={()=>this.confirm(id,index)}>
            <a href="javaScript:;">删除</a>
          </Popconfirm>
        </div>
      },
    ];

    return (
      <div className="mailList">
        <div className="box-top">
          <h1>邮箱列表</h1>
        </div>
        <Table columns={columns} dataSource={this.state.data}/>
      </div>
    );
  }
}
export default MailList;
