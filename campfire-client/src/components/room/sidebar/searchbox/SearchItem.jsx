import React from "react";
import "./SearchItem.css";
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import _ from "lodash";
import ReactTooltip from "react-tooltip";
export default function SearchItem({ result, addPlayListItem }) {

  return (
    <li className="searchItemBox">
      <div className="searchYoutubeThumbnail">
        <img src={result.thumbnails.default.url} alt={result.description}/>
      </div>

      <div className="searchItemText">
        {_.unescape(result.title)}
      </div>

      <div className="searchAndPlaylistButtons">
        <IconButton data-tip data-for="addedButton" data-event="click" onClick={() => {addPlayListItem(result);}}><AddIcon style={{fontSize:"30px"}}/></IconButton>
      </div>

      <ReactTooltip id='addedButton' type='dark' afterShow={() => setTimeout(() => ReactTooltip.hide(), 700)}>
        <span>Added!</span>
      </ReactTooltip>
    </li>
  );
}
