import React from "react";

export default function UsersBox({ roomUsers }) {
  return (
    <>
      <div>
        {roomUsers.length !== 0 &&
          roomUsers.map((user) => (
            <ul>
              <l1>{user.name}</l1>
            </ul>
          ))}
      </div>
    </>
  );
}
