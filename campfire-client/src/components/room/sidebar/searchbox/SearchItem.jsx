import React from "react";
import "./SearchItem.css";
export default function SearchItem({ result, submitPlayListItem }) {
  console.log(result);
  const style = {
    width: "90px",
    height: "45px",
  };
  return (
    <li className="SearchItemBox">
      <h5>{result.title}</h5>
      <img style={style} src={result.thumbnails.default.url}></img>
      <button
        onClick={() => {
          submitPlayListItem(result);
        }}
      >
        +
      </button>
    </li>
  );
}
