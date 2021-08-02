import React from "react";
import { storiesOf } from "@storybook/react";
import { muiTheme } from "storybook-addon-material-ui";
import Home from "components/home/Home";
import theme from "../src/theme";

storiesOf("Home", module)
  .addDecorator(muiTheme([theme]))
  .add("Home", () => <Home />);
