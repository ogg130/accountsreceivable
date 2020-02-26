import React, { forwardRef } from "react";
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
import { toast } from "react-toastify";
import { css } from "glamor";
import { isRole } from "./common/functions";

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

export default function CreateStepper(props) {
  const steps = getSteps();

  return (
    <>
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
            activeStep={0}
            onClick={() => {
              isRole("FINANCE") &&
                toast.error(
                  "Please save your new AR before attempting to change the status.",
                  {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    className: css({
                      background: "#B42C01 !important"
                    })
                  }
                );
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
