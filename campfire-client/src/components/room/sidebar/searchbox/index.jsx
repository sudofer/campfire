import React, { useState } from "react";
import SearchInput from "./SearchInput";
import search from "youtube-search";
import SearchList from "./SearchList";
export default function SearchBox({ addPlayListItem }) {
  const [results, setResults] = useState([]);

  const setSearchTerm = (term) => {
    console.log(term, "*******");
    var opts = {
      maxResults: 10,
      key: "AIzaSyDQRtudjaWTg9dhfrlfl6vQ9qvAq5k0mlQ",
      part: "snippet",
    };

    search(term, opts, function (err, results) {
      if (err) return console.log(err);

      setResults(results);
    });
  };

  const submitPlayListItem = (playListItem) => {
    console.log(playListItem);
    addPlayListItem(playListItem);
  };
  return (
    <>
      <SearchInput setSearchTerm={setSearchTerm} />
      <SearchList results={results} submitPlayListItem={submitPlayListItem} />
    </>
  );
}
