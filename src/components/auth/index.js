/**
 * Created by stonehx on 16-10-11.
 */
import React from 'react';
import './index.styl';
import Title from '../auth/title'
class Auth extends React.Component{

  render(){
    return(
      <div className="auth-box">
        <div className="auth-title"><Title/></div>
        {this.props.children}
      </div>
    )
  }
}


export default Auth;
