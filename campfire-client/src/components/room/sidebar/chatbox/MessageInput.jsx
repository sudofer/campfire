import React from "react";
import { TextField } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
// import Fab from '@material-ui/core/Fab';
// import EditIcon from '@material-ui/icons/Edit';


export default function MessageInput({ message, setMessage, sendMessage }) {

  const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    margin: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }));

  const classes = useStyles();
  return (
  <>
    <form className={classes.root} noValidate autoComplete="off">
      <TextField id="standard-basic" label="Type your message..." 
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        onKeyPress={(event) => event.key === 'Enter'? sendMessage(event) : null}
      />
      <Button className="primary" onClick={(event) => sendMessage(event)}>Send</Button>
      {/* <Fab size="small" color="primary" aria-label="edit" className={classes.margin}
        onClick={(event) => sendMessage(event)}>
          <EditIcon />
        </Fab> */}
    </form>
  </>
  );
}

