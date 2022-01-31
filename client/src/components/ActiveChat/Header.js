import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, Button, Grow } from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { setActiveChat } from "../../store/activeConversation";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: 89,
    marginBottom: 34,
    boxShadow: "0 2px 20px 0 rgba(88,133,196,0.10)"
  },
  content: {
    display: "flex",
    alignItems: "center",
    marginLeft: 24
  },
  username: {
    fontSize: 20,
    letterSpacing: -0.29,
    fontWeight: "bold",
    marginRight: 14
  },
  statusText: {
    fontSize: 12,
    color: "#BFC9DB",
    letterSpacing: -0.17
  },
  statusDot: {
    height: 8,
    width: 8,
    borderRadius: "50%",
    marginRight: 5,
    backgroundColor: "#D0DAE9"
  },
  online: {
    background: "#1CED84"
  },
  ellipsis: {
    color: "#95A7C4",
    opacity: 0.5
  },
  dropDownContainer: {
    position:"relative"
  },
  dropDown: {
    color:"black", 
    position:"absolute", 
    boxShadow:"0px 0px 5px rgba(0,0, 0,0.2)",
    borderRadius:"5px",
    backgroundColor:"white"
  },
  button: {
    marginRight: "24px"
  }
}));

const Header = (props) => {
  const [toggleMenu, setToggleMenu] = useState(false)

  const classes = useStyles();
  const { username, online } = props;

  const handleClick = () => {
    setToggleMenu(!toggleMenu)
  };

  const handleLeaveChat = async () => {
    await props.setActiveChat("");
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.content}>
        <Typography className={classes.username}>{username}</Typography>
        <Box className={`${classes.statusDot} ${classes[online && "online"]}`}></Box>
        <Typography className={classes.statusText}>{online ? "Online" : "Offline"}</Typography>
      </Box>
      <Box className={classes.dropDownContainer}>
        <Button onClick={handleClick} className={classes.button}>
          <MoreHorizIcon classes={{ root: classes.ellipsis }} />
        </Button>
        {toggleMenu && (
          <Grow in={true}>
            <Box className={classes.dropDown}>
              <Button onClick={handleLeaveChat}>
                Exit
              </Button>
            </Box>
          </Grow>
        )}
      </Box>
    </Box>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveChat: (id) => {
      dispatch(setActiveChat(id));
    }
  };
};

export default connect(null, mapDispatchToProps)(Header);
