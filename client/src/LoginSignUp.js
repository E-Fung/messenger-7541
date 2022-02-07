import React from "react";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { Grid, Typography, Button } from "@material-ui/core";
import { login, register } from "./store/utils/thunkCreators";
import { makeStyles } from "@material-ui/core/styles";
import { LeftMedia, StyledTextField } from "./components";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    flexWrap: "nowrap"
  },
  formBox: {
    height: "100vh",
    alignContent: "center",
    flexDirection: "column",
    flexGrow: "1",
    flexWrap: "nowrap"
  },
  formBox__topbar: {
    padding: `${theme.spacing(2)} ${theme.spacing(3)}`,
    justifyContent: "flex-end"
  },
  formBox__topbar__question: {
    alignSelf: "center",
    color: theme.palette.primary.grey,
    padding: `${theme.spacing(1.25)} ${theme.spacing(2.4)}`
  },
  formBox__topbar__button: {
    boxShadow: `0px 2px 12px 0px rgba(74, 106, 149, 0.2)`,
    padding: `${theme.spacing(1.25)} ${theme.spacing(2.4)}`,
    borderRadius: "5px",
    fontWeight: "600"
  },
  formBox__topbar__buttonSignup: {
    boxShadow: `0px 2px 12px 0px rgba(74, 106, 149, 0.2)`,
    padding: `${theme.spacing(1.25)} ${theme.spacing(3.7)}`,
    borderRadius: "5px",
    fontWeight: "600"
  },
  formBox__form: {
    flexGrow: 3,
    alignContent: "center",
    justifyContent: "center",
  },
  formBox__formShift: {
    transform: (props) => 
      props.type === "login"
      ? `translate(0,-4.5rem)`
      : `translate(0,-1.5rem)`, 
  },
  formBox__form__title: {
    marginBottom: (props) =>
      props.type === "login"
      ? theme.spacing(2)
      : theme.spacing(1),
    fontWeight: "600"
  },
  formBox__form__forgot: {
    color: theme.palette.primary.main,
    cursor: "pointer",
  },
  formBox__form__butBox: {
    justifyContent: "center",
  },
  formBox__form__butBox__button: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.white,
    width: `${(160/14)}rem`,
    height: `${(56/14)}rem`,
    marginTop: theme.spacing(1),
    borderRadius: "3px",
    fontFamily: "Montserrat",
    fontSize: `${(16/14)}rem`,
  },
  [theme.breakpoints.down("md")]: {
    formBox__topbar__question: {
      padding: `${theme.spacing(0)} ${theme.spacing(2)}`
    },
  },
}));

const FormShiftGrid = (props) => {
  const {type, ...other} = props;
  const classes = useStyles(props)
  return <Grid className={classes.formBox__formShift} {...other} />
}

const FormTitleTypo = (props) => {
  const {type, ...other} = props;
  const classes = useStyles(props)
  return <Typography variant="h2" className={classes.formBox__form__title} {...other} />
}

const LoginSignUp = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const location = useLocation();
  const onLogin = location.pathname === "/login";
  const { user, login, register } = props;

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    await login({ username, password });
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    await register({ username, email, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid container className={classes.root}>
      <LeftMedia />
      <Grid container item className={classes.formBox}>
        <Grid container item className={classes.formBox__topbar}>
          <Typography className={classes.formBox__topbar__question}>{onLogin ? "Don't have an account?" : "Already have an account?"}</Typography>
          <Button
            color="primary"
            onClick={() => (onLogin ? history.push("/register") : history.push("/login"))}
            classes={{
              textPrimary: onLogin ? classes.formBox__topbar__button : classes.formBox__topbar__buttonSignup,
              label: classes.formBox__topbar__label,
            }}
          >
            {onLogin ? "Create Account" : "Login"}
          </Button>
        </Grid>
        <Grid container item className={classes.formBox__form}>
          <FormShiftGrid type={onLogin ? "login" : "signup"}>
            <form onSubmit={onLogin ? handleLogin : handleRegister}>
              <FormTitleTypo type={onLogin ? "login" : "signup"}>
                {onLogin ? "Welcome back!" : "Create an account."}
              </FormTitleTypo>
              <StyledTextField label="Username" aria_label="username" type="text" name="username" />
                {!onLogin && <StyledTextField label="E-mail address" aria_label="e-mail address" type="email" name="email" />}
              <StyledTextField
                label="Password"
                aria_label="password"
                type="password"
                name="password"
                InputProps={
                  onLogin ? { endAdornment: <Typography variant="body2" className={classes.formBox__form__forgot}>Forgot?</Typography> } : { minLength: 6 }
                }
              />
              <Grid container className={classes.formBox__form__butBox}>
                <Button type="submit" className={classes.formBox__form__butBox__button}>
                  {onLogin ? "Login" : "Create"}
                </Button>
              </Grid>
            </form>
          </FormShiftGrid>
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
    register: (credentials) => {
      dispatch(register(credentials));
    },
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginSignUp);
