import React, { useState } from "react";
import InputBase from '@material-ui/core/InputBase';
import Search from '@material-ui/icons/Search';
import { useSearchInputStyles } from '@mui-treasury/styles/input/search';
import { makeStyles } from "@material-ui/styles";
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

  const useStyles = makeStyles((theme) => ({
      root: {
        backgroundColor: 'none',
        borderRadius: '10px',
        border: '2px solid rgba(225, 225, 225, 0.2)',
        padding: '1px 3px',
        color: 'white',
        typography: {
          fontFamily: 'Helvetica Neue'
        },
        adornedStart: {
          fontSize: 20,
        },
        width: '560px',
      }}));

  const classes = useStyles();

  return (
    <>
      <form className="search-controls">
        <InputBase
          id={'search-controls'}
          className={classes.root}
          startAdornment={<Search />}
          onChange={handleChange}
          placeholder="Search"
          value={val}
          onKeyPress={(event) =>
            event.key === "Enter" ? formSubmit(event) : null
          }
        />
      </form>

    </>
  );
}
