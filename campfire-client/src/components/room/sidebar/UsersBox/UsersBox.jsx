import React from "react";
import './UsersBox.css'

export default function UsersBox({ roomUsers }) {
  return (
    <>
      <div className="userList">
        {roomUsers.length !== 0 &&
          roomUsers.map((user) => (
            <ul key={user.id}>
              <li>{user.name}</li>
            </ul>
          ))}
      </div>
    </>
  );
}
