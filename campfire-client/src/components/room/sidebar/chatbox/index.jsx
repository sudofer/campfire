import React, { useState, useEffect } from "react";
import io from "socket.io-client";

let socket;

export default function Chatbox() {
  // const [value, setValue] = React.useState();

  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };

  const [name, setName] = useState('');
  const [url, setURL] = useState('');
  const [message, setMessage] = useState([]);
  const [messages, setMessages] = useState([]);
  const ENDPOINT = 'ws://localhost:3002';

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');
    const url = urlParams.get('url');

    socket = io(ENDPOINT);

    setName(name);
    setURL(url);

    socket.emit("createRoom", { name, url }, ({ error }) => {

    })

    return() => {
      socket.emit('disconnect');
      socket.off();
    }
  }, [ENDPOINT, window.location.search])

  useEffect(() => {
    console.log(`client side: ${socket.id}`)
    socket.on('message', (message) => {
      setMessages([...messages, message])
    })
  }, [messages])

  const sendMessage = (event) => {
    event.preventDefault();

    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  } 

  console.log(message, messages)

  return (
  <div className="outerContainer">
    <div className="container">
    <input 
      value={message} 
      onChange={(event) => setMessage(event.target.value)}
      onKeyPress={(event) => event.key === 'Enter' ? sendMessage(event) : null}
    />
    </div>
  </div>
  )
}
