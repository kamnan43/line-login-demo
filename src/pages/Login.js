import React, { Component } from 'react';
import ls from 'local-storage'
import moment from 'moment';
import { stringify } from 'querystring';
import config from '../config';
import loginBtn from '../assets/img/btn_login_base.png';

class Login extends Component {
  gotoLoginPage() {
    let state = moment().unix();
    ls.set('state', state)
    let params = {
      response_type: 'code',
      client_id: config.channelID,
      redirect_uri: config.callbackUrl,
      state,
      scope: 'profile',
    };
    let url = `https://access.line.me/oauth2/v2.1/authorize?${stringify(params)}`;
    console.log('url', url);
    window.location = url;
  }

  render() {
    return (
      <div className="page-content">
        <div className="col-lg-3" />
        <div className="col-lg-6">
          <div>
            LOGIN With LINE<br />
          </div>
          <div>
            <a onClick={this.login}><img width="130" alt="profile" src={loginBtn} onClick={this.gotoLoginPage} style={{cursor:'pointer'}} /></a>
          </div>
        </div>
        <div className="col-lg-3" />
      </div>
    );
  }
}

export default Login;