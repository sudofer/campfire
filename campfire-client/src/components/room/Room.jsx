import React from "react";
import SideBarNav from "./sidebar/SideBarNav/SideBarNav";
import './Room.css';

export default function Room() {

  return (
    <>
    <div className="container">
        <div className="video-player">
          <img src="https://github.com/htkim94/campfire/blob/main/campfire-client/public/docs/yt_image.png?raw=true" alt="youtube screenshot"/>  
        </div>
        
        <div className="sideBarNav">
          <SideBarNav/>
        </div>
    </div>
    </>
    );
  }