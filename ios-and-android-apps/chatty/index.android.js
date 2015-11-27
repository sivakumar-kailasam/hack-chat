'use strict';

const React = require('react-native');
const {
  AppRegistry
} = React;
const chatty = require('./shared_scripts/pages/index');

AppRegistry.registerComponent('chatty', () => chatty);
