import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import {Container} from '@material-ui/core'; // this must be imported last
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import SubscriptionsOutlinedIcon from '@material-ui/icons/SubscriptionsOutlined';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ScreenShareIcon from '@material-ui/icons/ScreenShare';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CssBaseline from '@material-ui/core/CssBaseline';
import './Home.css';

export default function Home() {
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const [openType, setOpenType] = useState("");

  const history = useHistory();

  const ID = function () {   
    return '_' + Math.random().toString(36).substr(2, 9); 
  };

  const handleClick = (type) => {
    if (type === 'create') {
      setUrl(ID());
      setOpenType('create');
    } else if (type === 'join') {
      setOpenType('join');
    }
  };

  const handleClose = () => {
    setUrl('');
    setName('');
    setOpenType('');
  }

  const handleSubmit = () => {
    history.push(`/room?name=${name}&url=${url}`);
    handleClose();
  }

  // front page grid styling
  const useStyles = makeStyles(theme => ({
    root: {
      padding: theme.spacing(12, 4),
      },
    card: {
      height: '100%',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      border: '0px solid black',
      borderRadius: '5px',
      textAlign: 'center',
      backgroundColor: 'rgba(0,0,0,0.8)',
      color: 'white',
    },
    title: {
      padding: theme.spacing(2),
    },
    featureList: {
      padding: theme.spacing(2),
    },
    Button: {
      size: 'large',
    },
    icon: {
      padding: theme.spacing(2,0),
      size: 'large',
      color: '#fff',
    },
    input: {
      fontSize: '20px',
    },
    mainButton: {
      fontSize: '24px',
      color: 'white',
    }
  }));

  // dialog pop up boxes set to dark mode
  const darkTheme = createTheme({
    palette: {
      type: 'dark',
    },
  });

  const classes = useStyles();

  return (
    <>

    {/* video background */}
    <div id="frontPageContainer">
    <div class="video-background">
      <div class="video-foreground">
        <iframe title="intentionally_blank" aria-hidden="true" src="https://www.youtube.com/embed/NUKKzdVy0EI?controls=0&showinfo=0&rel=0&autoplay=1&loop=1&playlist=NUKKzdVy0EI&mute=1" allow='autoplay' volume='0' frameborder="0" allowfullscreen/>
      </div>
    </div>

    {/* front page grid */}

    <div id="frontPageBody">

      <div className="pageTitle">
        <h1>
          Join your friends around the campfire.  
        </h1>
      </div>

      <Container component="section" maxWidth="lg" className={classes.root}>
        <Grid container spacing={3} alignItems="stretch">
          <Grid item xs={12} sm={4}>
            <div className={classes.card}>
              <Typography variant="h4" component="h4" className={classes.title}>
                Start a room
              </Typography>
              <ScreenShareIcon style={{ fontSize: 80 }} className={classes.icon}/>
              <Typography className={classes.featureList}>
                Create a new campfire for you and your friends, then share the link
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} sm={4}>
            <div className={classes.card}>
              <Typography variant="h4" component="h4" className={classes.title}>
              Curate
              </Typography>
              <SubscriptionsOutlinedIcon style={{ fontSize: 80 }} />
              <Typography className={classes.featureList}>
              Add videos to your playlist and start watching
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} sm={4}>
            <div className={classes.card}>
              <Typography variant="h4" component="h4" className={classes.title}>
                Stay warm
              </Typography>
              <FavoriteIcon style={{ fontSize: 80 }} />
              <Typography className={classes.featureList}>
                Enjoy while chatting with your friends
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Container>

      <ThemeProvider theme={darkTheme}> 
      <CssBaseline/>

      <div className="roomButtons">  
        {/* Create Room button */}
        <div className="create-room">
          <Button size="large" onClick={() => handleClick('create')} className={classes.mainButton}>Create room</Button>
          <Dialog open={openType === 'create'} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Create Room</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please enter your name to create your room!
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name-create"
                label="Name"
                type="text"
                name="name"
                value={name}
                onChange={event => setName(event.target.value)}
                fullWidth
                InputLabelProps={{ style: { color: 'white' } }}
              />
              <TextField
                margin="dense"
                id="url-create"
                label="Room URL"
                value={url}
                type="text"
                name="url"
                fullWidth
                InputLabelProps={{ style: { color: 'white' } }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>
                Join
              </Button>
            </DialogActions>
          </Dialog>
        </div>

        {/* Join Room button */}
        <div className="join-room">
        <Button size="large" onClick={() => handleClick('join')} className={classes.mainButton}>Join room</Button>
          <Dialog open={openType === "join"} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Join Room</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please enter your name and room url to join!
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name-join"
                label="Name"
                type="text"
                name="name"
                value={name}
                onChange={event => setName(event.target.value)}
                InputLabelProps={{ style: { color: 'white' } }}
                className={classes.input}
                fullWidth
              />
              <TextField
                margin="dense"
                id="url-join"
                label="Room URL"
                type="text"
                value={url}
                onChange={event => setUrl(event.target.value)}
                InputLabelProps={{ style: { color: 'white' } }}
                className={classes.input}
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>
                Join
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
      </ThemeProvider>
      <CssBaseline/>
      </div>
    </div>
  </>
  )
}
