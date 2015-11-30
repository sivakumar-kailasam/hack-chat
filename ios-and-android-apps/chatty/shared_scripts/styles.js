'use strict';

const React = require('react-native');
const { StyleSheet } = React;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'stretch',
    alignItems: 'stretch',
    backgroundColor: '#bad',
    flex: 1
  },
  formGroup: {
  },
  loginButtonBg: {
    marginTop: 10,
    marginBottom: 10,
    height: 40,
    width: 300,
    alignSelf: 'center'
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
    borderTopWidth: 0,
    width: 300,
    padding: 5,
    borderColor: '#f5f5f5',
    alignSelf: 'center',
    alignItems: 'center',
  },
  loginLabel: {
    fontSize: 15
  },
  inputError: {
    borderColor: 'red'
  },
  logoImage: {
    marginTop: 100,
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
