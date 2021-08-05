import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import {Container} from '@material-ui/core'; // this must be imported last
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import './Home.css';
import theme from "../../theme";

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
      border: '1px solid black',
      borderRadius: '5px',
      textAlign: 'center',
    },
    icon: {
      padding: theme.spacing(2, 0),
    },
    title: {
      padding: theme.spacing(2),
    },
    featureList: {
      padding: theme.spacing(2),
    },
  }));

  const classes = useStyles();

  return (
    <>

    <div class="video-background">
      <div class="video-foreground">
        <iframe title="intentionally_blank" aria-hidden="true" src="https://www.youtube.com/embed/NUKKzdVy0EI?controls=0&showinfo=0&rel=0&autoplay=1&loop=1&playlist=NUKKzdVy0EI&mute=1" allow='autoplay' volume='0' frameborder="0" allowfullscreen/>
      </div>
    </div>

    {/* front page grid */}

    <div>
      Join your friends around the campfire
      
    </div>
    <Container component="section" maxWidth="lg" className={classes.root}>
      <Grid container spacing={3} alignItems="stretch">
        <Grid item xs={12} sm={4}>
          <div className={classes.card}>
            {/* <EmojiPeopleIcon
              color="primary"
              fontSize="large"
              className={classes.icon}
            /> */}
            <Typography variant="h5" component="h3" className={classes.title}>
              blahblahblah
            </Typography>
            <Typography className={classes.featureList}>
              lorem ipsum something something
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12} sm={4}>
          <div className={classes.card}>
            {/* <FastfoodIcon
              color="primary"
              fontSize="large"
              className={classes.icon}
            /> */}
            <Typography variant="h5" component="h3" className={classes.title}>
            blahblahblah
            </Typography>
            <Typography className={classes.featureList}>
            lorem ipsum something something
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12} sm={4}>
          <div className={classes.card}>
            {/* <LocationCityIcon
              color="primary"
              fontSize="large"
              className={classes.icon}
            /> */}
            <Typography variant="h5" component="h3" className={classes.title}>
              blahblahblah
            </Typography>
            <Typography className={classes.featureList}>
            lorem ipsum something something
            </Typography>
          </div>
        </Grid>
      </Grid>
    </Container>


    {/* Create Room button */}
    <div className="create-room">
      <Button color="secondary" onClick={() => handleClick('create')}>Create room</Button>
      <Dialog open={openType === 'create'} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create Room</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter your name and click join!
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
          />
          <TextField
            autoFocus
            margin="dense"
            id="url-create"
            label="Url"
            value={url}
            type="text"
            name="url"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Join
          </Button>
        </DialogActions>
      </Dialog>
    </div>

    {/* Join Room button */}
    <div className="join-room">
    <Button color="secondary" onClick={() => handleClick('join')}>Join room</Button>
      <Dialog open={openType === "join"} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Join Room</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter your name/url and click join!
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
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="url-join"
            label="Url"
            type="text"
            value={url}
            onChange={event => setUrl(event.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Join
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  </>
  )
}
