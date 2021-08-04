import React, { useState } from "react";
import SideBarNav from "./SideBarNav/SideBarNav";
import SearchBox from "./searchbox";
import Chatbox from "./chatbox";
import PlaylistBox from "./playlistbox";
export default function Sidebar(props) {
  const {
    addPlayListItem,
    name,
    message,
    messages,
    setMessage,
    sendMessage,
    results,
    searchTerm,
    setSearchTerm,
    submitPlayListItem,
  } = props;

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <SideBarNav value={value} handleChange={handleChange} />
      {value === 0 && (
        <Chatbox
          name={name}
          message={message}
          messages={messages}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      )}
      {value === 1 && <PlaylistBox />}
      {value === 2 && (
        <SearchBox
          addPlayListItem={addPlayListItem}
          results={results}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          submitPlayListItem={submitPlayListItem}
        />
      )}
    </>
  );
}
