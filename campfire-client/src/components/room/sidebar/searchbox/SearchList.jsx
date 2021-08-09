import React from "react";
import SearchItem from "./SearchItem";

export default function SearchList({ results, addPlayListItem }) {
  return (
    <div className="searchContainer">
      <ul>
        {results.map((result) => {
          return (
            <SearchItem
              addPlayListItem={addPlayListItem}
              key={result.id}
              result={result}
            />
          );
        })}
      </ul>
    </div>
  );
}
