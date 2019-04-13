import React, { Component } from 'react';
import ls from 'local-storage'

export default class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      profile: {}
    };
  }

  componentDidMount() {
    let profile = ls.get('profile');
    this.setState({ profile });
  }

  logout() {
    ls.set('profile', {})
    ls.set('accessToken', {})
    window.location = '/';
  }

  render() {
    return (
      <div className="page-content">
        <div className="col-lg-3" />
        <div className="col-lg-6">
          <div>
            <img width="130" className="avatar-img" alt="profile" src={this.state.profile.pictureUrl || ''} />
          </div>
          <hr />
          <div className="form-group">
            <label htmlFor="userid">User ID:</label>
            <input type="text" className="form-control" disabled id="userid" value={this.state.profile.userId || ''} />
          </div>
          <div className="form-group">
            <label htmlFor="name">Display Name:</label>
            <input type="text" className="form-control" disabled id="name" value={this.state.profile.displayName || ''} />
          </div>
          <div className="form-group">
            <label htmlFor="status">Status Message:</label>
            <input type="text" className="form-control" disabled id="status" value={this.state.profile.statusMessage || ''} />
          </div>
          <div className="form-group">
            <input type="button" className="form-control" value="Logout" onClick={this.logout} />
          </div>
        </div>
        <div className="col-lg-3" />
      </div>
    );
  }
}