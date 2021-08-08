import React from "react";

export default function PlayListItem({
  playListItem,
  index,
  emitChosenOne,
  removeFromPlayList,
}) {
  const style = {
    width: "90px",
    height: "45px",
  };

  return (
    <li className="SearchItemBox">
      <h5>{playListItem.title}</h5>
      <img
        style={style}
        src={playListItem.thumbnails.default.url}
        alt={playListItem.description}
      ></img>
      <button onClick={() => removeFromPlayList(index)}>-</button>
      <button onClick={() => emitChosenOne(index)}>PLAY</button>
    </li>
  );
}
