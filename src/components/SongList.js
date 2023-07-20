import { Card, CardActions, CardContent, CardMedia, CircularProgress, IconButton, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Pause, PlayArrow, Save } from "@mui/icons-material";
// import { GET_SONGS } from "../graphql/subscription";
import { GET_SONGS } from "../graphql/subscription";
import { useMutation, useSubscription } from "@apollo/client";
import { useContext, useEffect, useState } from "react";
import { SongContext } from "../App";
import { ADD_OR_REMOVE_FROM_QUEUE } from "../graphql/mutations";

const useStyles = makeStyles({
  loader: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 50
  },
  container: {
    margin: "20px"
  },
  songInfoContainer: {
    display: "flex",
    alignItems: "center"
  },
  songInfo: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
  thumbnail_image: {
    objectFit: "cover",
    width: 140,
    height: 140
  }
});

function SongList() {

  const classes = useStyles();

  const {data, loading, error} = useSubscription(GET_SONGS);

  if (loading) {
    return (
      <div className={classes.loader}>
        <CircularProgress color="primary" />
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <h3>Error Loading songs..</h3>
      </div>
    )
  }

    return (
      <div>
         {data.songs.map((song) => (
          <Song key={song.id} song={song} />
         ))}
      </div>
    );
  }

  function Song({ song }) {
    const {state, dispatch} = useContext(SongContext)
    const [currentSongPlaying, setCurrentSongPlaying] = useState(false)
    const { id } = song
    const classes = useStyles();
    const [addOrRemoveFromQueue] = useMutation(ADD_OR_REMOVE_FROM_QUEUE, {
      onCompleted: data => {
        localStorage.setItem('queue', JSON.stringify(data.addOrRemoveFromQueue));
      }
    });
    useEffect(() => {
      const isSongPlaying = state.isPlaying && id === state.song.id;
      setCurrentSongPlaying(isSongPlaying);

    }, [id, state.song.id, state.isPlaying])

    const handleTogglePlay = () => {
      dispatch({ type: "SET_SONG", payload: { song } })
      dispatch(state.isPlaying ? { type: "PAUSE_SONG" } : { type: "PLAY_SONG" })
    }

    const handleAddOrRemoveFromQueue = () => {
      addOrRemoveFromQueue({
        variables: { input: { ...song, __typename: "Song" } }
      })
    }
    const { thumbnail, title, artist } = song;
    return (
       <Card className={classes.container}>
        <div className={classes.songInfoContainer}>
          <CardMedia  image={thumbnail} className={classes.thumbnail_image} />
          <div className={classes.songInfo}>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                {title}
              </Typography>
              <Typography variant="body1" component="p" color="textSecondary">
                {artist}
              </Typography>
            </CardContent>
            <CardActions>
              <IconButton onClick={handleTogglePlay} size="small" color="primary">
                {currentSongPlaying ? <Pause /> : <PlayArrow />}
              </IconButton>
              <IconButton onClick={handleAddOrRemoveFromQueue} size="small" color="secondary">
                <Save />
              </IconButton>
            </CardActions>
          </div>
        </div>
       </Card>
    )
  }
  
  export default SongList;
  