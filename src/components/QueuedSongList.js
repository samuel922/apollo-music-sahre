import { Avatar, IconButton, Typography, useMediaQuery } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { thumbnail } from "../thumbnail";
import { Delete } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";


const song = {
  title: "Baada Dan",
  artist: "Owino Misiani",
  avatar: thumbnail
}
const useStyles = makeStyles({
  mainContainer: {
    padding: "20px"
  },
  innerContainer: {
    display: "grid",
    gridAutoFlow: "column",
    gridTemplateColumns: "50px auto 50px",
    gridGap: 12,
    alignItems: "center"
  }
})


function QueuedSongList() {

  const theme = useTheme()
  const greaterThanMd = useMediaQuery(theme.breakpoints.up('md'));

    return greaterThanMd && (
      <div style={{ margin: "20px 0" }}>
          <Typography variant="button" component="h2">
            QUEUED(5)
          </Typography>
            {Array.from({ length: 5 }, () => song).map((song, i) => (
              <QueuedSong key={i} song={song} />
            ))}
      </div>
    );
  }

  function QueuedSong({ song }) {
    const classes = useStyles();
    const { title, artist, avatar } = song;

    return (
      <div className={classes.mainContainer}>
        <div className={classes.innerContainer}>
          <Avatar src={avatar} alt="artist avatar" />
          <div>
            <Typography variant="subtitle1" component="h3" color="textSecondary">
              {title}
            </Typography>
            <Typography variant="body2" component="p">
              {artist}
            </Typography>
          </div>
          <IconButton>
            <Delete color="warning" />
          </IconButton>
        </div>
      </div>
    )

  }
  
  export default QueuedSongList;
  