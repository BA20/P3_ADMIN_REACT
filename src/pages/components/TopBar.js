import React from "react";
import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import { AppBar, Toolbar, makeStyles } from "@material-ui/core";
import Image from "react-bootstrap/Image";

const useStyles = makeStyles({
  root: {},
  toolbar: {
    height: 74,
  },
});

const TopBar = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <AppBar className={clsx(classes.root, className)} elevation={0} {...rest}>
      <Toolbar
        className={classes.toolbar}
        style={{
          backgroundColor: "#a21c1e",
        }}
      >
        <RouterLink to="/home"></RouterLink>
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
};

export default TopBar;
