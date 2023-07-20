import Header from "./components/Header";
import AddSong from "./components/AddSong";
import SongList from "./components/SongList";
import SongPlayer from "./components/SongPlayer";

import { Grid, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";


function App() {

  const theme = useTheme()
  const greaterThanSm = useMediaQuery(theme.breakpoints.up('sm'));
  const greaterThanMd = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <>
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
    </>
  );
}

export default App;
