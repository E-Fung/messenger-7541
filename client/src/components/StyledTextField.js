import React from 'react';
import {
  Grid,
  FormControl,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  textfields: {
    width: "27rem",
    marginBottom: "2rem"
  },
  textfields__label: {
    lineHeight: "normal",
    color: "#B0B0B0",
  },
  textfields__label__shrink: {
    transform: "translate(0, 0)",
    top: "-1.5rem"
  },
}));

const StyledTextField = (props)=>{
  const classes = useStyles();

  return(
    <Grid>
      <FormControl margin="normal" required>
        <TextField 
          label={props.label}
          aria-label={props.aria_label}
          type={props.type}
          name={props.name}
          InputProps={props.InputProps}
          InputLabelProps={{
            className:classes.textfields__label, 
            classes:{shrink:classes.textfields__label__shrink}
          }} 
          className={classes.textfields} 
        />
      </FormControl>
    </Grid>
  )
}

export default StyledTextField