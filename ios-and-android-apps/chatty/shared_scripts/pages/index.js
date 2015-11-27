'use strict';

const React       = require('react-native');
const Emoji       = require('react-native-emoji');
const superheroes = require('superheroes');
const styles      = require('../styles');
const Gravatar    = require('../components/gravatar');
const AwesomeButton = require('react-native-awesome-button')

const {
  Image,
  Text,
  TextInput,
  View
} = React;


const chatty = React.createClass({
  getInitialState: function() {
    return {
      randomUserNamePlaceholder: superheroes.random(),
      loginButtonState: 'idle'
    };
  },
  login() {
  },
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}> Welcome to Chatty! <Emoji name='sunglasses'/> </Text>
        <Image source={require('../chat-icon.png')} style={{width: 100, height: 100, alignSelf: 'center'}} />
        <View style={styles.formGroup}>
          <Text>Your name</Text>
          <TextInput
            style={styles.loginInput}
            onChangeText={(userName) => this.setState({ userName })}
            value={this.state.userName}
            placeholder={ this.state.randomUserNamePlaceholder }
          />
        </View>
        <View style={styles.formGroup}>
          <Text>Your email id</Text>
          <TextInput
            style={styles.loginInput}
            onChangeText={(emailId) => this.setState({ emailId })}
            value={this.state.emailId}
            keyboardType='email-address'
            placeholder='some.email.id@gmail.com'
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
            text: 'Logged In',
            backgroundColor: '#339944'
          }
         }}
         buttonState={this.state.loginButtonState}
         />
       <Gravatar email={this.state.emailId} />
      </View>
    );
  }
});

module.exports = chatty;
