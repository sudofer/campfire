import React from "react";
import PlayListItem from "./PlaylistItem";
import "../searchbox/SearchItem.css"


export default function PlaylistBox({ playList, emitChosenOne, removeFromPlayList }) {
  const playListID = function () {
    return Math.random().toString(36).substr(2, 9);
  };
  return (
    <div className="searchContainer">
      <ul>
    {playList.map((item, index) => {
    const id = playListID();
    return (
      <PlayListItem
        key={id}
        playListItem={item}
        index={index}
        emitChosenOne={emitChosenOne}
        removeFromPlayList={removeFromPlayList}
      />
    );
    })}
    </ul>
  </div>
  )
}
