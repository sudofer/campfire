import React, { useState } from "react";
import SearchInput from "./SearchInput";
import search from "youtube-search";
import SearchList from "./SearchList";
export default function SearchBox({ addPlayListItem }) {
  const [results, setResults] = useState([]);

  console.log(process.env.REACT_APP_KEY)

  const setSearchTerm = (term) => {
    console.log(term, "*******");
    var opts = {
      maxResults: 10,
      key: process.env.REACT_APP_KEY,
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
