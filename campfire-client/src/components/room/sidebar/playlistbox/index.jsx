import React from "react";
import PlayListItem from "./PlaylistItem";

export default function PlaylistBox({
  playList,
  setPlayList,
  setCurrentPlaying,
  emitChosenOne
}) {
  return playList.map((item, index) => (
    <PlayListItem
      key={item.id}
      playList={playList}
      playListItem={item}
      setPlayList={setPlayList}
      index={index}
      setCurrentPlaying={setCurrentPlaying}
      emitChosenOne={emitChosenOne}
    />
  ));
}
