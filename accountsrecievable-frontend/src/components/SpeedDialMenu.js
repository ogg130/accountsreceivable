import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import { ArContext } from "./context";
import DeleteDialog from "./DeleteDialog";
import { toast } from "react-toastify";
import { css } from "glamor";
import { isRole } from "./common/functions";

export default function SpeedDialMenu(props) {
  const arContext = useContext(ArContext);

  const {
    setCreateFlag,
    setEditFlag,
    userRole,
    arId,
    setOpenBackdrop
  } = arContext;
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const useStyles = makeStyles(theme => ({
    root: {
      transform: "translateZ(0px)",
      flexGrow: 1
    },
    speedDial: {
      position: "fixed",
      bottom: props.bottom,
      left: 80
    },
    speedDialIcon: {
      zIndex: "1",
      width: 40,
      height: 40,
      display: "flex",
      borderRadius: "50%",
      justifyContent: "center",
      alignItems: "center"
    }
  }));

  const classes = useStyles();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogToggle = value => {
    setDialogOpen(value);
  };

  const handleEdit = () => {
    setEditFlag(true);
    props.onEditDrawerOpen();
  };

  return (
    <div className={classes.root}>
      <DeleteDialog
        dialogOpen={dialogOpen}
        onDialogToggle={value => {
          handleDialogToggle(value);
        }}
      />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        className={classes.speedDial}
        direction={"down"}
        icon={<ContactSupportIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        <SpeedDialAction
          icon={
            <span className={classes.speedDialIcon}>
              <AddIcon />
            </span>
          }
          tooltipTitle={"Create AR"}
          tooltipOpen
          TooltipClasses={classes}
          onClick={() => {
            setCreateFlag(true);
            props.onCreateDrawerOpen();
          }}
        />

        <SpeedDialAction
          icon={
            <span className={classes.speedDialIcon}>
              <EditIcon />
            </span>
          }
          tooltipTitle={"Edit AR"}
          tooltipOpen
          TooltipClasses={classes}
          onClick={() => {
            arId === 0
              ? toast.error(`Please select a project to edit.`, {
                  position: toast.POSITION.BOTTOM_RIGHT,
                  className: css({
                    background: "#B42C01 !important"
                  })
                })
              : handleEdit();
          }}
        />

        <SpeedDialAction
          icon={
            <span className={classes.speedDialIcon}>
              <DeleteIcon />
            </span>
          }
          tooltipTitle={"Delete AR"}
          tooltipOpen
          TooltipClasses={classes}
          onClick={() => {
            if (isRole("FINANCE")) {
              if (arId === 0) {
                toast.error(`Please select a project to delete.`, {
                  position: toast.POSITION.BOTTOM_RIGHT,
                  className: css({
                    background: "#B42C01 !important"
                  })
                });
              } else {
                handleDialogOpen();
              }
            } else {
              toast.error(`Only finance members may delete projects.`, {
                position: toast.POSITION.BOTTOM_RIGHT,
                className: css({
                  background: "#B42C01 !important"
                })
              });
            }
          }}
        />
      </SpeedDial>
    </div>
  );
}
