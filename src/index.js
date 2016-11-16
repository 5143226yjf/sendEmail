import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './stores';
import {Provider} from 'react-redux';
import * as action from './actions';
import {Router, Route, Link, hashHistory, IndexRoute} from 'react-router';

import App from './components/Main';
import Auth from './components/auth';
import Home from './components/home';
import Login from './container/auth/login.container';
import Register from './container/auth/register.container';
import UserInfo from './components/home/content/userInfo';
import ForgotPass from './components/auth/forgotPass';
import MailList from './components/home/content/mailList';
import AddMail from './components/home/content/addMail';
import UpdateMail from './components/home/content/updateMail';
import DeleteMail from './components/home/content/deleteMail';
import SendMail from './components/home/content/sendMail';
import SentMail from './components/home/content/sentMail';
import RevisePass from './components/home/content/revisePass';

const store = configureStore();
/*store.dispatch(action.fetchPosts());*/
// Render the main component into the dom
ReactDOM.render((
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Register} />
        <Route path="auth" component={Auth}>
          <Route path="login" component={Login}/>
          <Route path="register" component={Register}/>
          <Route path="forgotPass" component={ForgotPass}/>
        </Route>
        <Route path="home" component={Home}>
         {/* <Route path="login" component={Login}/>*/}
          <Route path="userInfo" component={UserInfo}/>
          <Route path="mailList" component={MailList}/>
          <Route path="addMail" component={AddMail}/>
          <Route path="updateMail" component={UpdateMail}/>
          <Route path="deleteMail" component={DeleteMail}/>
          <Route path="sendMail" component={SendMail}/>
          <Route path="sentMail" component={SentMail}/>
          <Route path="revisePass" component={RevisePass}/>
        </Route>
      </Route>
    </Router>
  </Provider>
), document.getElementById('app'));
