/**
 * Created by stonehx on 16-10-11.
 */
import React from 'react';
import NavBar from './navBar';
import SideBar from './sideBar';
import './index.styl';
class Home extends React.Component {

  render() {
    return(
      <div className="home-box">
        <div className="home-title">
          <NavBar/>
        </div>
        <div className="home-side-bar">
          <SideBar/>
        </div>
        <div className="home-box-container">
          {this.props.children}
        </div>
      </div>
    )
  }
}

export  default Home;

