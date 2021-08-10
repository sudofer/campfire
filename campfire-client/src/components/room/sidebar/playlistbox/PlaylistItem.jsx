import React from "react";
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import IconButton from '@material-ui/core/IconButton';
import '../searchbox/SearchItem.css'

export default function PlayListItem({
  playListItem,
  index,
  emitChosenOne,
  removeFromPlayList,
}) {

  return (
    <li className="searchItemBox">
      <div className="playlistYoutubeThumbnail">
        <img
          src={playListItem.thumbnails.default.url}
          alt={playListItem.description}
        />
      </div>

      <div className="playlistItemText">
        {playListItem.title}
      </div>

      <div className="searchAndPlaylistButtons">        
        <IconButton onClick={() => removeFromPlayList(index)}><DeleteForeverIcon style={{fontSize:"30px"}}/></IconButton>&nbsp;   
        <IconButton onClick={() => emitChosenOne(index)}><PlayCircleFilledWhiteIcon style={{fontSize:"30px"}}/></IconButton>
      </div>
    </li>
  );
}
