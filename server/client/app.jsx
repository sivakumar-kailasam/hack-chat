'use strict';

const React = require('react');
const render = require('react-dom').render;
const injectTapEventPlugin = require("react-tap-event-plugin");

const TextField = require('material-ui/lib/text-field');
const Paper = require('material-ui/lib/paper');
const RaisedButton = require('material-ui/lib/raised-button');

// For material UI plugin
injectTapEventPlugin();

//const socket = io.connect();

const LoginForm = React.createClass({
  getInitialState() {
    return {
      userName: '',
      emailAddress: ''
    };
  },
  gotoChatRoom() {
    console.log(this.state);
    render(
      <ChatRoom
        userName={this.state.userName}
        emailAddress={this.state.emailAddress}
      />
      , document.getElementById('app')
    );
  },
  render() {
    return (
      <Paper zDepth={5}>
        <div><TextField floatingLabelText="Your name" onChange={(e) => this.setState({userName: e.target.value})} /></div>
        <div><TextField floatingLabelText="Email addresss" onChange={(e)=> this.setState({emailAddress: e.target.value})}/></div>
        <div><RaisedButton label="Let's chat!" backgroundColor='#2196f3' onTouchTap={this.gotoChatRoom}/></div>
      </Paper>
    );
  }
});

const ChatRoom = React.createClass({
  render() {
    return (
      <Paper zDepth={1}>
        <div>{this.props.userName}</div>
        <div>{this.props.emailAddress}</div>
      </Paper>
    );
  }
});

//render(<LoginForm/>, document.getElementById('app'));
render(<ChatRoom userName="siva" emailAddress="siva@zachelor.com"/>, document.getElementById('app'));
