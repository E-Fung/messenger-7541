import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Typography,
  Button
} from "@material-ui/core";
import { login } from "./store/utils/thunkCreators";
import { makeStyles } from "@material-ui/core/styles";
import { LeftMedia, StyledTextField } from './components';

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    flexWrap : "nowrap"
  },
  formBox: {
    height: "100vh",
    alignContent: "center",
    flexDirection: "column",
    flexGrow: "1",
    flexWrap: "nowrap",
  },
  formBox__topbar: {
    padding: "2rem 3rem",
    justifyContent: "flex-end",
  }, 
  formBox__topbar__question: {
    alignSelf: "center",
    color: "grey",
    lineHeight: "normal",
    padding: "1.25rem 2.4rem"
  },
  formBox__topbar__button: {
    boxShadow: "0px 2px 12px 0px rgba(74, 106, 149, 0.2)",
    padding: "1.25rem 2.4rem",
    borderRadius: "5px"
  },
  formBox__topbar__label: {
    fontSize:"1rem",
    fontWeight: "600",
    lineHeight: "normal",
  },
  formBox__form: {
    flexGrow: 3,
    alignContent: "center",
    justifyContent: "center",
  },
  formBox__formShift: {
    transform: "translate(0,-3rem)"
  },
  formBox__form__welcome: {
    fontSize: "1.86rem",
    fontWeight: "600",
    marginBottom: "2rem"
  },
  formBox__form__textfields__forgot: {
    color: `${theme.palette.primary.main}`, 
    fontSize: "0.86rem",
    fontWeight: "600", 
    cursor: "pointer"
  },
  formBox__form__butBox:{
    justifyContent: "center"
  },
  formBox__form__butBox__login: {
    backgroundColor: `${theme.palette.primary.main}`,
    color: "white",
    fontSize:"1rem",
    fontWeight: "600",
    lineHeight: "normal",
    padding: "1.3rem 4.4rem",
    marginTop: "1rem",
    borderRadius: "3px"
  },
  [theme.breakpoints.down("md")]: {
    formBox__topbar__question: {
      padding: "0rem 2rem",
    },
  },
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
      <LeftMedia/>
      <Grid container item className={classes.formBox}>
        <Grid container item className={classes.formBox__topbar}>
          <Typography className={classes.formBox__topbar__question}>Don't have an account?</Typography>
          <Button 
            color="primary" 
            onClick={() => history.push("/register")} 
            classes={{textPrimary: classes.formBox__topbar__button, label:classes.formBox__topbar__label}}>
            Create Account
          </Button>
        </Grid>
        <Grid container item className={classes.formBox__form}>
          <Grid className={classes.formBox__formShift}>
            <form onSubmit={handleLogin}>
              <Typography className={classes.formBox__form__welcome}>Welcome back!</Typography>
              <StyledTextField 
                label="Username" 
                aria_label="username" 
                type="text" 
                name="username" 
              />
              <StyledTextField 
                label="Password" 
                aria_label="password" 
                type="password" 
                name="password" 
                InputProps={{endAdornment:<Typography className={classes.formBox__form__textfields__forgot}>Forgot?</Typography>}} 
              />
              <Grid container className={classes.formBox__form__butBox}>
                <Button type="submit" className={classes.formBox__form__butBox__login}>
                  Login
                </Button>
              </Grid>
            </form>
          </Grid>
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
