'use strict';
const _ = require('lodash');
const Uuid = require('uuid-lib');
const connectedUsers = [];

module.exports = function (socket) {

  socket.on('person:enteringRoom', function(data, fn) {
    const emailAddress = data.emailAddress, userName = data.userName;
    const secretSessionId = this.id;
    connectedUsers.push({emailAddress, userName, secretSessionId});
    socket.broadcast.emit('person:enteredRoom', {
      message: {
          id: Uuid.raw(),
          userName,
          emailAddress,
          type: 'activity',
          activityType: 'joined'
     },
     users: connectedUsers
    });
    fn({
      users: _.filter(connectedUsers, (user) => {return secretSessionId !== user.secretSessionId}),
      secretSessionId
    });
    console.log(`${userName}(${emailAddress}) joined`);
  });

  socket.on('send:message', function(data) {
    socket.broadcast.emit('send:message', {
      user: data.user,
      message: data.message
    });
  });

  socket.on('disconnect', function () {
    const disconnectedUser = _.remove(connectedUsers, (user) => { return user.secretSessionId === this.id})[0];
    socket.broadcast.emit('person:leftRoom', {
      message: {
        id: Uuid.raw(),
        userName: disconnectedUser.userName,
        emailAddress: disconnectedUser.emailAddress,
        type: 'activity',
        activityType: 'left'
      },
      users: connectedUsers
    });
    console.log(`${disconnectedUser.userName}(${disconnectedUser.emailAddress}) left`);
  });

};
