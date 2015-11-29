'use strict';

const React = require('react');
const render = require('react-dom').render;
const injectTapEventPlugin = require("react-tap-event-plugin");

const TextField = require('material-ui/lib/text-field');
const Paper = require('material-ui/lib/paper');
const RaisedButton = require('material-ui/lib/raised-button');
const Avatar = require('material-ui/lib/avatar');
const List = require('material-ui/lib/lists/list');
const ListItem = require('material-ui/lib/lists/list-item');

const gravatar = require('gravatar');

// For material UI plugin
injectTapEventPlugin();

const socket = io.connect();

const LoginForm = React.createClass({

  getInitialState() {
    return {
      userName: '',
      emailAddress: '',
      users: [],
      secretSessionId: ''
    };
  },
  gotoChatRoom() {
    const infoToSendToServer = {
      userName: this.state.userName,
      emailAddress: this.state.emailAddress
    };

    socket.emit('person:enteringRoom', infoToSendToServer, (response) => {
      console.log('Entering room', response);
      const { users, secretSessionId} = response;
      this.setState({users, secretSessionId});
      render(
        <ChatRoom
          secretSessionId={this.state.secretSessionId}
          userName={this.state.userName}
          emailAddress={this.state.emailAddress}
          users={this.state.users}
        />
        , document.getElementById('app')
      );
    });

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

const UsersList = React.createClass({
  render() {
    return (
      <div className="flex-item chat-user-list">
        <Paper zDepth={2} style={{width: '100%', height:'100%'}}>
        <List subheader="Who's online">
        {
          this.props.users.map(function(user) {
            const gravatarUrl = gravatar.url(user.emailAddress, {s: 40, d: 'retro'});
            return (<ListItem
                      key={user.secretSessionId}
                      leftAvatar={<Avatar src={gravatarUrl} size={40} />}
                      primaryText={user.userName}
                    />
                   );
          })
        }
        </List>
        </Paper>
      </div>
    );
  }
});

const ChatRoom = React.createClass({
  getInitialState() {
    return {
      users: this.props.users,
      messages: []
    };
  },
  _joinOrLeaveRoom(data) {
    console.log(data);
    const messages = this.state.messages;
    messages.push(data.message);
    const users = data.users.filter((user) => {
      if(user.secretSessionId !== this.props.secretSessionId) {
        return user;
      };
    });
    this.setState({messages, users});
  },
  componentDidMount() {
    socket.on('person:enteredRoom', this._joinOrLeaveRoom);
    socket.on('person:leftRoom', this._joinOrLeaveRoom);
  },
  render() {
    return (
      <div className="flex-container">
        <div className="flex-item chat-container">
          <Paper zDepth={1} style={{width: '100%'}}>
          {
            this.state.messages.map((message)=> {
              if(message.type === 'activity') {
                return (
                  <div key={message.id}>
                  {message.userName} {message.activityType} the conversation
                  </div>
                );
              } else {
              }
            })
          }
          </Paper>
          <UsersList users={this.state.users} />
        </div>
      </div>
    );
  }
});


render(<LoginForm/>, document.getElementById('app'));
