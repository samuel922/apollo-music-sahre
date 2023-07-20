import { Button, Dialog, DialogActions, DialogContent, DialogTitle, InputAdornment, TextField } from "@mui/material";
import LinkIcon from '@mui/icons-material/Link';
import { AddBoxOutlined } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import { thumbnail } from "../thumbnail";
import { useState } from "react";

const useStyles = makeStyles({
    container: {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
      marginTop: "20px",
    },

    dialog: {
      textAlign: "center"
    },

    thumbnail: {
     width: "90%"
    }
    
})

function AddSong() {
  const [dialog, setDialog] = useState(false);

  const classes = useStyles();

  const handleCloseDialog = () => {
    setDialog(false);
  }

    return (
      <div className={classes.container}>
          <Dialog open={dialog} onClose={handleCloseDialog} className={classes.dialog}>
            <DialogTitle>
              Edit Song
            </DialogTitle>
            <DialogContent>
              <img
                src={thumbnail}
                alt="song thumbnail"
                className={classes.thumbnail}
              />
              <TextField
                variant="standard"
                fullWidth
                margin="dense"
                label="Title"
                name="title"
              />
              <TextField
                variant="standard"
                fullWidth
                margin="dense"
                label="Artist"
                name="artist"
              />
              <TextField
                variant="standard"
                margin="dense"
                fullWidth
                label="Thumbnail"
                name="thumbnail"
              />
            </DialogContent>
            <DialogActions>
              <Button variant="outlined" onClick={handleCloseDialog}>
                CANCEL
              </Button>
              <Button variant="outlined">
                ADD SONG
              </Button>
            </DialogActions>
          </Dialog>
          <TextField 
              placeholder="Add Youtube or Soundcloud url"
              fullWidth
              margin="normal"
              variant="standard"
              type="url"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                      <LinkIcon />
                  </InputAdornment>
                )
              }}
          />
          <Button
            variant="outlined"
            endIcon={<AddBoxOutlined />}
            onClick={() => setDialog(true)}
          >
            Add
          </Button>
      </div>
    );
  }
  
  export default AddSong;
  