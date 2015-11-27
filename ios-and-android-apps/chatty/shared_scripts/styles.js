'use strict';

const React = require('react-native');
const { StyleSheet } = React;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
  },
  formGroup: {
  },
  loginButtonBg: {
    marginTop: 10,
    marginBottom: 10,
    height: 40,
  },
  loginButtonLabel: {
    color: 'white'
  },
  loginInput: {
    fontSize: 15,
    height: 50,
    width: 300,
    borderWidth: 1,
    borderColor: '#f5f5f5'
  },
  loginLabel: {
    fontSize: 15
  },
  welcome: {
    color: 'black',
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
});

module.exports = styles;
