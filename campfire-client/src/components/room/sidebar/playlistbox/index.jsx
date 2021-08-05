import React from "react";
import PlayListItem from "./PlaylistItem";


export default function PlaylistBox({playList}) {
  return (
    playList.map((item) => <PlayListItem playListItem={item} />)
  )

}
