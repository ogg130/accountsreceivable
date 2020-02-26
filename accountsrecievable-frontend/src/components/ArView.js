import React, { useContext } from "react";
import ArDrawerCreate from "./ArDrawerCreate";
import ArDrawerEdit from "./ArDrawerEdit";
import Typography from "@material-ui/core/Typography";
import StatusStepper from "./StatusStepper";
import SpeedDialMenu from "./SpeedDialMenu";
import GridPanel from "./GridPanel";
import "./styles.css";
import { ArContext } from "./context";
import { isRole } from "./common/functions";
import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff"
  }
}));

function ArView(props) {
  const arContext = useContext(ArContext);

  const { arId, arIndex } = arContext;
  const classes = useStyles();

  return (
    <div className={props.classes.root}>
      <ArDrawerCreate
        drawerOpen={props.createDrawerOpen}
        onDrawerClose={props.onCreateDrawerClose}
      />
      <ArDrawerEdit
        drawerOpen={props.editDrawerOpen}
        onDrawerClose={props.onEditDrawerClose}
      />

      <Typography
        component="div"
        variant="body1"
        style={{ height: 100, width: "100%", position: "relative" }}
      >
        <StatusStepper
          classes={props.classes}
          title={
            <h2 style={{ paddingTop: 10, textAlign: "center" }}>
              {props.context.projectName
                ? "Status for Project:"
                : "No project selected..."}{" "}
              <u>{props.context.projectName}</u>
            </h2>
          }
        />

        <GridPanel classes={props.classes} context={props.context} />

        <SpeedDialMenu
          onCreateDrawerOpen={() => {
            props.onCreateDrawerOpen();
          }}
          onEditDrawerOpen={() => {
            props.onEditDrawerOpen();
          }}
          bottom={isRole("FINANCE") && arId !== 0 ? 450 : 450}
          direction="down"
        />
      </Typography>
    </div>
  );
}

export default ArView;
