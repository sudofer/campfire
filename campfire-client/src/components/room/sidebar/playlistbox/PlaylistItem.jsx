import React from "react";
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import IconButton from '@material-ui/core/IconButton';
import '../searchbox/SearchItem.css'
import ReactTooltip from "react-tooltip";

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
        <IconButton data-tip data-for="deletedButton" data-event="click" onClick={() => removeFromPlayList(index)}><DeleteForeverIcon style={{fontSize:"30px"}}/></IconButton>&nbsp;   
        <IconButton data-tip data-for="addedButton" data-event="click" onClick={() => emitChosenOne(index)}><PlayCircleFilledWhiteIcon style={{fontSize:"30px"}}/></IconButton>
      </div>

      <ReactTooltip id='deletedButton' type='dark' afterShow={() => setTimeout(() => ReactTooltip.hide(), 700)}>
        <span>Deleted!</span>
      </ReactTooltip>

      <ReactTooltip id='addedButton' type='dark' afterShow={() => setTimeout(() => ReactTooltip.hide(), 700)}>
        <span>Added!</span>
      </ReactTooltip>
    </li>
  );
}
