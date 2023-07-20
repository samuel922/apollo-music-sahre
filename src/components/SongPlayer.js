import { Card, CardActions, CardContent, CardMedia, IconButton, Slider, Typography } from "@mui/material";
import QueuedSongList from "./QueuedSongList";
import {makeStyles} from "@mui/styles";
import { Pause, PlayArrow, SkipNext, SkipPrevious } from "@mui/icons-material";
import { useContext, useEffect, useRef, useState } from "react";
import { SongContext } from "../App";
import { useQuery } from "@apollo/client";
import { GET_QUEUED_SONGS } from "../graphql/queries";
import ReactPlayer from "react-player";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    justifyContent: "space-between",
    borderRadius: "16px"
  },
  details: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "0 20px"
  },
  slider: {
    width: "100%"
  },
  play: {
    width: 48,
    height: 48
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1)
  },
  thumbnail: {
    width: 200,
  }
}))


function SongPlayer() {

  const { data } = useQuery(GET_QUEUED_SONGS);

  const { state, dispatch } = useContext(SongContext);

  const [played, setPlayed] = useState(0);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [positionInQueue, setPostionInQueue] = useState(0)
  const reactPlayerRef = useRef();

  const [seeking, setSeeking] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    const songIndex = data.queue.findIndex(song => song.id === state.song.id)
    setPostionInQueue(songIndex)
  }, [state.song.id, data.queue])

  useEffect(() => {
    const nextSong = data.queue[positionInQueue + 1];

    if (played >= 0.99 && nextSong) {
      setPlayed(0)
      dispatch({ type: "SET_SONG", payload: { song: nextSong } })
    }
  }, [data.queue, played, dispatch, positionInQueue])

  const handleTogglePlay = () => {
    dispatch(state.isPlaying ? { type: "PAUSE_SONG" } : { type: "PLAY_SONG" })
  }

  const handleProgressChange = (event, newValue) => {
    setPlayed(newValue)
  }

  const handleSeekMouseDown = () => {
    setSeeking(true)
  }

  const handleSeekMouseUp = () => {
    setSeeking(false)
    reactPlayerRef.current.seekTo(played);
  }

  const formatDuration = (seconds) => {
      return new Date(seconds * 1000).toISOString().substr(11, 8)
  }

  const handlePlayNextSong = () => {
    const nextSong = data.queue[positionInQueue + 1];
    if (nextSong) {
      dispatch({ type: "SET_SONG", payload: { song: nextSong } })
    }
  }

  const handlePlayPreviousSong = () => {
    const previousSong = data.queue[positionInQueue - 1];
    if (previousSong) {
      dispatch({ type: "SET_SONG", payload: { song: previousSong } })
    }
  }



    return (
      <>
        <Card className={classes.container}>
        <div className={classes.details}>
          <CardContent>
            <Typography variant="h6" component="h2">
              {state?.song?.title}
            </Typography>
            <Typography variant="subtitle1" component="h3">
              {state?.song?.artist}
            </Typography>
          </CardContent>
          <CardActions className={classes.controls}>
            <IconButton onClick={handlePlayPreviousSong} size="small">
              <SkipPrevious />
            </IconButton>
            <IconButton onClick={handleTogglePlay} >
              {state.isPlaying ? <Pause className={classes.play} /> : <PlayArrow className={classes.play} />}
            </IconButton>
            <IconButton onClick={handlePlayNextSong} size="small">
              <SkipNext />
            </IconButton>
            <Typography variant="subtitle1" component="p" color="textSecondary">
              {formatDuration(playedSeconds)}
            </Typography>
          </CardActions>
          <Slider 
            onChange={handleProgressChange} 
            onMouseDown={handleSeekMouseDown}
            onMouseUp={handleSeekMouseUp}
            type="range" 
            value={played} 
            min={0} 
            max={1} 
            step={0.01} 
            className={classes.slider} 
          />
        </div>
        <ReactPlayer 
          onProgress={({ played, playedSeconds }) => {
              if (!seeking) {
                setPlayed(played)
                setPlayedSeconds(playedSeconds)
              } 
          }}
          hidden url={state.song.url} 
          playing={state.isPlaying} 
          ref={reactPlayerRef}
        />
        <CardMedia image={state?.song?.thumbnail} className={classes.thumbnail} />
      </Card>
      <QueuedSongList queue={data?.queue} />
      </>
    );
  }
  
  export default SongPlayer;
  