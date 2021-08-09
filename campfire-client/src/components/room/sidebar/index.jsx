import React, { useState } from "react";
import SideBarNav from "./SideBarNav/SideBarNav";
import SearchBox from "./searchbox";
import Chatbox from "./chatbox";
import UsersBox from "./UsersBox/UsersBox";
import PlaylistBox from "./playlistbox";
import "./index.css";
export default function Sidebar(props) {
  const {
    addPlayListItem,
    name,
    url,
    message,
    messages,
    setMessage,
    sendMessage,
    results,
    searchTerm,
    setSearchTerm,
    playList,
    setPlayList,
    setCurrentPlaying,
    emitChosenOne,
    removeFromPlayList,
    roomUsers,
  } = props;

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div className="sidebar">
        <SideBarNav value={value} handleChange={handleChange} />
        {value === 0 && (
          <Chatbox
            name={name}
            roomUsers={roomUsers}
            message={message}
            messages={messages}
            setMessage={setMessage}
            sendMessage={sendMessage}
          />
        )}
        {value === 1 && (
          <PlaylistBox
            setCurrentPlaying={setCurrentPlaying}
            playList={playList}
            setPlayList={setPlayList}
            emitChosenOne={emitChosenOne}
            removeFromPlayList={removeFromPlayList}
          />
        )}
        {value === 2 && (
          <SearchBox
            addPlayListItem={addPlayListItem}
            results={results}
            url={url}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        )}
        {value === 3 && <UsersBox roomUsers={roomUsers} />}
      </div>
    </>
  );
}
