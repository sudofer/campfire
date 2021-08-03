import React from "react";
import SideBarNav from "./sidebar/SideBarNav/SideBarNav";
import {Container, Box} from '@material-ui/core'; // this must be imported last
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import youtubeSS from '.../docs/yt_image.png';

export default function Room() {
  return (
    <>
    <Container>

    {/* <ThemeProvider theme={theme}> */}
    <Box
      color="primary.main"
      bgcolor="background.paper"
      fontFamily="h6.fontFamily"
      fontSize={{ xs: 'h6.fontSize', sm: 'h4.fontSize', md: 'h3.fontSize' }}
      p={{ xs: 2, sm: 3, md: 4 }}
    >      

    <Box>
    <img src={youtubeSS} alt="youtube screenshot"/>  
    </Box> 

    <Box>
      <SideBarNav/>
    </Box>
   
    </Box>
    {/* </ThemeProvider> */}
    </Container>
    </>
  );
}
