import React from "react";
import SearchInput from "./SearchInput";
// import search from "youtube-search";
import SearchList from "./SearchList";
export default function SearchBox({
  addPlayListItem,
  results,
  // searchTerm,
  setSearchTerm,
}) {

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
      {/* <label>
        Search
        <input
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        onKeyPress={event => event.key === 'Enter' ? console.log('searched') : null}
        />
      </label> */}
      <SearchInput setSearchTerm={setSearchTerm} />
      <SearchList results={results} addPlayListItem={addPlayListItem} />
    </>
  );
}
