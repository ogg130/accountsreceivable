import React, { useState, useContext, forwardRef } from "react";
import { enumerateStatus, denumerateStatus } from "./common/functions";
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
import { toast, ToastType } from "react-toastify";
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
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grow from "@material-ui/core/Grow";
import { isRole, arAuthHeader } from "./common/functions";
import { useDidMount } from "./useDidMount";

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

export default function StatusStepper(props) {
  const arContext = useContext(ArContext);
  const {
    setAsset,
    setType,
    asset,
    type,
    arId,
    setArStatus,
    costCenter,
    director,
    projectName,
    actualCompletion,
    owner,
    amount,
    committed,
    endDate,
    startDate,
    comments,
    userId,
    site,
    arNumber,
    arStatus,
    setArNumber,
    setArRows,
    arStatusId,
    setArStatusId,
    setComments,
    setPurpose,
    setBenefits,
    setRisks,
    setArRow,
    setArId,
    setArIndex,
    setProjectName,
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
    arIndex,
    purpose,
    benefits,
    risks
  } = arContext;

  const siteList = JSON.parse(sessionStorage.getItem("siteList"));
  const statusList = JSON.parse(sessionStorage.getItem("statusList"));
  const costCenterList = JSON.parse(sessionStorage.getItem("costCenterList"));
  const directorList = JSON.parse(sessionStorage.getItem("directorList"));
  const ownerList = JSON.parse(sessionStorage.getItem("ownerList"));

  const [open, setOpen] = useState(false);
  const [refetchGrid, setRefetchGrid] = useState(false);
  const [approvedOpen, setApprovedOpen] = useState(false);
  const [tempArNumber, setTempArNumber] = useState(""); // used to store the temporary ar number that the user enters before they hit ok so that grids dont rerender during their choice, the choice might not be valid at this pint
  const [approvedStatus, setApprovedStatus] = useState(0); // used to store the status that will be used when making a put request if an AR number already is in place when the user makes a change to AR Approved status

  const handleClickOpen = value => {
    setOpen(true);
  };

  const handleNo = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setApprovedOpen(false);
    setTempArNumber("");
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleApprovedClose = () => {
    setApprovedOpen(false);
  };

  const getCostCenterId = value => {
    const costCenter = parseInt(value.slice(0, 3));

    if (costCenterList.length > 0) {
      var item = costCenterList.find(records => records.value === costCenter);
      return item.id;
    }
    return null;
  };

  const getSiteId = value => {
    if (siteList.length > 0) {
      var item = siteList.find(records => records.code === value);
      return item.siteID;
    }
    return null;
  };

  const getStatusId = value => {
    if (statusList.length > 0) {
      var item = statusList.find(records => records.status === value);
      return item.id;
    }
    return null;
  };

  const getUserId = (value, list) => {
    if (list.length > 0) {
      var item = list.find(
        records => `${records.firstName} ${records.lastName}` === value
      );
      return item.userID;
    }
    return null;
  };
  const typeList = JSON.parse(sessionStorage.getItem("typeList"));
  const assetList = JSON.parse(sessionStorage.getItem("assetList"));

  const getAssetId = value => {
    if (
      assetList.length > 0 &&
      value !== "" &&
      value !== null &&
      value !== null
    ) {
      var item = assetList.find(r => r.value === value);
      return item.scheduleAssetID;
    }
    return null;
  };

  const getTypeId = value => {
    if (typeList.length > 0) {
      var item = typeList.find(r => r.value === value);
      if (typeof item === "undefined") {
        return null;
      } else {
        return item.scheduleTypeID;
      }
    }

    return null;
  };

  const currentUserId = sessionStorage.getItem("userId");

  const handleOk = () => {
    if (tempArNumber !== "" && tempArNumber !== null) {
      axios
        .get(`https://localhost:6001/api/v1/ar/${tempArNumber}?arnumber=true`, {
          headers: { Authorization: arAuthHeader }
        })
        .then(result => {
          toast.error(
            `AR number ${tempArNumber} is already in use or is invalid. Please try again or contact MIS if you require assistance.`,
            {
              position: toast.POSITION.BOTTOM_RIGHT,
              className: css({
                background: "#B42C01 !important"
              })
            }
          );
        })
        .catch(e => {
          const ar = {
            arID: arId,
            arNumber: tempArNumber,
            costCenter: getCostCenterId(costCenter),
            projectName: projectName,
            directorID: getUserId(director, directorList),
            actualPercent: actualCompletion,
            ownerID: getUserId(owner, ownerList),
            amount: amount,
            committed: committed,
            endDate: endDate,
            startDate: startDate,
            comments: comments,
            purpose: purpose,
            benefits: benefits,
            risks: risks,
            changesQueued: false,
            enteredDate: new Date(),
            enteredById: currentUserId,
            siteID: getSiteId(site),
            status: 3,
            asset: 1,
            type: 1
          };

          axios
            .put(`https://localhost:6001/api/v1/ar/${arId}`, ar, {
              headers: { Authorization: arAuthHeader }
            })
            .then(r => {
              setApprovedOpen(false);
              setArStatusId(2);
              setArStatus("AR Approved");
              setRefetchGrid(true);
              setArNumber(tempArNumber);
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
            })
            .catch(e => {
              toast.error(
                `There was a problem attempting to change the status to Approved. Please contact MIS for details and resolution.`,
                {
                  position: toast.POSITION.BOTTOM_RIGHT,
                  className: css({
                    background: "#B42C01 !important"
                  })
                }
              );
            });
        });
    } else {
      toast.error(
        `AR number ${tempArNumber} is already in use or is invalid. Please try again or contact MIS if you require assistance.`,
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
    setOpen(false);

    // ar status is 0 here, Create New
    const newStatusId = enumerateStatus(arStatus) + 1;
    const newStatus = denumerateStatus(newStatusId);

    //const status = approvedStatus !==  ? approvedStatus : newStatusId + 1;

    const ar = {
      arID: arId,
      arNumber: arNumber,
      costCenter: getCostCenterId(costCenter),
      projectName: projectName,
      directorID: getUserId(director, directorList),
      actualPercent: actualCompletion,
      ownerID: getUserId(owner, ownerList),
      amount: amount,
      committed: committed,
      endDate: endDate,
      startDate: startDate,
      comments: comments,
      purpose: purpose,
      benefits: benefits,
      risks: risks,
      changesQueued: false,
      enteredDate: new Date(),
      enteredById: currentUserId,
      siteID: getSiteId(site),
      status: newStatusId + 1,
      asset: 1,
      type: 1
    };
    axios
      .put(`https://localhost:6001/api/v1/ar/${arId}`, ar, {
        headers: { Authorization: arAuthHeader }
      })
      .then(r => {
        setArStatus(newStatus);
        setArStatusId(newStatusId);

        setRefetchGrid(true);
        toast.success(
          `Status for Project ${projectName} changed to ${newStatus}`,
          {
            position: toast.POSITION.BOTTOM_RIGHT,
            className: css({
              background: "#008767 !important"
            })
          }
        );
      })
      .catch(e => {
        toast.error(
          `There was a problem attempting to change the status to Approved. Please contact MIS for details and resolution.`,
          {
            position: toast.POSITION.BOTTOM_RIGHT,
            className: css({
              background: "#B42C01 !important"
            })
          }
        );
      });
  };
  const steps = getSteps();

  const handleApproved = () => {
    setApprovedOpen(true);
  };

  const handleNext = () => {
    if (arId !== null) {
      if (arStatusId === 1) {
        arNumber === "Pending..." || arNumber === null || arNumber === ""
          ? handleApproved()
          : handleClickOpen(3);
      } else if (arStatusId === 6) {
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
        handleClickOpen(arStatusId);
      }
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
              defaultValue={""}
              value={tempArNumber}
              onChange={event => {
                setTempArNumber(event.target.value);
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

      <Grow direction="left" timeout={2400} in={true}>
        <Box
          style={{ width: "68%" }}
          p={2}
          position="absolute"
          top={0}
          left="16%"
          zIndex="200"
        >
          <Card className={props.classes.statusCard} variant="outlined">
            <CardContent>
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
                    activeStep={arStatusId}
                    onClick={() => {
                      isRole("FINANCE") && handleNext(arStatusId);
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
            </CardContent>
          </Card>
        </Box>
      </Grow>
    </>
  );
}
