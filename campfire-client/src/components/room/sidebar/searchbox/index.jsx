import React, { useState, useEffect } from "react";
import SearchInput from "./SearchInput";
import search from "youtube-search";
import SearchList from "./SearchList";
export default function SearchBox({
  addPlayListItem,
  results,
  searchTerm,
  setSearchTerm,
  submitPlayListItem,
}) {
  console.log(process.env.REACT_APP_KEY);

  // const setSearchTerm = (term) => {
  //   console.log(term, "*******");
  //   var opts = {
  //     maxResults: 10,
  //     key: process.env.REACT_APP_KEY,
  //     part: "snippet",
  //   };

  //   search(term, opts, function (err, results) {
  //     if (err) return console.log(err);

  //     setResults(results);
  //   });
  // };

  return (
    <>
      {/* <SearchInput
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      /> */}
      <label>
        Search
        <input
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </label>
      <SearchList results={results} submitPlayListItem={submitPlayListItem} />
    </>
  );
}
