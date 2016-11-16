/**
 * Created by stonehx on 16-10-14.
 */
import  React from 'react';
import {Menu, Icon} from 'antd';
import {Link} from 'react-router';
const SubMenu = Menu.SubMenu;
import './index.styl';

class SideBar extends React.Component {
  render() {
    return (
      <div className="side-bar">
        <Menu
          style={{width: 210}}
          defaultOpenKeys={['sub1', 'sub2', 'sub3']}
          mode="inline"
          onClick = {this.handleClick}
        >
          <SubMenu key="sub1" title={<span><Icon type="mail"/><span>个人中心</span></span>}>
            <Menu.Item key="1"><Link to="/home/userInfo">我的信息</Link></Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" title={<span><Icon type="appstore"/><span>邮箱操作</span></span>}>
            <Menu.Item key="2"><Link to="/home/mailList">邮箱列表</Link></Menu.Item>
            <Menu.Item key="3"><Link to="/home/addMail">添加邮箱</Link></Menu.Item>
            <Menu.Item key="4"><Link to="/home/updateMail">更新邮箱</Link></Menu.Item>
            <Menu.Item key="5"><Link to="/home/deleteMail">删除邮箱</Link></Menu.Item>
          </SubMenu>
          <SubMenu key="sub3" title={<span><Icon type="setting"/><span>工作中心</span></span>}>
            <Menu.Item key="9"><Link to="/home/sendMail">发送邮件</Link></Menu.Item>
            <Menu.Item key="10"><Link to="/home/sentMail">已发送邮件</Link></Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    )
  }
}

export default SideBar;
