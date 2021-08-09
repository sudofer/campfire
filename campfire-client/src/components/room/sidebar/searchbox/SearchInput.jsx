import React, { useState } from "react";
import InputBase from '@material-ui/core/InputBase';
import Search from '@material-ui/icons/Search';
import { useSearchInputStyles } from '@mui-treasury/styles/input/search';

export default function SearchInput({ setSearchTerm }) {
  const styles = useSearchInputStyles();
  const [val, setVal] = useState("");
  const formSubmit = (event) => {
    event.preventDefault();
    setSearchTerm(val);
    setVal("");
  };

  function handleChange(evt) {
    setVal(evt.target.value);
  }

  return (
    <>
    <form className="search-controls">
    <InputBase
      classes={styles}
      startAdornment={<Search />}
      onChange={handleChange}
      className="video-search"
      placeholder="Search Here"
      value={val}
      onKeyPress={(event) =>
        event.key === "Enter" ? formSubmit(event) : null
      }
    />
         {/* <input */}
        {/* //   onChange={handleChange}
        //   className="video-search"
        //   type="text"
        //   placeholder="Search Here"
        //   value={val}
        //   onKeyPress={(event) =>
        //     event.key === "Enter" ? formSubmit(event) : null
        //   }
        // /> */}
      </form>
    </>
  );
}
