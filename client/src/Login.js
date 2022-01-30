import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Typography,
  Button,
  FormControl,
  TextField,
  Hidden,
  Card
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { login } from "./store/utils/thunkCreators";
import bg_img from './assets/bg_img.png'
import SmsOutlinedIcon from '@material-ui/icons/SmsOutlined';

const useStyles = makeStyles((theme) => ({
  root:{
    flexWrap:'nowrap', 
    position:'relative'
  },
  leftMedia:{
    position:'relative'
  },
  leftMedia__img:{
    position:'relative', 
    zIndex:10, 
    maxHeight:'100vh'
  },
  leftMedia__bg:{
    backgroundColor:'rgba(134,185,255)', 
    top:'0', 
    position:'absolute', 
    height:'100vh', 
    width:'100%'
  },
  leftMedia__gradient:{
    width:'100%', 
    height:'100%', 
    background:'linear-gradient(#3A8DFF,#86B9FF)', 
    position:'absolute', 
    opacity:'85%',
    padding:'0',
    margin:'0',
    top:'0',
    zIndex:100
  },
  leftMedia__gradient__icon:{
    width:'100%', 
    color:'white', 
    transform:'scale(2)', 
    margin:'1rem'
  },
  form:{
    height:'100vh'
  },
  form__topbar:{
    padding:'1rem 1rem'
  },
  form__topbar__question:{
    alignSelf:'center', 
    margin:'0 1rem', 
    color:'grey', 
    fontSize:'0.9rem'
  },
  form__topbar__login:{
    margin:'0 1rem'
  },
  form__topbar__login__button:{
    padding:'0.75rem 2rem', 
    color:'#3A8DFF', 
    fontSize:'0.9rem'
  },
  form__form:{
    flexGrow:1
  },
  form__form__welcome:{
    fontSize:'1.75rem', 
  },
  form__form__textfields:{
    width:'28rem', 
    margin:'1rem 0'
  },
  form__form__login:{
    backgroundColor:'#3A8DFF', 
    color:'white', 
    fontFamily:'Montserrat', 
    padding:'0.75rem 5rem',
    margin:'2rem'
  },
  [theme.breakpoints.down('md')]:{
    form__form__textfields:{
      width:'22rem', 
      margin:'0.5rem 0'
    },
  },
  [theme.breakpoints.down('sm')]:{
    form__form__textfields:{
      width:'18rem', 
      margin:'0.5rem 0'
    },
    form__topbar__question:{
      margin:'1rem 1rem'
    }
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
      <Grid item className={classes.leftMedia}>
        <Hidden smDown>
          <img src={bg_img} alt='bg_img'className={classes.leftMedia__img}/>
          <Grid item className={classes.leftMedia__bg}/>
          <Grid item container justifyContent='center' alignContent='center' className={classes.leftMedia__gradient} >
            <SmsOutlinedIcon  fontSize='large' className={classes.leftMedia__gradient__icon} />
            <Typography variant='h5' style={{color:'white'}}>Converse with anyone</Typography>
            <Typography variant='h5' style={{color:'white'}}>with any language</Typography>
          </Grid>
        </Hidden>
      </Grid>
      <Grid item container alignContent='center' direction='column' className={classes.form}>
        <Grid item container justifyContent='flex-end' className={classes.form__topbar} >
          <Typography className={classes.form__topbar__question} >Don't have an account?</Typography>
          <Card className={classes.form__topbar__login} elevation={2}>
            <Button onClick={() => history.push("/register")} className={classes.form__topbar__login__button}>Create account</Button>
          </Card>
        </Grid>
        <Grid container item justifyContent='center' alignContent='center' className={classes.form__form} >
          <form onSubmit={handleLogin}>
              <Typography className={classes.form__form__welcome}>Welcome back!</Typography>
              <Grid>
                <FormControl margin="normal" required>
                  <TextField
                    aria-label="username"
                    label="Username"
                    name="username"
                    type="text"
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
                    className={classes.form__form__textfields}
                    />
                </FormControl>
              </Grid>
              <Grid container justifyContent='center'>
                <Button type="submit" variant="contained" size="large" className={classes.form__form__login}>
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
