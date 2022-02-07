import React from 'react';
import {
  Grid,
  Typography,
  Hidden
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import bg_img from "../assets/bg_img.png";
import chat from "../assets/chat.png";

const useStyles = makeStyles((theme) => ({
  mediaBox: {
    position: "relative",
    height: "100vh",
  },
  mediaBox__img: {
    position: "relative",
    zIndex: 10,
    maxHeight: "100vh"
  },
  mediaBox__bg: {
    backgroundColor: `${theme.palette.primary.dark}`,
    top: "0",
    position: "absolute",
    height: "100vh",
    width: "100%",
  },
  mediaBox__gradient: {
    height: "100%",
    background: `linear-gradient(${theme.palette.primary.main},${theme.palette.primary.dark})`,
    position: "absolute",
    opacity: "85%",
    top: "0",
    zIndex: 100,
    alignContent: "center"
  },
  mediaBox__gradient__imgBox: {
    justifyContent: "center",
  },
  mediaBox__gradient__textBox:{
    marginTop: theme.spacing(2.5), 
    marginBottom: theme.spacing(8.5),
    justifyContent: "center"
  },
  mediaBox__gradient__textBox__text: {
    color: theme.palette.primary.white,
    textAlign: "center",
    fontWeight: "400"
  },
}));

const LeftMedia = (props)=>{
  const classes = useStyles();

  return(
    <Grid item className={classes.mediaBox}>
      <Hidden smDown>
        <img src={bg_img} alt="" className={classes.mediaBox__img} />
        <Grid item className={classes.mediaBox__bg} />
        <Grid item container className={classes.mediaBox__gradient}>
          <Grid container className={classes.mediaBox__gradient__imgBox}>
            <img src={chat} alt="" />
          </Grid>
          <Grid container className={classes.mediaBox__gradient__textBox}>
            <Typography variant="h2" className={classes.mediaBox__gradient__textBox__text}>
              Converse with anyone
            </Typography>
            <Typography variant="h2" className={classes.mediaBox__gradient__textBox__text}>
              with any language
            </Typography>
          </Grid>
        </Grid>
      </Hidden>
    </Grid>
  )
}

export default LeftMedia