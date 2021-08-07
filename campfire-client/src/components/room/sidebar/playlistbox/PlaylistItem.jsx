import React from "react";

export default function PlayListItem({
  playListItem,
  playList,
  index,
  setPlayList,
  emitChosenOne
}) {
  const style = {
    width: "90px",
    height: "45px",
  };

  return (
    <li className="SearchItemBox" onClick={() => emitChosenOne(index)}>
      <h5>{playListItem.title}</h5>
      <img
        style={style}
        src={playListItem.thumbnails.default.url}
        alt={playListItem.description}
      ></img>
      {/* <button onClick={() => removeItemFromPlayList(playList, index)}>-</button> */}
    </li>
  );
}
