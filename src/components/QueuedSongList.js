import { Avatar, IconButton, Typography, useMediaQuery } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Delete } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { useMutation } from "@apollo/client";
import { ADD_OR_REMOVE_FROM_QUEUE } from "../graphql/mutations";

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


function QueuedSongList({ queue }) {

  const theme = useTheme()
  const greaterThanMd = useMediaQuery(theme.breakpoints.up('md'));

    return greaterThanMd && (
      <div style={{ margin: "20px 0" }}>
          <Typography variant="button" component="h2">
            QUEUED({queue.length})
          </Typography>
            {queue.map((song) => (
              <QueuedSong key={song.id} song={song} />
            ))}
      </div>
    );
  }

  function QueuedSong({ song }) {
    const classes = useStyles();
    const { title, artist, thumbnail } = song;

    const [addOrRemoveFromQueue] = useMutation(ADD_OR_REMOVE_FROM_QUEUE, {
      onCompleted: data => {
        localStorage.setItem('queue', JSON.stringify(data.addOrRemoveFromQueue))
      }
    });

    const handleAddOrRemoveFromQueue = () => {
      addOrRemoveFromQueue({
        variables: { input: { ...song, __typename: "Song" } }
      })
    }

    return (
      <div className={classes.mainContainer}>
        <div className={classes.innerContainer}>
          <Avatar src={thumbnail} alt="artist avatar" />
          <div>
            <Typography variant="subtitle1" component="h3" color="textSecondary">
              {title}
            </Typography>
            <Typography variant="body2" component="p">
              {artist}
            </Typography>
          </div>
          <IconButton onClick={handleAddOrRemoveFromQueue}>
            <Delete color="warning" />
          </IconButton>
        </div>
      </div>
    )

  }
  
  export default QueuedSongList;
  