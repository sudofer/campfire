import React from "react";
import MessageInput from './MessageInput'
import MessageList from './MessageList'
import './Message.css'

export default function Chatbox(props) {
 const { name, message, messages, setMessage, sendMessage } = props;
  
  return (
    <div className="outerContainer">
      <div className="insideContainer">
        <MessageList messages={messages} name={name}/>
        <MessageInput
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
}
