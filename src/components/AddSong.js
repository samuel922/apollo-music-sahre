import { Button, Dialog, DialogActions, DialogContent, DialogTitle, InputAdornment, TextField } from "@mui/material";
import LinkIcon from '@mui/icons-material/Link';
import { AddBoxOutlined } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import SoundCloudPlayer from "react-player/soundcloud";
import YouTubePlayer from "react-player/youtube";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { ADD_SONG } from "../graphql/mutations";
import { useMutation } from "@apollo/client";

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
  const DEFAULT_SONG = {
    title: "",
    artist: "",
    thumbnail: "",
    duration: 0
  }
  const [dialog, setDialog] = useState(false);
  const [url, setUrl] = useState("")
  const [playable, setPlayable] = useState(false);
  const [song, setSong] = useState(DEFAULT_SONG)

  const [addSong, { error }] = useMutation(ADD_SONG)

  useEffect(() => {
    const isPlayable = SoundCloudPlayer.canPlay(url) || YouTubePlayer.canPlay(url)

    setPlayable(isPlayable);
  }, [url])

  const classes = useStyles();

  const handleCloseDialog = () => {
    setDialog(false);
  }

  const handleChangeSong = (e) => {
    const { name, value } = e.target;

    setSong(prevSong => ({
      ...prevSong,
      [name]: value
    }));
  }

  const handleEditSong = async ({ player }) => {
    const nestedPlayer = player.player.player;

    let songData;
    if(nestedPlayer.getVideoData) {
      songData = getYoutubeInfo(nestedPlayer)
    } else if (nestedPlayer.getCurrentSound) {
      songData = await getSoundCloudInfo(nestedPlayer);
    }

    setSong({...songData, url})

  }

  const handleAddSong = async () => {
    try{
      const {title, artist, thumbnail, url, duration} = song;
      await addSong({
        variables: {
            title: title.length > 0 ? title : null,
            artist: artist.length > 0 ? artist : null,
            thumbnail: thumbnail.length > 0 ? thumbnail : null,
            duration : duration > 0 ? duration : null,
            url: url.length > 0 ? url : null
        }
      })
      handleCloseDialog();
      setSong(DEFAULT_SONG);
      setUrl('');
    } catch(error) {
      console.error("Error editing Song", error)
    }
    
  }

  const getYoutubeInfo = (player) => {
      const duration = player.getDuration()
      const {title, video_id, author} = player.getVideoData();
      const thumbnail = `http://img.youtube.com/vi/${video_id}/0.jpg`;
      return {
        title,
        artist: author,
        thumbnail,
        duration
      }
  }

  const getSoundCloudInfo = (player) => {
    return new Promise(resolve => {
      player.getCurrentSound((songData) => {
        if (songData) {
          resolve ({
            duration: Number(songData.duration/1000),
            title: songData.title,
            artist: songData.user.username,
            thumbnail: songData.artwork_url.replace('-large', '-t500x500')
          });
        }
      })
    })
   
  }

  function handleError(field) {
    return error && error.graphQLErrors[0].extensions.path.includes(field);
  }

  const {thumbnail, title, artist} = song;

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
                onChange={handleChangeSong}
                fullWidth
                margin="dense"
                label="Title"
                name="title"
                value={title}
                error={handleError('title')}
                helperText={handleError('title') && "Fill out filed"}
              />
              <TextField
                variant="standard"
                onChange={handleChangeSong}
                fullWidth
                margin="dense"
                label="Artist"
                name="artist"
                value={artist}
                error={handleError('artist')}
                helperText={handleError('artist') && "Fill out filed"}
              />
              <TextField
                variant="standard"
                onChange={handleChangeSong}
                margin="dense"
                fullWidth
                label="Thumbnail"
                name="thumbnail"
                value={thumbnail}
                error={handleError('thumbnail')}
                helperText={handleError('thumbnail') && "Fill out filed"}
              />
            </DialogContent>
            <DialogActions>
              <Button variant="outlined" onClick={handleCloseDialog}>
                CANCEL
              </Button>
              <Button onClick={handleAddSong} variant="outlined">
                ADD SONG
              </Button>
            </DialogActions>
          </Dialog>
          <TextField 
              placeholder="Add Youtube or Soundcloud url"
              onChange={(e) => setUrl(e.target.value)}
              value={url}
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
            disabled={!playable}
            endIcon={<AddBoxOutlined />}
            onClick={() => setDialog(true)}
          >
            Add
          </Button>
          <ReactPlayer url={url} hidden onReady={handleEditSong} />
      </div>
    );
  }
  
  export default AddSong;
  