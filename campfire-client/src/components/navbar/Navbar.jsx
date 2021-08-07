import React from "react";
import { Link } from "react-router-dom";
import { Button, AppBar, Toolbar, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core";
import "./Navbar.css";

const useStyles = makeStyles(() => ({
  header: {
    backgroundColor: "transparent",
    paddingRight: "79px",
    paddingLeft: "118px",
    boxShadow: 'none',
  },
  logo: {
    fontFamily: "Work Sans, sans-serif",
    fontWeight: 600,
    color: "#FFFEFE",
    textAlign: "left",
    fontSize: '30px',
    letterSpacing: `3px`
  },
  menuButton: {
    fontFamily: "Open Sans, sans-serif",
    fontWeight: 700,
    fontSize: '20px',
    marginLeft: "38px",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

const headersData = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About",
    href: "/about",
  },
];

export default function Navbar() {
  const { header, logo, menuButton, toolbar } = useStyles();
                     
  const displayDesktop = () => {
    return (
      <Toolbar className={toolbar}>
        <Link to="/">
          {campfireLogo}  
        </Link>
        <div>{getMenuButtons()}</div>
      </Toolbar>
    );
  };
                     
  const campfireLogo = (
    <Typography variant="h6" component="h1" className={logo}>
      Campfire
    </Typography>
  );
                     
  const getMenuButtons = () => {
    return headersData.map(({ label, href }) => {
      return (
        <Button
          {...{
            key: label,
            color: "inherit",
            to: href,
            component: Link,
            className: menuButton,
          }}
        >
          {label}
        </Button>
      );
    });
  };
                     
  return (
    <>
      <AppBar position="sticky" className={header}>{displayDesktop()}</AppBar>
      {/* <Toolbar /> */}
    </>
  );
}