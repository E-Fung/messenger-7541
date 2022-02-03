import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  Hidden
} from "@material-ui/core";
import { login } from "./store/utils/thunkCreators";
import { makeStyles } from '@material-ui/core/styles';
import bg_img from './assets/bg_img.png';
import chat from './assets/chat.png';

const useStyles = makeStyles((theme) => ({
  root: {
    flexWrap: 'nowrap',
  },
  leftMedia: {
    position: 'relative',
    height: '100vh',
  },
  leftMedia__img: {
    position: 'relative',
    zIndex: 10,
  },
  leftMedia__bg: {
    backgroundColor: 'rgba(134,185,255)',
    top: '0',
    position: 'absolute',
    height: '100vh',
    width: '100%',
  },
  leftMedia__gradient: {
    height: '100%',
    background: 'linear-gradient(#3A8DFF,#86B9FF)',
    position: 'absolute',
    opacity: '85%',
    top: '0',
    zIndex: 100,
  },
  leftMedia__gradient__textCon:{
    marginTop: "2.5rem",
    marginBottom:"8.5rem"
  },
  leftMedia__gradient__textCon__text: {
    color: "white",
    fontSize: "1.857142857rem",
    lineHeight: "2.858rem",
    letterSpacing: "-0.00075rem"
  }
}));

const Login = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const { user, login } = props;

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid container>
      <Box className={classes.leftMedia}>
        <Hidden smDown>
          <img src={bg_img} alt="" className={classes.leftMedia__img} />
          <Grid item className={classes.leftMedia__bg} />
          <Grid item container alignContent="center" className={classes.leftMedia__gradient}>
                <Grid container justifyContent='center'>
                  <img src={chat} alt="" />
                </Grid>
                <Grid container justifyContent='center' className={classes.leftMedia__gradient__textCon}>
                  <Typography className={classes.leftMedia__gradient__textCon__text}>
                    Converse with anyone
                  </Typography>
                  <Typography className={classes.leftMedia__gradient__textCon__text}>
                    with any language
                  </Typography>
                </Grid>
          </Grid>
        </Hidden>
      </Box>
      <Box>
        <Grid container item>
          <Typography>Need to register?</Typography>
          <Button onClick={() => history.push("/register")}>Register</Button>
        </Grid>
        <form onSubmit={handleLogin}>
          <Grid>
            <Grid>
              <FormControl margin="normal" required>
                <TextField
                  aria-label="username"
                  label="Username"
                  name="username"
                  type="text"
                />
              </FormControl>
            </Grid>
            <FormControl margin="normal" required>
              <TextField
                label="password"
                aria-label="password"
                type="password"
                name="password"
              />
            </FormControl>
            <Grid>
              <Button type="submit" variant="contained" size="large">
                Login
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
