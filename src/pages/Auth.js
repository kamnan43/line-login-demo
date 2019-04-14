import React, { Component } from 'react';
import request from 'request';
import ls from 'local-storage'
import { parse } from 'querystring';
import jwt from 'jsonwebtoken';
import config from '../config';

class Auth extends Component {
    componentDidMount() {
        let query = parse(window.location.href.split('?')[1]);
        console.log('query', query);
        if (query.code && +query.state === ls.get('state')) {
            let params = {
                grant_type: 'authorization_code',
                code: query.code,
                redirect_uri: config.callbackUrl,
                client_id: config.channelID,
                client_secret: config.channelSecret
            };
            request.post('https://api.line.me/oauth2/v2.1/token', { form: params }, this.handleTokenCall.bind(this));
        } else {
            window.location = '/';
        }
    }

    handleTokenCall(error, response, body) {
        console.log('accessToken body', body);
        let accessToken = JSON.parse(body);
        ls.set('accessToken', accessToken)
        
        if (accessToken.id_token) {
            // scope = openid
            this.verifyIdToken(accessToken.id_token)
        } else {
            // scope = profile
            request.get('https://api.line.me/v2/profile', {
                auth: {
                    bearer: accessToken.access_token
                }
            }, this.handleProfileCall.bind(this));
        }
    }

    handleProfileCall(error, response, body) {
        let profile = JSON.parse(body);
        ls.set('profile', profile)
        console.log('handleProfileCall body', profile);
        window.location = '/profile';
    }

    verifyIdToken(token) {
        try {
            const decoded = jwt.verify(token, config.channelSecret);
            console.log('verifyIdToken decoded', decoded);
            ls.set('profile', {
                userId: decoded.sub,
                displayName: decoded.name,
                pictureUrl: decoded.picture,
                statusMessage: 'jwt has no status message'
            })
            window.location = '/profile';
        } catch (err) {
            console.log('verifyIdToken error', err);
            window.location = '/';
        }
    }

    render() {
        return (
            <div className="page-content">
                <div className="col-lg-3" />
                <div className="col-lg-6">
                    <div>
                        LOGIN With LINE<br />
                    </div>
                    <span>Authenticating...</span>
                </div>
                <div className="col-lg-3" />
            </div >
        );
    }
}

export default Auth;