import React from "react";

export default function SearchItem({ result, submitPlayListItem }) {
  return (
    <li>
      <h5>{result.link}</h5>
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
