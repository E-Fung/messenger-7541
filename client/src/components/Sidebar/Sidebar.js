import React from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { Search, Chat, CurrentUser } from "./index.js";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: 21,
    paddingRight: 21,
    width: "25%"
  },
  title: {
    fontSize: 20,
    letterSpacing: -0.29,
    fontWeight: "bold",
    marginTop: 32,
    marginBottom: 15
  },
  [theme.breakpoints.down("md")]: {
    root: {
      width: "30%"
    }
  },
  [theme.breakpoints.down("sm")]: {
    root: {
      width: "100%"
    }
  },
}));

const Sidebar = (props) => {
  const classes = useStyles();
  const conversations = props.conversations || [];
  const { handleChange, searchTerm } = props;

  return (
    <Box className={classes.root}>
      <CurrentUser />
      <Typography className={classes.title}>Chats</Typography>
      <Search handleChange={handleChange} />
      {conversations
        .filter((conversation) => conversation.otherUser.username.includes(searchTerm))
        .map((conversation) => {
          return <Chat conversation={conversation} key={conversation.otherUser.username} />;
        })}
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    conversations: state.conversations
  };
};

export default connect(mapStateToProps)(Sidebar);
