'use strict';

const md5         = require('md5');
const React       = require('react-native');
const styles      = require('../styles');
const queryString = require('qs');
const validator = require('validator');

const {
  Image,
  Text,
  View
} = React;


module.exports = React.createClass({
  displayName: 'Gravatar',
  propTypes: {
    email: React.PropTypes.string
  },
  getDefaultProps:function() {
    return {
      size: 50,
      rating: 'g',
      default: 'retro',
      email: ''
    };
  },
  render: function() {
    const isUrlEmpty = typeof this.props.email !== 'undefined' && this.props.email.trim() === '';
    if(isUrlEmpty || !validator.isEmail(this.props.email)) {
      return (
        <View/>
      );
    }
    const query = queryString.stringify({
      s: this.props.size * 2,
      r: this.props.rating,
      d: this.props.default
    });
    const emailHash = md5(this.props.email);
    const url = `https://secure.gravatar.com/avatar/${emailHash}?${query}`;
    return (
      <Image source={{uri: url}} style={{height: this.props.size, width: this.props.size}} />
    );
  }
});

