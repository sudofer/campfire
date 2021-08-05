const addUser = (users, { id, name, url }) => {
  name = name.trim().toLowerCase();
  url = url.trim().toLowerCase();
  const existingUser = users.find((user) => user.url === url && user.name === name);
  
  if(existingUser){
    return { error: 'Username is taken' };
  }

  const user = { id, name, url };
  users.push(user)
  return { user };
};
 
const removeUser = (users, id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    users.splice(index,1)
  }
};

const getUser = (users, id) => users.find((user) => user.id === id);

const getUsersInRoom = (users, url) => users.filter((user) => user.url === url);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };