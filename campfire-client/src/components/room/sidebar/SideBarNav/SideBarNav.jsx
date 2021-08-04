import React from "react";
import { Paper, Tabs, Tab } from "@material-ui/core";
export default function SideBarNav({ value, handleChange }) {

  return (
    <>
      <Paper square>
        <Tabs
          value={value}
          indicatorColor="secondary"
          textColor="secondary"
          onChange={handleChange}
        >
          <Tab label="Chat" />
          <Tab label="Playlist" />
          <Tab label="Search" />
        </Tabs>
      </Paper>
    </>
  );
}
