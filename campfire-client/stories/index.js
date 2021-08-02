import React from "react";
import { storiesOf } from "@storybook/react";
import Home from "components/home/Home";

storiesOf("Home", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }],
  })
  .add("Home", () => <Home />);
