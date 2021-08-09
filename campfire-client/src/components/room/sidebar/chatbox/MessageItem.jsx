import React from "react";

export default function Message({ message: { text, user, color }, name }) {
  let isSentByCurrentUser = false;
  const trimmedName = name.trim().toLowerCase();

  if(user === trimmedName) {
    isSentByCurrentUser = true;
  }
  return (
    isSentByCurrentUser
    ? (
      <div className="messageContainer justifyEnd">
      <p className="sentText pr-10">
        <span style={{backgroundColor: color}} className="swatch"></span>
        {trimmedName}
      </p>
      <div className="messageBox backgroundLight">
        <p className="messageText colorDark">{text}</p>
      </div>
    </div>
    )
    : (
      <div className="messageContainer justifyStart">
        <div className="messageBox backgroundLight">
          <p className="messageText colorDark">{text}</p>
        </div>
        <p className="sentText pl-10 ">{user}
          {user === "admin" ? null : <span style={{backgroundColor: color}} className="swatch"></span>}
        </p>
      </div>
    )
  );
}

