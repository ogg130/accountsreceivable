import React, { useState } from "react";
import topBar from "../../resources/img/TopBanner-CoreBlue-New.png";
import dciLogo from "../../resources/img/dci-logo2-noBorder.png";
import { NavLink } from "react-router-dom";
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider
} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Grid from "@material-ui/core/Grid";
import Slide from "@material-ui/core/Slide";

function Header() {
  const useStyles = makeStyles(theme => ({
    palette: {
      secondary: {
        main: "#006fcf"
      }
    },
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    link: {
      color: "white"
    },
    navBar: {
      textAlign: "center",
      backgroundColor: "rgba(0,23,90,.5)",
      marginTop: 5,
      height: 36,

      overflow: "hidden"
    },
    navBarIcons: {
      textAlign: "center",
      backgroundColor: "rgba(0,23,90,.5)",
      marginTop: 5,
      height: 36,

      overflow: "hidden"
    }
  }));
  const classes = useStyles();

  const activeStyle = { color: "#FFFFFF", fontWeight: "bold" };

  const [anchorEl, setAnchorEl] = useState(null);
  const [setMobileMoreAnchorEl] = useState(null);
  const [reporting, setReporting] = useState(false);
  const [project, setProject] = useState(false);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );
  const theme = createMuiTheme({
    palette: {
      secondary: {
        main: "#006fcf"
      }
    }
  });

  return (
    <div
      style={{
        backgroundColor: "#006FCF",
        backgroundImage: "url(" + topBar + ")",
        backgroundPosition: "100% 50%",
        marginRight: "5px",
        backgroundRepeat: "no-repeat"
      }}
      className={classes.root}
    >
      <ThemeProvider theme={theme}>
        <AppBar
          style={{
            background: topBar,
            backgroundColor: "transparent",
            boxShadow: "none",
            height: 140
          }}
          position="static"
        >
          <Toolbar>
            <div className={classes.root}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                  <IconButton
                    edge="start"
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="menu"
                    disabled
                  >
                    <img
                      src={dciLogo}
                      alt="logo"
                      style={{ width: 75 }}
                      className={classes.logo}
                    />
                    <Slide direction={"down"} timeout={1500} in={true}>
                      <h1
                        style={{
                          color: "white",
                          paddingTop: 10,
                          paddingLeft: 25
                        }}
                      >
                        Accounts Receivable
                      </h1>
                    </Slide>
                  </IconButton>
                </Grid>
                <Grid container spacing={3}>
                  <Grid className={classes.navBar} item xs={1} sm={1}>
                    <NavLink
                      onClick={() => {
                        setReporting(false);
                        setProject(true);
                      }}
                      style={project ? activeStyle : null}
                      to="/projects"
                    >
                      <h4 className={classes.link}>Projects</h4>
                    </NavLink>
                  </Grid>
                  <Grid className={classes.navBar} item xs={1} sm={1}>
                    <NavLink
                      onClick={() => {
                        setReporting(true);
                        setProject(false);
                      }}
                      style={reporting ? activeStyle : null}
                      className={classes.link}
                      to="/reporting"
                    >
                      <h4>Reporting</h4>
                    </NavLink>
                  </Grid>
                  <Grid className={classes.navBar} item xs={8} sm={8}>
                    <h4>
                      Delivering "World Class" Customer experiences,
                      Environments, Infrastructures, and Value.
                    </h4>
                  </Grid>
                  <Grid
                    className={classes.navBarIcons}
                    item
                    xs={1}
                    sm={1}
                  ></Grid>
                  <Grid className={classes.navBarIcons} item xs={1} sm={1}>
                    {/* <IconButton
                      style={{ marginTop: -10 }}
                      aria-label="show 4 new mails"
                      color="inherit"
                    >
                      <Badge badgeContent={4} color="secondary">
                        <MailIcon />
                      </Badge>
                    </IconButton>
                    <IconButton
                      style={{ marginTop: -10 }}
                      aria-label="show 17 new notifications"
                      color="inherit"
                    >
                      <Badge badgeContent={17} color="secondary">
                        <NotificationsIcon />
                      </Badge>
                    </IconButton>
                    <IconButton
                      style={{ marginTop: -10 }}
                      edge="end"
                      aria-label="account of current user"
                      aria-controls={menuId}
                      aria-haspopup="true"
                      onClick={handleProfileMenuOpen}
                      color="inherit"
                    >
                      <Badge color="secondary">
                        <AccountCircle />
                      </Badge>
                    </IconButton>
                    {renderMenu} */}
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </div>
  );
}
export default Header;
