import { HeadsetTwoTone } from "@mui/icons-material";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  title: {
    marginLeft: "8px",
  }
});


function Header() {

  const classes = useStyles();

    return (
      <AppBar color="primary" position="fixed">
        <Toolbar>
          <HeadsetTwoTone />
          <Typography className={classes.title} variant="h6" component="h1">
            Apollo Music Share
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
  
  export default Header;
  