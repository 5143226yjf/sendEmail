/**
 * Created by stonehx on 16-10-14.
 */
import React from 'react';
import {Menu, Icon} from 'antd';
import {Link} from 'react-router';
import './index.styl';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
class NavBar extends React.Component {
  constructor(props){
    super(props);
    this.state={
      name:"用户中心"
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

  render() {
    return (
      <div className="nav-bar">
        <h1>自动发送邮件系统</h1>
        <div className="user">
          <Menu
            style={{border:'none'}}
            mode="horizontal"
          >
            <SubMenu  style={{ height: 60}} title={<span>{this.state.name}</span>}>
              <MenuItemGroup title="个人中心">
                <Menu.Item key="setting:1"><Link to="/home/userInfo">我的信息</Link></Menu.Item>
                <Menu.Item key="setting:2"><Link to="/home/revisePass">修改密码</Link></Menu.Item>
              </MenuItemGroup>
              <MenuItemGroup title="其他">
                <Menu.Item key="setting:3"><Link to="/auth/register">注册账号</Link></Menu.Item>
                <Menu.Item key="setting:4"><Link to="/auth/login">退出登录</Link></Menu.Item>
              </MenuItemGroup>
            </SubMenu>
          </Menu>
        </div>
      </div>
    )
  }
}

export default NavBar;
