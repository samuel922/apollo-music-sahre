import { Card, CardActions, CardContent, CardMedia, IconButton, Slider, Typography } from "@mui/material";
import QueuedSongList from "./QueuedSongList";
import { thumbnail } from "../thumbnail";
import {makeStyles} from "@mui/styles";
import { PlayArrow, SkipNext, SkipPrevious } from "@mui/icons-material";

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

  const classes = useStyles();

    return (
      <>
        <Card className={classes.container}>
        <div className={classes.details}>
          <CardContent>
            <Typography variant="h6" component="h2">
              Amilo Nyar Nyakach
            </Typography>
            <Typography variant="subtitle1" component="h3">
              Emma Jalamo
            </Typography>
          </CardContent>
          <CardActions className={classes.controls}>
            <IconButton size="small">
              <SkipPrevious />
            </IconButton>
            <IconButton >
              <PlayArrow className={classes.play} />
            </IconButton>
            <IconButton size="small">
              <SkipNext />
            </IconButton>
            <Typography variant="subtitle1" component="p" color="textSecondary">
              00:01:30
            </Typography>
          </CardActions>
          <Slider type="range" min={0} max={1} step={0.01} className={classes.slider} />
        </div>
        <CardMedia image={thumbnail} className={classes.thumbnail} />
      </Card>
      <QueuedSongList />
      </>
    );
  }
  
  export default SongPlayer;
  