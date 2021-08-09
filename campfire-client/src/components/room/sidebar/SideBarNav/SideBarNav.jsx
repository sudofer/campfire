import React from "react";
import { Tabs, Tab } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
export default function SideBarNav({ value, handleChange }) {


  const useStyles = makeStyles((theme) => ({
    root: {
      tabPanel: {
        backgroundColor: "rgba(1,1,1,0.1)",
      }
    }}));

const classes = useStyles();

  return (
    <>
        <Tabs
          value={value}
          classNames={classes.root}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
        >
          <Tab label="Chat" />
          <Tab label="Playlist" />
          <Tab label="Search" />
          <Tab label="Users" />
        </Tabs>
    </>
  );
}
