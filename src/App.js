import Header from "./components/Header";
import AddSong from "./components/AddSong";
import SongList from "./components/SongList";
import SongPlayer from "./components/SongPlayer";
import songReducer from "./reducer";
import { Grid, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { createContext, useContext, useReducer } from "react";

export const SongContext = createContext({
  song: {
    id: "7cdd942c-0c66-45df-aae0-92f408c0231b",
    title: "Justin Bieber X Free Fire - Beautiful Love (Free Fire) [Official Video]",
    artist: "Justin Beiber",
    thumbnail: "http://img.youtube.com/vi/_lpSCOZ1PCo/0.jpg",
    url: "https://www.youtube.com/watch?v=_lpSCOZ1PCo&pp=ygUNanVzdGluIGJpZWJlcg%3D%3D",
    duration: 213
  },
  isPlaying: false
})



function App() {
  const initialSongState = useContext(SongContext)

  // console.log(initialSongState)

  const [ state, dispatch ] = useReducer(songReducer, initialSongState)

  const theme = useTheme()
  const greaterThanSm = useMediaQuery(theme.breakpoints.up('sm'));
  const greaterThanMd = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <SongContext.Provider value={ { state, dispatch } }>
      {greaterThanSm && <Header />}
      <Grid container spacing={3}>
        <Grid style={{ paddingTop: greaterThanSm ? "80px" : "10px" }} item xs={12} md={7}>
          <AddSong />
          <SongList />
        </Grid>

        <Grid item xs={12} md={5} style={
          greaterThanMd ? {
          position: "fixed",
          width: "100%",
          right: 20,
          top: 70
        } : {
          position: "fixed",
          left: 0,
          bottom: 0,
          width: "100%"
        }}>
          <SongPlayer />
        </Grid>
        
      </Grid>
    </SongContext.Provider>
  );
}

export default App;
