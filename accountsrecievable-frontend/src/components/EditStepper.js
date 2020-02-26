import React, { useState, useContext, forwardRef } from "react";
import { enumerateStatus } from "./common/functions";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepConnector from "@material-ui/core/StepConnector";
import Grid from "@material-ui/core/Grid";
import Add from "@material-ui/icons/AddRounded";
import Approved from "@material-ui/icons/ThumbUpRounded";
import Baseline from "@material-ui/icons/AttachMoneyRounded";
import Purchasing from "@material-ui/icons/ShoppingCartRounded";
import CloseOut from "@material-ui/icons/DoneRounded";
import Close from "@material-ui/icons/CloseRounded";
import Pending from "@material-ui/icons/PauseRounded";
import Box from "@material-ui/core/Box";
import { ArContext } from "./context";
import { toast } from "react-toastify";
import { css } from "glamor";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Paper from "@material-ui/core/Paper";
import Draggable from "react-draggable";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import axios from "axios";
import { isRole, arAuthHeader } from "./common/functions";

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}
const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 17
  },
  active: {
    "& $line": {
      backgroundImage:
        "linear-gradient( 95deg,rgb(0,111,207) 0%,rgb(0,23,90) 50%,rgb(255,255,255) 100%)"
    }
  },
  completed: {
    "& $line": {
      backgroundImage:
        "linear-gradient( 95deg,rgb(0,111,207) 0%,rgb(0,23,90) 50%,rgb(255,255,255) 100%)"
    }
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: "#C8C9C7",
    borderRadius: 1
  }
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: "#ccc",
    zIndex: "1",
    color: "#fff",
    width: 35,
    height: 35,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center"
  },
  active: {
    backgroundImage:
      "linear-gradient(45deg,rgb(0,23,90) 0%,rgb(0,111,207) 50%,rgb(255,255,255) 100%)",
    boxShadow: "0 10px 10px 0 rgba(0,0,0,1)"
  },
  completed: {
    backgroundImage:
      "linear-gradient( 45deg,rgb(0,23,90) 0%,rgb(0,111,207) 50%,rgb(255,255,255) 100%)"
  }
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <Add />,
    2: <Pending />,
    3: <Approved />,
    4: <Baseline />,
    5: <Purchasing />,
    6: <CloseOut />,
    7: <Close />
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

ColorlibStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
  icon: PropTypes.node
};

function getSteps() {
  return [
    "Create New AR",
    "AR Pending",
    "AR Approved",
    "Baseline",
    "Purchasing",
    "Closeout",
    "Close"
  ];
}

const CustomStepIcon = forwardRef((props, ref) => (
  <div ref={ref}>
    <ColorlibStepIcon
      {...props}
      onClick={props => {
        props.onClick();
      }}
    />
  </div>
));

export default function EditStepper(props) {
  const arContext = useContext(ArContext);
  const {
    setAsset,
    setDrawerArNumber,
    setType,
    setArRows,
    refetchGrid,
    setArNumber,
    arNumber,
    setComments,
    setPurpose,
    setBenefits,
    setRisks,
    setArRow,
    setArId,
    setArIndex,
    setProjectName,
    projectName,
    setCostCenter,
    setSite,
    setOwner,
    setDirector,
    setStartDate,
    setEndDate,
    setAmount,
    setCommitted,
    setActualCompletion,
    setFundsUsed,
    setRefetchGrid,
    setArStatus,
    setArStatusId,
    drawerArNumber
  } = arContext;

  const [open, setOpen] = useState(false);
  const [approvedOpen, setApprovedOpen] = useState(false);
  const [tempArNumber, setTempArNumber] = useState(""); // used to store the temporary ar number that the user enters before they hit ok so that grids dont rerender during their choice, the choice might not be valid at this pint
  const [approvedStatus, setApprovedStatus] = useState(0); // used to store the status that will be used when making a put request if an AR number already is in place when the user makes a change to AR Approved status

  const handleClickOpen = value => {
    if (typeof value !== undefined) {
      setApprovedStatus(value);
    }
    setOpen(true);
  };

  const handleNo = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setApprovedOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleApprovedClose = () => {
    setApprovedOpen(false);
  };

  const handleOk = () => {
    if (drawerArNumber !== null && drawerArNumber !== "") {
      axios
        .get(
          `https://localhost:6001/api/v1/ar/${drawerArNumber}?arnumber=true`,
          { headers: { Authorization: arAuthHeader } }
        )
        .then(result => {
          toast.error(
            `AR number ${drawerArNumber} is already in use or is invalid. Please try again or contact MIS if you require assistance.`,
            {
              position: toast.POSITION.BOTTOM_RIGHT,
              className: css({
                background: "#B42C01 !important"
              })
            }
          );
        })
        .catch(e => {
          setApprovedOpen(false);
          const newStatusId = props.activeStep;
          props.onActiveStepChange(newStatusId, tempArNumber);
          setTempArNumber("");
          toast.success(
            `Status for Project: ${projectName} changed to AR Approved`,
            {
              position: toast.POSITION.BOTTOM_RIGHT,
              className: css({
                background: "#008767 !important"
              })
            }
          );
        });
    } else {
      toast.error(
        `AR number ${drawerArNumber} is already in use or is invalid. Please try again or contact MIS if you require assistance.`,
        {
          position: toast.POSITION.BOTTOM_RIGHT,
          className: css({
            background: "#B42C01 !important"
          })
        }
      );
    }
  };

  const handleYes = event => {
    event.preventDefault();
    const newStatusId = props.activeStep;
    props.onActiveStepChange(newStatusId);
    setOpen(false);
  };

  const steps = getSteps();

  const handleApproved = () => {
    setApprovedOpen(true);
  };

  const handleNext = () => {
    if (props.activeStep === 1) {
      drawerArNumber === "Pending..." || drawerArNumber === null
        ? handleApproved()
        : handleClickOpen(3);
    } else if (props.activeStep === 6) {
      toast.error(
        "You may not advance the status of a closed AR. Please contact MIS if you require assistance.",
        {
          position: toast.POSITION.BOTTOM_RIGHT,
          className: css({
            background: "#B42C01 !important"
          })
        }
      );
    } else {
      handleClickOpen();
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Confirm Status Change
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you wish to make this status change?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleNo} color="primary">
            No
          </Button>
          <Button onClick={handleYes} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={approvedOpen}
        onClose={handleApprovedClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Confirm Status Change
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            To complete the change to 'AR Approved' status, please enter your AR
            number:
            <Divider style={{ marginBottom: 20 }} />
            <TextField
              id="arNumber"
              label={
                <Typography style={{ fontWeight: "bold" }}>
                  AR Number
                </Typography>
              }
              size="small"
              value={arNumber}
              onBlur={event => {
                setTempArNumber(event.target.value);
                setDrawerArNumber(event.target.value);
              }}
              variant="outlined"
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleOk} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>

      <Box
        style={{ width: "68%", height: 1 }}
        p={2}
        position="absolute"
        top={0}
        left="16%"
        zIndex="200"
      >
        {props.title}
      </Box>
      <Grid container>
        <Grid item xm={12} sm={12}>
          <Stepper
            alternativeLabel
            activeStep={props.activeStep}
            onClick={() => {
              isRole("FINANCE") && handleNext(props.activeStep);
            }}
            connector={<ColorlibConnector />}
          >
            {steps.map(label => (
              <Step style={{ fontsize: "14px" }} key={label}>
                <StepLabel StepIconComponent={CustomStepIcon}>
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Grid>
      </Grid>
    </>
  );
}
