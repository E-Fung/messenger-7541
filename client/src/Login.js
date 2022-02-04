import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Typography,
  Button,
  FormControl,
  TextField,
  Hidden
} from "@material-ui/core";
import { login } from "./store/utils/thunkCreators";
import { makeStyles } from "@material-ui/core/styles";
import bg_img from "./assets/bg_img.png";
import chat from "./assets/chat.png";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    flexWrap : "nowrap"
  },
  leftMedia: {
    position: "relative",
    height: "100vh",
  },
  leftMedia__img: {
    position: "relative",
    zIndex: 10,
  },
  leftMedia__bg: {
    backgroundColor: "rgba(134,185,255)",
    top: "0",
    position: "absolute",
    height: "100vh",
    width: "100%",
  },
  leftMedia__gradient: {
    height: "100%",
    background: "linear-gradient(#3A8DFF,#86B9FF)",
    position: "absolute",
    opacity: "85%",
    top: "0",
    zIndex: 100,
    alignContent: "center"
  },
  leftMedia__gradient__img: {
    justifyContent:"center"
  },
  leftMedia__gradient__textCon:{
    marginTop: "2.5rem",
    marginBottom:"8.5rem",
    justifyContent: "center"
  },
  leftMedia__gradient__textCon__text: {
    color: "white",
    fontSize: "1.857142857rem",
    lineHeight: "2.858rem",
    letterSpacing: "-0.00075rem"
  },
  form: {
    height: "100vh",
    alignContent: "center",
    flexDirection: "column",
    flexGrow: "1"
  },
  form__topbar: {
    padding: '2rem 3rem',
    justifyContent:"flex-end",
  }, 
  form__topbar__question: {
    alignSelf: 'center',
    color: 'grey',
    lineHeight: "normal",
    padding: "1.25rem 2.4rem"
  },
  form__topbar__button: {
    boxShadow: "0px 2px 12px 0px rgba(74, 106, 149,0.2)",
    padding: "1.25rem 2.4rem"
  },
  form__topbar__button__label: {
    fontSize:"1rem",
    fontWeight: "600",
    lineHeight: "normal",
  },
  form__form: {
    flexGrow: 3,
    alignContent: "center",
    justifyContent: "center"
  },
  form__form__welcome: {
    fontSize: "26px",
    fontWeight: "600",
    marginBottom: "2rem"
  },
  form__form__textfields: {
    width: "27rem",
    marginBottom: "2rem"
  },
  form__form__textfields__label: {
    top: "-1rem"
  },
  form__form__butCon__login: {
    backgroundColor: "#3A8DFF",
    color: "white",
    fontSize:"1rem",
    fontWeight: "600",
    lineHeight: "normal",
    padding: "1.3rem 4.4rem",
    marginTop: "1rem",
    marginBottom: "7rem"
  },
  form__form__butCon:{
    justifyContent: "center"
  },
  form__form__textfields__forgot: {
    color:"#3A8DFF", 
    fontSize:"0.86rem",
    fontWeight:"600", 
    cursor:"pointer"
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
    <Grid container className={classes.root}>
      <Grid item className={classes.leftMedia}>
        <Hidden smDown>
          <img src={bg_img} alt="" className={classes.leftMedia__img} />
          <Grid item className={classes.leftMedia__bg} />
          <Grid item container className={classes.leftMedia__gradient}>
            <Grid container className={classes.leftMedia__gradient__img}>
              <img src={chat} alt="" />
            </Grid>
            <Grid container className={classes.leftMedia__gradient__textCon}>
              <Typography className={classes.leftMedia__gradient__textCon__text}>
                Converse with anyone
              </Typography>
              <Typography className={classes.leftMedia__gradient__textCon__text}>
                with any language
              </Typography>
            </Grid>
          </Grid>
        </Hidden>
      </Grid>
      <Grid item container className={classes.form}>
        <Grid container item  className={classes.form__topbar}>
          <Typography className={classes.form__topbar__question}>Don't have an account?</Typography>
          <Button 
            color="primary" 
            onClick={() => history.push("/register")} 
            classes={{textPrimary: classes.form__topbar__button, label:classes.form__topbar__button__label}}>
            Create Account
          </Button>
        </Grid>
        <Grid container item className={classes.form__form}>
          <form onSubmit={handleLogin}>
            <Typography className={classes.form__form__welcome}>Welcome back!</Typography>
            <Grid>
              <FormControl margin="normal" required>
                <TextField 
                  aria-label="username" 
                  label="Username" 
                  name="username" 
                  type="text" 
                  InputLabelProps={{className:classes.form__form__textfields__label}} 
                  className={classes.form__form__textfields} 
                />
              </FormControl>
            </Grid>
            <Grid>
              <FormControl margin="normal" required>
                <TextField 
                  label="Password" 
                  aria-label="password" 
                  type="password" 
                  name="password" 
                  InputLabelProps={{className:classes.form__form__textfields__label}} 
                  InputProps={{endAdornment:<Typography className={classes.form__form__textfields__forgot}>Forgot?</Typography>}} 
                  className={classes.form__form__textfields} 
                />
              </FormControl>
            </Grid>
            <Grid container className={classes.form__form__butCon}>
              <Button type="submit" className={classes.form__form__butCon__login}>
                Login
              </Button>
            </Grid>
          </form>
        </Grid>
      </Grid>
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
