'use strict';

const React = require('react-native');
const { StyleSheet } = React;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
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
    marginTop: 5,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#f5f5f5',
    alignItems: 'center',
  },
  loginLabel: {
    fontSize: 15
  },
  inputError: {
    borderColor: 'red'
  },
  logoImage: {
    width: 100,
    height: 100,
    alignSelf: 'center'
  },
  welcome: {
    color: 'black',
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
});

module.exports = styles;
