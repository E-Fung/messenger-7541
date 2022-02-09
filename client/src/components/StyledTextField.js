import React from 'react';
import {
  Grid,
  FormControl,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  textfields: {
    width: theme.spacing(27),
    marginBottom: theme.spacing(2)
  },
  textfields__label: {
    lineHeight: theme.typography.normal,
    color: theme.palette.primary.grey,
  },
  textfields__label__shrink: {
    transform: "translate(0, 0)",
    top: theme.spacing(-1.5),
    marginLeft: theme.spacing(0.2)
  },
  [theme.breakpoints.down("md")]: {
    textfields: {
      width: theme.spacing(35)
    }
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