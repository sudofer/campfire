import React from "react";
import Home from "../src/components/home/Home";
import Navbar from "./components/navbar/Navbar";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Route path="/">
          <Home />
        </Route>
        <Route path="/about">
          <h1>About</h1>
        </Route>
      </div>
    </Router>
  );
}

export default App;
