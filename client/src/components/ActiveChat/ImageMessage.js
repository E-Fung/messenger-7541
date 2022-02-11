import React from 'react';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  imageMessage: {
    maxHeight: theme.spacing(4),
    borderRadius: "10px",
    margin: "0 0.1rem 0 0.1rem"
  }
}));

const ImageMessage = (props)=>{
  const classes = useStyles();

  return(
    <img className={classes.imageMessage} src={props.attachment} alt="" />
  )
}

export default ImageMessage