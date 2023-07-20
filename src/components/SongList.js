import { Card, CardActions, CardContent, CardMedia, CircularProgress, IconButton, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { PlayArrow, Save } from "@mui/icons-material";
import { GET_SONGS } from "../graphql/queries";
import { useQuery } from "@apollo/client";

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

  const {data, loading, error} = useQuery(GET_SONGS);

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
  