import React, { useState } from "react";

export default function SearchInput({ setSearchTerm }) {
  const [val, setVal] = useState("");
  const formSubmit = (event) => {
    event.preventDefault();
    setSearchTerm(val);
    setVal("");
    //event.target.value = "";
  };

  function handleChange(evt) {
    setVal(evt.target.value);
  }

  return (
    <>
      <form className="search-controls">
        <label>Search</label>
        <input
          onChange={handleChange}
          className="video-search"
          type="text"
          placeholder="Search Here"
          value={val}
          onKeyPress={(event) =>
            event.key === "Enter" ? formSubmit(event) : null
          }
        />
      </form>
    </>
  );
}
