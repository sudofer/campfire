import React from "react";
import { storiesOf } from "@storybook/react";
import { muiTheme } from "storybook-addon-material-ui";
import Home from "components/home/Home";
import theme from "../src/theme";
import SideBarNav from "../src/components/room/sidebar/SideBarNav/SideBarNav";

storiesOf("Home", module)
  .addDecorator(muiTheme([theme]))
  .add("Home", () => <Home />);

storiesOf("SideBarNav", module)
  .addDecorator(muiTheme([theme]))
  .add("SideBarNav", () => <SideBarNav />);
