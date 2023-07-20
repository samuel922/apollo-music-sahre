import { Card, CardActions, CardContent, CardMedia, CircularProgress, IconButton, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { thumbnail  } from "../thumbnail";
import { PlayArrow, Save } from "@mui/icons-material";

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

  const song = {
    title: "Kwach Ogolo Koke",
    artist: "Prince Indah",
    thumbnail: thumbnail,

  }

  const loading = false

  if (loading) {
    return (
      <div className={classes.loader}>
        <CircularProgress color="primary" />
      </div>
    )
  }

    return (
      <div>
         {Array.from({ length: 10 }, () => song).map((song, i) => (
          <Song key={i} song={song} />
         ))}
      </div>
    );
  }

  function Song({ song }) {
    const classes = useStyles();
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
              <IconButton size="small" color="primary">
                <PlayArrow />
              </IconButton>
              <IconButton size="small" color="secondary">
                <Save />
              </IconButton>
            </CardActions>
          </div>
        </div>
       </Card>
    )
  }
  
  export default SongList;
  