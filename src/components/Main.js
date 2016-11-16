require('normalize.css/normalize.css');
require('styles/App.css');
require('styles/reset.css');

import React from 'react';
import Auth from './auth'
import 'antd/dist/antd.css'

class AppComponent extends React.Component {
  render() {
    return (
      <div className="main-box">
        {this.props.children||Auth}
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
