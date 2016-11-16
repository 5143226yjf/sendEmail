/**
 * Created by stonehx on 16-10-11.
 */
/**
 * Created by stonehx on 16-10-7.
 */
import fetch from 'isomorphic-fetch';
import * as TYPE from './const';
import 'babel-polyfill';
import { message } from 'antd';
import goto from '../library/goto';
//import storage from '../library/storage';
import codeHandler from '../library/codeHandler'
Host='http://api.work.qoder.cn/';
export function requestPosts() {
  return {
    type: TYPE.REQUEST_PSOTS
  }
}

export function receivePosts() {
  return {
    type: TYPE.RECEIVE_POSTS,
  }
}

export function saveDate(data) {
  return{
    type:TYPE.SAVEDATA,
    data:data
  }
}

export function login(data) {
  const loading = message.loading('登录中', 0);
  return dispatch=> {
    fetch(`${Host}auth/login`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: data.username,
        password: data.passwd
      })
    }).then(
      response=>{
        loading();
        return response.json()
      })
      .then(
        json=> {
          if(json.code===0){
            message.success('登录成功');
            localStorage.setItem('token',json.data.token.token);
            goto('/home');
          }else{
            codeHandler(json.code);
          }
        }
      )
  }
}
