import React from "react";
import "./SearchItem.css";
export default function SearchItem({ result, addPlayListItem }) {
  console.log(result);
  const style = {
    width: "90px",
    height: "45px",
  };
  return (
    <li className="SearchItemBox">
      <h5>{result.title}</h5>
      <img style={style} src={result.thumbnails.default.url} alt={result.description}></img>
      <button
        onClick={() => {
          addPlayListItem(result);
        }}
      >
        +
      </button>
    </li>
  );
}
