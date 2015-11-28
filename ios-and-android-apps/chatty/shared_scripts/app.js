'use strict';

const React = require('react-native');
const {
  AppRegistry,
  Navigator,
  Text,
  createElement
} = React;
const IndexPage = require('./pages/index');
const ChatRoomPage = require('./pages/chat-room');

module.exports = function() {
  const chatty = React.createClass({
    renderScene(route, navigator) {
      switch (route.name) {
          case 'index':
              return createElement(IndexPage, {navigator});
              break;
          case 'chatRoom':
              return createElement(ChatRoomPage, {userName: route.userName, emailId: route.emailId, navigator});
              break;
      }
    },
    render() {
      return (
          <Navigator
              initialRoute={{name: 'index'}}
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
