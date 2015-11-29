'use strict';

const React  = require('react');
const render = require('react-dom').render;

const classNames           = require('classnames');
const gravatar             = require('gravatar');
const injectTapEventPlugin = require("react-tap-event-plugin");

const Avatar               = require('material-ui/lib/avatar');
const Card                 = require('material-ui/lib/card/card');
const CardText             = require('material-ui/lib/card/card-text');
const CardTitle            = require('material-ui/lib/card/card-title');
const FloatingActionButton = require('material-ui/lib/floating-action-button');
const List                 = require('material-ui/lib/lists/list');
const ListDivider          = require('material-ui/lib/lists/list-divider');
const ListItem             = require('material-ui/lib/lists/list-item');
const Paper                = require('material-ui/lib/paper');
const RaisedButton         = require('material-ui/lib/raised-button');
const SendIcon             = require('material-ui/lib/svg-icons/content/send');
const TextField            = require('material-ui/lib/text-field');

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
      <div className="login-page">
        <div className="login-form">
        <Paper zDepth={5} style={{padding: '5em'}}>
          <div><Avatar src="/chat-icon.png" size={122}/></div>
          <div><TextField floatingLabelText="Your name" onChange={(e) => this.setState({userName: e.target.value})} /></div>
          <div><TextField floatingLabelText="Email addresss" onChange={(e)=> this.setState({emailAddress: e.target.value})}/></div>
          <div><RaisedButton label="Let's chat!" backgroundColor='#2196f3' onTouchTap={this.gotoChatRoom}/></div>
        </Paper>
      </div>
      </div>
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
            return (
              <ListItem
                  disabled={true}
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
      messages: [],
      messageContent: ''
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
  sendMessage() {
    if(this.state.messageContent.trim() === '') {return}
    const dataToSend = {
      userName: this.props.userName,
      emailAddress: this.props.emailAddress,
      message: this.state.messageContent
    };
    socket.emit('clientSentMessage', dataToSend, this._updateMessage);
  },
  _updateMessage(data) {
    console.log('received message', data);
    const messages = this.state.messages;
    messages.push(data.message);
    this.setState({messages, messageContent: ''});
    //Down right hack! :(
    const messagesDisplayContainer = document.querySelector('.messages-display > div');
    messagesDisplayContainer.scrollTop = messagesDisplayContainer.scrollHeight;
    this._focusOnComposer();
  },
  _focusOnComposer() {
    const messageComposer = document.getElementsByClassName('message-composer')[0];
    const inputField = messageComposer.querySelector('input');
    inputField.focus();
  },
  componentDidMount() {
    socket.on('person:enteredRoom', this._joinOrLeaveRoom);
    socket.on('person:leftRoom', this._joinOrLeaveRoom);
    socket.on('serverSentMessage', this._updateMessage);
    this._focusOnComposer();
  },
  render() {
    return (
        <div className="flex-item chat-container">
          <div className="messages-container">
            <div className="messages-display">
              <Paper zDepth={1} style={{width: '100%', height: '100%', overflow:'scroll'}}>
                  {
                    this.state.messages.map((message, i)=> {
                      const gravatarUrl = gravatar.url(message.emailAddress, {s: 40, d: 'retro'});
                      const isMessageFromMe = (message.emailAddress === this.props.emailAddress);
                      const cardClassNames = classNames('conversation-card', {'message-self': isMessageFromMe}, {'message-others': !isMessageFromMe});
                      const cardStyle = {width:'100%'};
                      if (isMessageFromMe) {
                        cardStyle['backgroundColor'] = '#fffde7';
                        cardStyle['marginRight'] = '1em';
                        return (
                          <div key={message.id} className={cardClassNames}>
                            <Card style={cardStyle}>
                              <CardText style={{padding: '2px 16px 2px 16px'}}>
                                  <h3> {message.userName} </h3>
                                  <p>
                                  {message.content}
                                  </p>
                             </CardText>
                            </Card>
                            <Avatar src={gravatarUrl} />
                          </div>
                        );
                      }
                      cardStyle['marginLeft'] = '1em';
                      return (
                        <div key={message.id} className={cardClassNames}>
                          <Avatar src={gravatarUrl} />
                          <Card style={cardStyle}>
                            <CardText style={{padding: '2px 16px 2px 16px'}}>
                                <h3> {message.userName} </h3>
                                <p>
                                {message.content}
                                </p>
                           </CardText>
                          </Card>
                        </div>
                      );
                    })
                  }
              </Paper>
            </div>
            <div className="message-composer">
              <Paper zDepth={1} style={{width: '100%', height: '100%', paddingTop: '2em'}}>
                <TextField
                  style={{width: '90%'}}
                  hintText="Type your message here"
                  value={this.state.messageContent}
                  onEnterKeyDown={this.sendMessage}
                  onChange={(e)=> this.setState({'messageContent': e.target.value})}/>
                <FloatingActionButton onTouchTap={this.sendMessage} mini={true}>
                  <SendIcon/>
                </FloatingActionButton>
              </Paper>
            </div>
            </div>
          <UsersList users={this.state.users} />
        </div>
    );
  }
});


render(<LoginForm/>, document.getElementById('app'));
