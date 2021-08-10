import React from "react";
import "./SearchItem.css";
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import _ from "lodash";
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
        <IconButton onClick={() => {addPlayListItem(result);}}><AddIcon style={{fontSize:"30px"}}/></IconButton>
      </div>
    </li>
  );
}
