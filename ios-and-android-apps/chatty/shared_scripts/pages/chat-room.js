'use strict';

const React      = require('react-native');
const Emoji      = require('react-native-emoji');
const classNames = require('classnames');
const AwesomeButton = require('react-native-awesome-button')
const Gravatar   = require('../components/gravatar');
const styles     = require('../styles');

const {
  Image,
  Text,
  TextInput,
  View
} = React;


const chatRoom = React.createClass({
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
    this.props.socket.emit('clientSentMessage', dataToSend, this._updateMessage);
  },
  _updateMessage(data) {
    console.log('received message', data);
    const messages = this.state.messages;
    messages.push(data.message);
    this.setState({messages, messageContent: ''});
    //Down right hack! :(
  /*  const messagesDisplayContainer = document.querySelector('.messages-display > div');*/
    //messagesDisplayContainer.scrollTop = messagesDisplayContainer.scrollHeight;
    /*this._focusOnComposer();*/
  },
  _focusOnComposer() {
/*    const messageComposer = document.getElementsByClassName('message-composer')[0];*/
    //const inputField = messageComposer.querySelector('input');
    /*inputField.focus();*/
  },
  componentDidMount() {
    this.props.socket.on('person:enteredRoom', this._joinOrLeaveRoom);
    this.props.socket.on('person:leftRoom', this._joinOrLeaveRoom);
    this.props.socket.on('serverSentMessage', this._updateMessage);
    //this._focusOnComposer();
  },
  render() {
    return (
      <View style={styles.container}>
      <Text>{this.props.emailAddress}</Text>
        {
          this.state.messages.map((message, i)=> {
            const isMessageFromMe = (message.emailAddress === this.props.emailAddress);
            const cardClassNames = classNames('conversation-card', {'message-self': isMessageFromMe}, {'message-others': !isMessageFromMe});
            return (
              <View key={message.id}>
                <Gravatar email={message.emailAddress} size={30}/>
                <Text> {message.userName} - {message.content} </Text>
              </View>
            );
          })
        }
        <TextInput
            style={[styles.loginInput]}
            onChangeText={(messageContent) => this.setState({ messageContent })}
            value={this.state.messageContent}
            placeholder='Type your message here!'
          />
          <AwesomeButton
                   backgroundStyle={styles.loginButtonBg}
                   labelStyle={styles.loginButtonLabel}
                   transitionDuration={200}
                   states={{
                     default: {
                       text: 'Send',
                       onPress: this.sendMessage,
                       backgroundColor: '#1155DD'
                    }
                   }}
                   />

     </View>
    );
  }
});

module.exports = chatRoom;
