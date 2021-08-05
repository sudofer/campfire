import React from 'react';

export default function PlayListItem({ playListItem }) {
  const style = {
    width: "90px",
    height: "45px",
  };
  return (
    <li className="SearchItemBox">
      <h5>{playListItem.title}</h5>
      <img style={style} src={playListItem.thumbnails.default.url} alt={playListItem.description}></img>
    </li>
  );
}