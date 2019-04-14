# LINE LOGIN DEMO
This project is to demonstrate LINE Login with Reactjs

# Set up
- get LINE channel ID and channel secret from LINE developer console
- run ngrok (or other tunnel app) for http port 3000
- use ngrok url with "/auth" path as callback url
- edit channel ID, channel secret, and callback url in [config.js]

```
const config = {
    channelID: 'LINE_CHANNEL_ID',
    channelSecret: 'LINE_CHANNEL_SECRET',
    callbackUrl: 'https://xxxxxxxx.ngrok.io/auth',
}
```

## Run
```
npm start
```
