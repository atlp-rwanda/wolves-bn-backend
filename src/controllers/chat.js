import models from '../database/models';

async function saveChat(user, message) {
  const chat = await models.chat.create({ userId: user.id, message });
  // console.log('saved Chat:', chat);
}

async function retriveChats() {
  models.chat.belongsTo(models.users, { foreignKey: 'userId' });
  return models.chat.findAll({
    include: [models.users]
  });
}

export default (io) => {
  io.on('connection', (socket) => {
    socket.on('msg', (data) => {
      // Send message to everyone
      const user = socket.request.user;
      saveChat(user, data.message);
      io.sockets.emit('newmsg', {
        username: user.lastName,
        message: data.message,
        date: new Date()
      });
    });

    retriveChats().then((chats) => {
      chats.map(chat => socket.emit('newmsg', {
        username: chat.user.lastName,
        message: chat.message,
        date: chat.createdAt
      }));

      // console.log(chats);
      // for (let i = 0; i < chats.length; i += 1) {
      //   const chat = chats[i];

      // socket.emit('newmsg', {
      //   username: chat.user.lastName,
      //   message: chat.message,
      //   date: chat.createdAt
      // });
      // }
    }).catch((err) => {
      console.error('Cannot retrive messages:');
      console.error(err);
    });
  });
};
