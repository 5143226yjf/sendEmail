/**
 * Created by stonehx on 16-10-11.
 */
import { message } from 'antd';

export default function codeHandler(code) {
  switch(code){
    case 10001:
      return message.error('数据请求格式错误');
    case 10002:
      return message.error('用户名或密码错误');
    case 10004 :
      return message.error('用户已经存在');
    case 10005 :
      return message.warning('您还没有登录，请重新登录');
    case 10006 :
      return message.warning('你还没有注册或者登录已过期，请重新登录吧');
    case 10007 :
      return message.error('邮箱已经存在');
    case 10008 :
      return message.error('邮箱不存在');
    case 10009 :
      return message.error('邮件发送失败');
  }
}
