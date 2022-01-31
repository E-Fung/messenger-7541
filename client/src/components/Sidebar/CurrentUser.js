import React, { useState } from "react";
import { Box, Typography, Button, Grow } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { BadgeAvatar } from "./index";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { clearOnLogout } from "../../store";
import { logout } from "../../store/utils/thunkCreators";

const useStyles = makeStyles(() => ({
  root: {
    height: 44,
    marginTop: 23,
    marginLeft: 6,
    display: "flex",
    alignItems: "center"
  },
  subContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexGrow: 1
  },
  username: {
    letterSpacing: -0.23,
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 17
  },
  ellipsis: {
    color: "#95A7C4",
    opacity: 0.5,
  },
  dropDownContainer: {
    position: "relative"
  },
  dropDown: {
    color:"black", 
    position:"absolute", 
    boxShadow:"0px 0px 5px rgba(0,0, 0,0.2)",
    borderRadius:"5px"
  }
}));

const CurrentUser = (props) => {
  const [toggleMenu, setToggleMenu] = useState(false)

  const classes = useStyles();
  const { logout } = props;
  const user = props.user || {};

  const handleClick = () => {
    setToggleMenu(!toggleMenu)
  }

  const handleLogout = async () => {
    await logout(user.id);
  };

  return (
    <Box className={classes.root}>
      <BadgeAvatar photoUrl={user.photoUrl} online={true} />
      <Box className={classes.subContainer}>
        <Typography className={classes.username}>{user.username}</Typography>
        <Box className={classes.dropDownContainer} >
          <Button onClick={handleClick}>
            <MoreHorizIcon classes={{ root: classes.ellipsis }} />
          </Button>
          {toggleMenu && (
            <Grow in={true}>
              <Box className={classes.dropDown}>
                <Button onClick={handleLogout}>
                  Logout
                </Button>
              </Box>
            </Grow>
          )}
        </Box> 
      </Box>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};


const mapDispatchToProps = (dispatch) => {
  return {
    logout: (id) => {
      dispatch(logout(id));
      dispatch(clearOnLogout());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentUser);
