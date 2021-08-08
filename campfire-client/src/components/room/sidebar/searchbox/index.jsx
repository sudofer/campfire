import React from "react";
import SearchInput from "./SearchInput";
import SearchList from "./SearchList";
export default function SearchBox({
  addPlayListItem,
  results,
  setSearchTerm,
}) {
  return (
    <>
      <SearchInput setSearchTerm={setSearchTerm} />
      <SearchList results={results} addPlayListItem={addPlayListItem} />
    </>
  );
}
