import React from "react";
import "./SearchItem.css";
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
export default function SearchItem({ result, addPlayListItem }) {

  return (
    <li className="searchItemBox">
      <div className="youtubeThumbnail">
        <img src={result.thumbnails.default.url} alt={result.description}/>
      </div>

      <div className="searchItemText">
        {result.title}
      </div>

      <div className="searchAndPlaylistButtons">
        <IconButton onClick={() => {addPlayListItem(result);}}><AddIcon/></IconButton>
      </div>
    </li>
  );
}
