import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";

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

  return (
    <>
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
    <Button color="primary" onClick={() => handleClick('join')}>Join room</Button>
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
