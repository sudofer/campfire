import React from "react";
import Home from "../src/components/home/Home";
import Navbar from "./components/navbar/Navbar";
import SideBarNav from "./components/room/sidebar/SideBarNav/SideBarNav";

import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/about">
          <SideBarNav />
        </Route>
      </div>
    </Router>
  );
}
