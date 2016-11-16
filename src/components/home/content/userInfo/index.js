/**
 * Created by yjf on 16-10-18.
 */
import React from 'react';
import fetch from 'isomorphic-fetch';
import './index.styl';

class UserInfo extends React.Component{
  constructor(props){
    super(props);
    this.state={
      name:""
    };
  }
  componentDidMount(){
    let myToken=localStorage.getItem('token');
    fetch(`http://api.work.qoder.cn/user/info`, {
      method: 'GET',
      headers: {
        'token':myToken
      },
    }).then(
      response=>{
        return response.json();
      })
      .then(
        json=> {
          this.setState({name:json.data.user.username});
        }
      )
  }

  render(){
    return(
      <div className="userInfo">
        <div className="top-box">
          <h1>我的信息</h1>
        </div>
        <div className="info-name">用户名：{this.state.name}</div>
      </div>
    );

  }
}
export default UserInfo;
