import React from "react";
import SearchItem from "./SearchItem";

export default function SearchList({ results, submitPlayListItem }) {
  return (
    <ul>
      {results.map((result) => {
        return (
          <SearchItem
            submitPlayListItem={submitPlayListItem}
            key={result.id}
            result={result}
          />
        );
      })}
    </ul>
  );
}
