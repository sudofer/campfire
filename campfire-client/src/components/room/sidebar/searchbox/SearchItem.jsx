import React from "react";
import "./SearchItem.css";
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
export default function SearchItem({ result, addPlayListItem }) {
  const style = {
    width: "90px",
    height: "45px",
  };
  return (
    <li className="SearchItemBox">
      <span className="MuiTab-root">{result.title}</span>
      <img style={style} src={result.thumbnails.default.url} alt={result.description}></img>
      <IconButton 
        onClick={() => {
          addPlayListItem(result);
        }}
      >
        <AddIcon/>
      </IconButton>
    </li>
  );
}
