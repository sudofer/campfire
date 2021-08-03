import React from "react";
import SideBarNav from "./sidebar/SideBarNav/SideBarNav";
// import { sizing } from '@material-ui/system';
// import Container from '@material-ui/core/Container';
import './Room.css';

export default function App() {
  // const useStyles = makeStyles(theme => ({
  //   container: {
  //     height: '100%',
  //     width: '100%',
  //     display: 'flex',
  //     flexDirection: 'row',
  //     alignItems: 'flex-start',
  //     border: '1px solid black',
  //     borderRadius: '5px',
  //     textAlign: 'center',
  //   },
  //   videoPlayer: {
  //     width: '70%',
  //   },
  //   sideBarNav: {
  //     width: '30%',
  //   },
  //   img: {
  //     height: '65%',
  //     width: '65%',
  //   }
  // }));

  // const classes = useStyles();
  return (
    <>
    <div class="container">
        <div class="video-player">
          <img src="https://github.com/htkim94/campfire/blob/main/campfire-client/public/docs/yt_image.png?raw=true" alt="youtube screenshot"/>  
        </div>
        
        <div class="sideBarNav">
          <SideBarNav/>
        </div>
    </div>
    </>
    );
  }