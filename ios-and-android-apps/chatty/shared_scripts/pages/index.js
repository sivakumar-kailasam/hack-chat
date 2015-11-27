'use strict';

const React = require('react-native');
const {
  AppRegistry,
  Text,
  View,
} = React;

const Emoji = require('react-native-emoji');
const styles = require('../styles');

const chatty = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native! <Emoji name="smile"/>
        </Text>
      </View>
    );
  }
});

module.exports = chatty;
