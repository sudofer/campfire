const adminChatWelcome = (socket, name) => {
  socket.emit("MESSAGE", {
    user: "admin",
    text: `${name}, welcome to the chat!`,
  });
};

const adminChatJoin = (socket, room, name) => {
  socket.broadcast.to(room).emit("MESSAGE", {
    user: "admin",
    text: `${name} has joined!`,
  });
};

const checkExistingUser = (users, name) => {
  const existingUser = users.find((user) => user.name === name);

  if (existingUser) {
    return true;
  }

  return false;
};

const removeRoom = (data, index) => {
  data.splice(index, 1);
};

const removeUser = (users, id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    users.splice(index, 1);
  }
};

const getUser = (users, id) => users.find((user) => user.id === id);

const getRoomById = (data, id) => {
  const found = data.find((d) => getUser(d.users, id));
  return found;
};

const getRoomByUrl = (data, url) => data.find((d) => d.url === url);

const getRoomIndex = (data, url) => data.findIndex((d) => d.url === url);

const getUsersInRoom = (users, url) => users.filter((user) => user.url === url);

module.exports = {
  adminChatWelcome,
  adminChatJoin,
  checkExistingUser,
  removeUser,
  removeRoom,
  getUser,
  getUsersInRoom,
  getRoomById,
  getRoomByUrl,
  getRoomIndex,
};
