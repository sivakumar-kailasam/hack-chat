'use strict';
const _ = require('lodash');
const Uuid = require('node-uuid');
const connectedUsers = [];

module.exports = function (socket) {

  socket.on('person:enteringRoom', function(data, fn) {
    const emailAddress = data.emailAddress, userName = data.userName;
    const secretSessionId = this.id;
    connectedUsers.push({emailAddress, userName, secretSessionId});
    socket.broadcast.emit('person:enteredRoom', {
      message: {
        id: Uuid.v4(),
        userName,
        emailAddress,
        content: 'joined the conversation'
      },
      users: connectedUsers
    });
    fn({
      users: _.filter(connectedUsers, (user) => {return secretSessionId !== user.secretSessionId}),
        secretSessionId
    });
    console.log(`${userName}(${emailAddress}) joined`);
  });

  socket.on('clientSentMessage', function(data, fn) {
    const message = {
      id: Uuid.v4(),
      userName: data.userName,
      emailAddress: data.emailAddress,
      content: data.message
    };
    console.log(`Received message from ${data.userName}(${data.emailAddress}): ${data.message}`);
    socket.broadcast.emit('serverSentMessage', { message });
    fn({message});
  });

  socket.on('disconnect', function () {
    const disconnectedUser = _.remove(connectedUsers, (user) => { return user.secretSessionId === this.id})[0];
    if(typeof disconnectedUser === 'undefined') {
      return;
    }
    socket.broadcast.emit('person:leftRoom', {
      message: {
        id: Uuid.v4(),
        userName: disconnectedUser.userName,
        emailAddress: disconnectedUser.emailAddress,
        content: 'left the conversation'
      },
      users: connectedUsers
    });
    console.log(`${disconnectedUser.userName}(${disconnectedUser.emailAddress}) left`);
  });

};
