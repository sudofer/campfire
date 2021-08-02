import React, { Component } from 'react';
import { io } from "socket.io-client";
import Home from "../src/components/home/Home";
import Navbar from "./components/navbar/Navbar";

import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch
} from 'react-router-dom';

class App extends Component {
  state = {users: []}

  componentDidMount() {
    fetch('http://localhost:3002/users')
      .then(res => res.json())
      .then(users => this.setState({ users }));
  
      this.socket = io ('ws://localhost:3002');
      this.socket.on('joinedRoom', () => {
        console.log("successfully joined room")
      })

    //   this.socket.onmessage = event => {
    //   const data = JSON.parse(event.data);
    //     console.log("this is my data:", data)
    // };
  
    }

    ID = function () {   
      // Math.random should be unique because of its seeding algorithm.   
      // Convert it to base 36 (numbers + letters), and grab the first 9 characters   // after the decimal.   
      return '_' + Math.random().toString(36).substr(2, 9); 
    };

  render() {
    console.log(`${JSON.stringify(this.state)}`)
    return (
      <>
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
      <div className="App">
        <h1>Users</h1>
        {this.state.users.map(user =>
          <div key={user.id}>{user.username}</div>
        )}
      </div>

      <button onClick={() => {
        const roomID = this.ID();
        console.log(roomID)
        this.socket.emit("createRoom", {roomID})

      }}>Create room</button>


      </>
    );
  }
}

export default App;
