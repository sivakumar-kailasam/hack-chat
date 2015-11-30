'use strict';

const machineIp = '10.104.22.17';

const React = require('react-native');
const {
  AppRegistry,
  Navigator,
  Text,
  createElement,
  Platform
} = React;
const IndexPage = require('./pages/index');
const ChatRoomPage = require('./pages/chat-room');
window.navigator.userAgent = "react-native";
const io = require('socket.io-client/socket.io');
const ip = (Platform.OS === 'ios') ? 'localhost' : machineIp;

module.exports = function() {
  const chatty = React.createClass({
    renderScene(route, navigator) {
      switch (route.name) {
          case 'index':
              return createElement(IndexPage, {navigator, socket: route.socket});
              break;
          case 'chatRoom':
              return createElement(ChatRoomPage, {
                userName: route.userName,
                emailAddress: route.emailAddress,
                socket: route.socket,
                navigator
              });
              break;
      }
    },
    render() {
      const socket = io(`http://${ip}:3000`, {jsonp: false});
      return (
          <Navigator
              initialRoute={{name: 'index', socket}}
              renderScene={this.renderScene}
              configureScene={(route) => {
                return Navigator.SceneConfigs.VerticalUpSwipeJump;
              }}
          />
      );
    }
  });
  AppRegistry.registerComponent('chatty', () => chatty);
}
