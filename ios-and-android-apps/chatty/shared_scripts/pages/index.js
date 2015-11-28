'use strict';

const React       = require('react-native');
const Emoji       = require('react-native-emoji');
const validator = require('validator');
const styles      = require('../styles');
const AwesomeButton = require('react-native-awesome-button')

const {
  Image,
  Text,
  TextInput,
  View
} = React;


const chatty = React.createClass({
  getInitialState() {
    return {
      loginButtonState: 'idle'
    };
  },
  login() {
    this.setState({loginButtonState: 'busy'});

    if (!validator.isEmail(this.state.emailId)) {
      return this.setState({
        isEmailIdInvalid: true,
        loginButtonState: 'idle'
      });
    }

    if ((typeof this.state.userName === 'undefined') || (this.state.userName.trim() === '')) {
      return this.setState({
        isUserNameInvalid: true,
        loginButtonState: 'idle'
      });
    }

    const context = this;
    setTimeout(function() {
      context.setState({ loginButtonState: 'success' });
    }, 750);

  },
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}> Welcome to Chatty! <Emoji name='sunglasses'/> </Text>
        <Image source={require('../chat-icon.png')} style={styles.logoImage} />
        <View style={styles.formGroup}>
          <TextInput
            style={[styles.loginInput, this.state.isUserNameInvalid && styles.inputError]}
            onChangeText={(userName) => this.setState({ userName })}
            value={this.state.userName}
            placeholder='Your name'
          />
        </View>
        <View style={styles.formGroup}>
          <TextInput
            style={[styles.loginInput, this.state.isEmailIdInvalid && styles.inputError]}
            onChangeText={(emailId) => this.setState({ emailId })}
            value={this.state.emailId}
            keyboardType='email-address'
            placeholder='Email'
          />
        </View>
       <AwesomeButton
         backgroundStyle={styles.loginButtonBg}
         labelStyle={styles.loginButtonLabel}
         transitionDuration={200}
         states={{
           idle: {
             text: 'Login',
             onPress: this.login,
             backgroundColor: '#1155DD'
           },
           busy: {
            text: 'Logging In',
            backgroundColor: '#002299',
            spinner: true,
          },
          success: {
            text: `Awesome let's chat!`,
            backgroundColor: '#339944'
          }
         }}
         buttonState={this.state.loginButtonState}
         />
      </View>
    );
  }
});

module.exports = chatty;
