import { Button, Dialog, DialogActions, DialogContent, DialogTitle, InputAdornment, TextField } from "@mui/material";
import LinkIcon from '@mui/icons-material/Link';
import { AddBoxOutlined } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
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
                src="data:image/jpeg;base64,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"
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
  