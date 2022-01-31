import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Grid, CssBaseline, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { SidebarContainer } from "./Sidebar";
import { ActiveChat } from "./ActiveChat";
import { fetchConversations } from "../store/utils/thunkCreators";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  content: {
    display: "flex",
    width: "100%",
    flexWrap: "wrap",
    boxSizing: "border-box"
  },
  content__mobile: {
    display: "none",
    width: "100%",
    flexWrap: "wrap",
    boxSizing: "border-box"
  },
  [theme.breakpoints.down("sm")]: {
    content: {
      display: "none"
    },
    content__mobile: {
      display: "flex"
    }
  },
}));

const Home = (props) => {
  const classes = useStyles();
  const { user, fetchConversations, activeConversation } = props;
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (user.id) {
      setIsLoggedIn(true);
    }
  }, [user.id]);

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  if (!user.id) {
    // If we were previously logged in, redirect to login instead of register
    if (isLoggedIn) return <Redirect to="/login" />;
    return <Redirect to="/register" />;
  }


  return (
    <>
      {/* logout button will eventually be in a dropdown next to username */}
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Box  className={classes.content}>
          <SidebarContainer />
          <ActiveChat />
        </Box>
        <Box className={classes.content__mobile}>
          {!activeConversation && <SidebarContainer />}
          {activeConversation && <ActiveChat />}
        </Box>
      </Grid>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    conversations: state.conversations,
    activeConversation: state.activeConversation
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchConversations: () => {
      dispatch(fetchConversations());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
