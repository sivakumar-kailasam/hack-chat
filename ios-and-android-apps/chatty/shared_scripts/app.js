'use strict';

const React = require('react-native');
const {
  AppRegistry
} = React;
const indexPage = require('./pages/index');

module.exports = function() {
  AppRegistry.registerComponent('chatty', () => indexPage);
}
