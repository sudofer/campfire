import React from "react";
import { Paper, Tabs, Tab, TabContext } from "@material-ui/core";
export default function SideBarNav({ onSideBarChange }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    onSideBarChange(newValue);
  };

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
