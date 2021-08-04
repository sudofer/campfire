import React, { useState } from "react";
import SideBarNav from "./SideBarNav/SideBarNav";
import SearchBox from "./searchbox";
import Chatbox from "./chatbox";
import PlaylistBox from "./playlistbox";
export default function Sidebar({ addPlayListItem }) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <SideBarNav value={value} handleChange={handleChange} />
      {value === 0 && <Chatbox />}
      {value === 1 && <PlaylistBox />}
      {value === 2 && <SearchBox addPlayListItem={addPlayListItem} />}
    </>
  );
}
