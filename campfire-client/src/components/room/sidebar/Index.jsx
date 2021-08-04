import React, { useState } from "react";
import SideBarNav from "./SideBarNav/SideBarNav";
import SearchBox from "./searchbox";
import Chatbox from "./chatbox";
import PlaylistBox from "./playlistbox";
export default function Sidebar({ addPlayListItem }) {
  const [sideBarPos, setSideBarPos] = useState(0);
  const onSideBarChange = (pos) => {
    setSideBarPos(pos);
  };

  return (
    <>
      <SideBarNav onSideBarChange={onSideBarChange} />
      {sideBarPos === 0 && <Chatbox />}
      {sideBarPos === 1 && <PlaylistBox />}
      {sideBarPos === 2 && <SearchBox addPlayListItem={addPlayListItem} />}
    </>
  );
}
