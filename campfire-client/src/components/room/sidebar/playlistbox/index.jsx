import React from "react";
import PlayListItem from "./PlaylistItem";

export default function PlaylistBox({
  playList,
  emitChosenOne,
  removeFromPlayList,
}) {
  const playListID = function () {
    return Math.random().toString(36).substr(2, 9);
  };
  return playList.map((item, index) => {
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
  });
}
