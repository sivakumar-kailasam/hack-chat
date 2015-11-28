'use strict';

const React       = require('react-native');
const Emoji       = require('react-native-emoji');
const styles      = require('../styles');

const {
  Image,
  Text,
  TextInput,
  View
} = React;


const chatRoom = React.createClass({
  render() {
    return (
      <View style={styles.container}>
        <Text> User name is {this.props.userName} </Text>
        <Text> Email id is {this.props.emailId} </Text>
      </View>
    );
  }
});

module.exports = chatRoom;
