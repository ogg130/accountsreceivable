import React, { useState, useEffect, useContext, useRef } from "react";
import {
  fundsUsedPercentage,
  enumerateStatus,
  denumerateStatus,
  drawerIsComplete
} from "./common/functions";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import ThreshHoldSlider from "./ThreshHoldSlider";
import EditStepper from "./EditStepper";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import MomentUtils from "@date-io/moment";
import InputAdornment from "@material-ui/core/InputAdornment";
import DepreciationSchedule from "./DepreciationSchedule";
import axios from "axios";
import { useDidMount } from "./useDidMount";
import { useForceUpdate } from "./useForceUpdate";

import Input from "@material-ui/core/Input";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import "./styles.css";
import Select from "@material-ui/core/Select";
import { ArContext } from "./context";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Draggable from "react-draggable";
import { toast } from "react-toastify";
import { css } from "glamor";
import {
  isRole,
  currencyValidator,
  dateValidator,
  arAuthHeader
} from "./common/functions";
import arImage from "../resources/img/editarimage.png";
import arText from "../resources/img/editartext.png";
import Slide from "@material-ui/core/Slide";

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

const drawerWidth = 768;

const useStyles2 = makeStyles(theme => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200,
      flexGrow: 1
    }
  },
  paper: {
    elevation: 3,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  list: {
    width: 700
  },
  fullList: {
    width: "auto"
  },
  card: {
    minWidth: 275,
    marginLeft: 20
  }
}));

const useStyles3 = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(2),
    minWidth: 200
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth,
    overflowX: "hidden"
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(2, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
    marginBottom: 25
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },
  parent: {
    position: "relative",
    top: 0,
    left: 0
  },
  arImage: {
    position: "relative",
    top: 0,
    left: 0
  },
  arText: {
    position: "absolute",
    top: 0,
    left: 70
  }
}));

export default function ArDrawerEdit(props) {
  const arContext = useContext(ArContext);
  const isMount = useDidMount();
  const {
    setEditFlag,
    asset,
    setScheduleData,
    setTypeList,
    setAssetList,
    type,
    actualCompletion,
    fundsUsed,
    amount,
    arNumber,
    committed,
    costCenter,
    director,
    endDate,
    owner,
    projectName,
    site,
    startDate,
    comments,
    risks,
    benefits,
    purpose,
    arRow,
    arStatusId,
    arStatus,
    userId,
    arId,
    setArRows,
    setArStatusId,
    setArStatus,
    setComments,
    setPurpose,
    setBenefits,
    setRisks,
    setArRow,
    setArId,
    setArIndex,
    setArNumber,
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
    arRows,
    setAsset,
    setType,
    arIndex,
    initFlag,
    setDrawerComments,
    setDrawerPurpose,
    setDrawerBenefits,
    setDrawerRisks,
    setDrawerArNumber,
    setDrawerArStatus,
    setDrawerArStatusId,
    setDrawerProjectName,
    setDrawerCostCenter,
    setDrawerSite,
    setDrawerOwner,
    setDrawerDirector,
    setDrawerStartDate,
    setDrawerEndDate,
    setDrawerAmount,
    setDrawerCommitted,
    setDrawerAsset,
    setDrawerType,
    setDrawerActualCompletion,
    setDrawerFundsUsed,
    drawerComments,
    drawerPurpose,
    drawerBenefits,
    drawerRisks,
    drawerArNumber,
    drawerArStatus,
    drawerArStatusId,
    drawerProjectName,
    drawerCostCenter,
    drawerSite,
    drawerOwner,
    drawerDirector,
    drawerStartDate,
    drawerEndDate,
    drawerAmount,
    drawerCommitted,
    drawerAsset,
    drawerType,
    drawerActualCompletion,
    drawerFundsUsed,
    editFlag,
    setCostCenterList,
    setStatusList,
    setOwnerList,
    setDirectorList,
    setSiteList
  } = arContext;

  const typeList = JSON.parse(sessionStorage.getItem("typeList"));
  const assetList = JSON.parse(sessionStorage.getItem("assetList"));
  const siteList = JSON.parse(sessionStorage.getItem("siteList"));
  const statusList = JSON.parse(sessionStorage.getItem("statusList"));
  const costCenterList = JSON.parse(sessionStorage.getItem("costCenterList"));
  const directorList = JSON.parse(sessionStorage.getItem("directorList"));
  const ownerList = JSON.parse(sessionStorage.getItem("ownerList"));

  const [helperText, setHelperText] = useState(""); //Validation text for inputs
  const [error, setError] = useState(""); // to determine if an input is in an error state
  const [rowCount, setRowCount] = useState(false); // Used to set the row the use just created after the grid is rendered with changes

  const [refetchGrid, setRefetchGrid] = useState(false);
  const classes3 = useStyles3();

  const classes2 = useStyles2();

  const [initialStatusId, setInitialStatusId] = useState(0);
  const [initialArNumber, setInitialArNumber] = useState("");
  const [initialSite, setInitialSite] = useState("");
  const [initialOwner, setInitialOwner] = useState("");
  const [initialCostCenter, setInitialCostCenter] = useState("");
  const [initialDirector, setInitialDirector] = useState("");
  const [initialProjectName, setInitialProjectName] = useState("");
  const [initialStartDate, setInitialStartDate] = useState("");
  const [initialEndDate, setInitialEndDate] = useState("");
  const [initialAmount, setInitialAmount] = useState(0);
  const [initialCommitted, setInitialCommitted] = useState(0);
  const [initialActualCompletion, setInitialActualCompletion] = useState(0);
  const [initialFundsUsed, setInitialFundsUsed] = useState(0);
  const [initialComments, setInitialComments] = useState("");
  const [initialBenefits, setInitialBenefits] = useState("");
  const [initialRisks, setInitialRisks] = useState("");
  const [initialPurpose, setInitialPurpose] = useState("");
  const [initialAsset, setInitialAsset] = useState("");
  const [initialType, setInitialType] = useState("");

  const [amountChanged, setAmountChanged] = useState(false); // If true, the user has changed amount and then cancelled changes

  const setInitialValues = () => {
    setDrawerArNumber(arNumber);
    setDrawerArStatusId(arStatusId);
    setDrawerArStatus(arStatus);
    setDrawerSite(site);
    setDrawerOwner(owner);
    setDrawerCostCenter(costCenter);
    setDrawerDirector(director);
    setDrawerProjectName(projectName);
    setDrawerStartDate(startDate);
    setDrawerEndDate(endDate);
    setDrawerAmount(parseFloat(amount).toFixed(2));
    setDrawerCommitted(parseFloat(committed).toFixed(2));
    setDrawerActualCompletion(actualCompletion);
    setDrawerFundsUsed(fundsUsed);
    setDrawerComments(comments);
    setDrawerBenefits(benefits);
    setDrawerRisks(risks);
    setDrawerPurpose(purpose);
    setDrawerAsset(asset);
    setDrawerType(type);

    setInitialType(type);
    setInitialAsset(asset);
    setInitialStatusId(arStatusId);
    setInitialArNumber(arNumber);
    setInitialSite(site);
    setInitialOwner(owner);
    setInitialCostCenter(costCenter);
    setInitialDirector(director);
    setInitialProjectName(projectName);
    setInitialStartDate(startDate);
    setInitialEndDate(endDate);
    setInitialAmount(parseFloat(amount).toFixed(2));
    setInitialCommitted(parseFloat(committed).toFixed(2));
    setInitialActualCompletion(actualCompletion);
    setInitialFundsUsed(fundsUsed);
    setInitialComments(comments);
    setInitialBenefits(benefits);
    setInitialRisks(risks);
    setInitialPurpose(purpose);

    setEditFlag(false); // Turn this off so the edit routine can run the next time
  };

  const [isChanged, setIsChanged] = useState(false);
  const startDateRef = useRef(null);
  const endDateRef = useRef(null);

  const setArs = () => {
    axios
      .get("https://localhost:6001/api/v1/ar", {
        headers: { Authorization: arAuthHeader }
      })
      .then(result => {
        setArRows(result.data);
        setRowCount(result.data.length);
      });
  };

  // If this is a page render, a refetch triggered by code, a status stepper status
  // change, an AR grid index change or an edit record that a user backed out,
  // we want to set or reset the drawer to its initial values before any changes might
  // have bene made by the user.

  // If any of the above is not a page render, we also want to refresh the data grid
  // so that those changes are instantly viewable by the user.
  useEffect(() => {
    setCostCenters();
    setSites();
    setOwners();
    setDirectors();
    setStatuses();
  }, []);

  const setDirectors = () => {
    axios
      .get("https://localhost:5001/api/v1/user/director", {
        headers: { Authorization: arAuthHeader }
      })
      .then(result => {
        sessionStorage.setItem("directorList", JSON.stringify(result.data));
        setDirectorList(result.data);
      });
  };

  const setOwners = () => {
    axios
      .get("https://localhost:5001/api/v1/user/owner", {
        headers: { Authorization: arAuthHeader }
      })
      .then(result => {
        sessionStorage.setItem("ownerList", JSON.stringify(result.data));
        setOwnerList(result.data);
      });
  };

  const setSites = () => {
    axios
      .get("https://localhost:7001/api/v1/site", {
        headers: { Authorization: arAuthHeader }
      })
      .then(result => {
        setSiteList(result.data);
        sessionStorage.setItem("siteList", JSON.stringify(result.data));
      });
  };

  const setStatuses = () => {
    axios
      .get("https://localhost:4001/api/v1/statuslevel", {
        headers: { Authorization: arAuthHeader }
      })
      .then(result => {
        setStatusList(result.data);
        sessionStorage.setItem("statusList", JSON.stringify(result.data));
      });
  };

  const setCostCenters = () => {
    axios
      .get("https://localhost:9001/api/v1/costcenter", {
        headers: { Authorization: arAuthHeader }
      })
      .then(result => {
        setCostCenterList(result.data);
        sessionStorage.setItem("costCenterList", JSON.stringify(result.data));
      });
  };
  useEffect(() => {
    if (!isMount) {
      setArs();
    }
  }, [arStatusId, arNumber, arIndex]);

  useEffect(() => {
    if (!isMount) {
      setArs();
      setRefetchGrid(false);
    }
  }, [refetchGrid]);

  useEffect(() => {
    if (editFlag === true) {
      setInitialValues();
    }
  }, [editFlag]);

  /*   useEffect(() => {
    setScheduleFromAssetChange();
  }, [drawerAsset]);

  useEffect(() => {
    setSchedule();
  }, [drawerType]);
 */
  const setSchedule = () => {
    drawerAsset !== "" &&
      typeof drawerAsset !== "undefined" &&
      drawerAsset !== null &&
      axios
        .get(
          `https://localhost:6001/api/v1/scheduletype/${getAssetId(
            drawerAsset
          )}/value/${amount}`,
          { headers: { Authorization: arAuthHeader } }
        )
        .then(result => {
          setScheduleData(result.data);
          sessionStorage.setItem("scheduleData", JSON.stringify(result.data));
        });
  };

  /* useEffect(() => {
    setScheduleFromAssetChange();
  }, [drawerAsset]);
 */
  const setScheduleFromAssetChange = () => {
    drawerAsset !== "" &&
      typeof drawerAsset !== "undefined" &&
      drawerAsset !== null &&
      axios
        .get(
          `https://localhost:6001/api/v1/scheduletype/${getAssetId(
            drawerAsset
          )}?asset=true`,
          { headers: { Authorization: arAuthHeader } }
        )
        .then(result => {
          setTypeList(result.data);
          setDrawerType(result.data[0].value);
          let x = sessionStorage.setItem(
            "typeList",
            JSON.stringify(result.data)
          );

          axios
            .get(
              `https://localhost:6001/api/v1/scheduletype/${result.data[0].value}/value/${amount}`,
              { headers: { Authorization: arAuthHeader } }
            )
            .then(result => {
              setScheduleData(result.data);
              sessionStorage.setItem(
                "scheduleData",
                JSON.stringify(result.data)
              );
            });
        });
  };

  const [dropDownValue, setDropDownValue] = useState(false);

  // Ignore page renders - if the user has changed the asset list value,
  // query the AR api scheduletype endpoint render the list of values that
  // the child select, 'type' relies upon. Also, set the default value of
  // the select to the first value in the list.
  /*   useEffect(() => {
    //alert(7 + " " + arNumber + " " + arIndex + " " + arId + " " + arRow);
    if (!isMount) {
      // This is being ran twice in lieu of better
      // options and a few different attempts
      //
      // This is to get the child(type) dropdown list to
      // properly refresh its backing list which is dependent
      // upon the parent(asset) list's data. A parent list change would
      // make the child list not refresh and then a second parent
      // change would make the child list have the list contents
      // for the previous selection when running once.
      setTypes();
      setTypes();
      // Not really sure whats up with this and needing to
      // run this twice to get the child dropdown to render
      // its dependent list and first record in the list,
      // but here we are....
    }
  }, [drawerAsset]); */

  const handleEndDateChange = date => {
    setDrawerEndDate(date);
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

  const getAssetId = value => {
    if (
      assetList.length > 0 &&
      value !== "" &&
      value !== null &&
      value !== null
    ) {
      var item = assetList.find(r => r.value === value);
      if (typeof item !== "undefined") {
        return item.scheduleAssetID;
      } else {
        return null;
      }
    }
    return null;
  };

  const getTypeId = value => {
    if (typeList.length > 0) {
      var item = typeList.find(r => r.value === value);
      if (typeof item === "undefined") {
        return null;
      }
      return item.scheduleTypeID;
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

  const currentUserFullName = sessionStorage.getItem("fullName");

  const handleAmountBlur = () => {
    if (
      isRole("FINANCE") ||
      (isRole("OWNER") && currentUserFullName === drawerOwner) ||
      (isRole("DIRECTOR") && currentUserFullName === drawerDirector)
    ) {
      if (drawerAmount !== initialAmount) {
        setOpen(true);
      }
    }
  };

  const handleAmountChange = value => {
    if (
      isRole("FINANCE") ||
      (isRole("OWNER") && currentUserFullName === drawerOwner) ||
      (isRole("DIRECTOR") && currentUserFullName === drawerDirector)
    ) {
      //const filteredInput = value.replace("-", "");

      setDrawerAmount(value);
      setAmountChanged(true); // Signify that the amount has changed
      setDrawerFundsUsed(fundsUsedPercentage(drawerCommitted, value));
    }
  };

  const handleSliderChange = value => {
    if (
      isRole("FINANCE") ||
      (isRole("OWNER") && currentUserFullName === drawerOwner) ||
      (isRole("DIRECTOR") && currentUserFullName === drawerDirector)
    ) {
      setDrawerActualCompletion(value);

      setIsChanged(true);
    }
  };

  const handleFundsUsedCommitted = value => {
    setDrawerFundsUsed(fundsUsedPercentage(drawerCommitted, drawerAmount));
  };

  const handleFundsUsedChange = value => {
    if (
      isRole("FINANCE") ||
      (isRole("OWNER") && currentUserFullName === drawerOwner) ||
      (isRole("DIRECTOR") && currentUserFullName === drawerDirector)
    ) {
      drawerAmount === "" && setDrawerAmount(0);
      const fundsDecimal = drawerFundsUsed / 100;
      const roundedDecimal = parseFloat(fundsDecimal.toFixed(2)) * amount;

      setDrawerFundsUsed(value);
      setDrawerCommitted(roundedDecimal);
      setIsChanged(true);
    }
  };

  const handleCommittedChange = value => {
    if (
      isRole("FINANCE") ||
      (isRole("OWNER") && currentUserFullName === drawerOwner) ||
      (isRole("DIRECTOR") && currentUserFullName === drawerDirector)
    ) {
      //const filteredInput = value.replace("-", "");
      setDrawerCommitted(value);
      setDrawerFundsUsed(fundsUsedPercentage(value, drawerAmount));
      setIsChanged(true);
    }
  };

  const classes = useStyles();
  const theme = useTheme();

  const [open, setOpen] = useState(false);

  const handleNo = () => {
    // If a user has clicked no here close the confirm status dialog
    setOpen(false);

    // ...and reset amount flag and field to initial states
    setDrawerAmount(initialAmount);
    setAmountChanged(false);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleYes = event => {
    setIsChanged(true);
    setOpen(false);

    setDrawerArStatus("AR Pending");
    setDrawerArStatusId(1);
    setDrawerFundsUsed(fundsUsedPercentage(drawerCommitted, drawerAmount));

    toast.success(
      `The status of this project will be changed to "AR Pending" once you save changes.`,
      {
        position: toast.POSITION.BOTTOM_RIGHT,
        className: css({
          background: "#008767 !important"
        })
      }
    );
  };
  const [commentsDialogOpen, setCommentsDialogOpen] = useState(false);

  const handleCommentsDialogClose = () => {
    setCommentsDialogOpen(false);
  };

  const currentUserId = sessionStorage.getItem("userId");

  const handleSaveYes = () => {
    const fields = [
      drawerProjectName,
      drawerSite,
      drawerOwner,
      drawerCostCenter,
      drawerDirector,
      drawerStartDate,
      drawerEndDate,
      drawerAmount,
      drawerCommitted
    ];
    const errors = drawerIsComplete(fields);
    if (errors.length > 0) {
      toast.error(
        <div>
          The following issues must be resolved before you may save your new
          project: <br />
          <br />
          {errors.map(error => (
            <ul key={error}>
              <li style={{ paddingLeft: 10 }}> {error}</li>
            </ul>
          ))}
        </div>,
        {
          position: toast.POSITION.BOTTOM_RIGHT,
          className: css({
            background: "#B42C01 !important"
          })
        }
      );
    } else {
      const ar = {
        arId: arId,
        arNumber: drawerArNumber,
        costCenter: getCostCenterId(drawerCostCenter),
        projectName: drawerProjectName,
        directorID: getUserId(drawerDirector, directorList),
        actualPercent: drawerActualCompletion,
        ownerID: getUserId(drawerOwner, ownerList),
        amount: drawerAmount,
        committed: drawerCommitted,
        endDate: drawerEndDate,
        startDate: drawerStartDate,
        comments: drawerComments,
        purpose: drawerPurpose,
        benefits: drawerBenefits,
        risks: drawerRisks,
        changesQueued: false,
        enteredDate: new Date(),
        enteredById: currentUserId,
        siteID: getSiteId(drawerSite),
        status: drawerArStatusId + 1,
        asset: 1,
        type: 1
      };

      axios
        .put(`https://localhost:6001/api/v1/ar/${arId}`, ar, {
          headers: { Authorization: arAuthHeader }
        })
        .then(r => {
          toast.success(
            `Changes made to Project: ${projectName} have been saved.`,
            {
              position: toast.POSITION.BOTTOM_RIGHT,
              className: css({
                background: "#008767 !important"
              })
            }
          );
          setOpen(false);
          setRefetchGrid(true);
          setIsChanged(false);
          setAmountChanged(false); // reset flag which inidicates amount change to initial value

          // These are important and keep form values updated on the page after changes
          setArNumber(drawerArNumber);
          setArStatusId(drawerArStatusId);
          setProjectName(drawerProjectName);
          setArStatus(drawerArStatus);
          setFundsUsed(drawerFundsUsed);
          setCommitted(parseFloat(drawerCommitted).toFixed(2));
          setSite(drawerSite);
          setOwner(drawerOwner);
          setCostCenter(drawerCostCenter);
          setDirector(drawerDirector);
          setActualCompletion(drawerActualCompletion);
          setStartDate(drawerStartDate);
          setEndDate(drawerEndDate);
          setAmount(parseFloat(drawerAmount).toFixed(2));
          setAsset(drawerAsset);
          setType(drawerType);
          setComments(drawerComments);
          setRisks(drawerRisks);
          setBenefits(drawerBenefits);
          setPurpose(drawerPurpose);
        });
      /*   toast.error(
        `There was a problem trying to update the project. Please contact MIS for resolution.`,
        {
          position: toast.POSITION.BOTTOM_RIGHT,
          className: css({
            background: "#B42C01 !important"
          })
        }
      ); */
      props.onDrawerClose();
    }
  };

  const handleSaveNo = () => {
    // Reset any changed values to intial values
    setDrawerArStatusId(initialStatusId);
    setDrawerArNumber(initialArNumber);
    setDrawerSite(initialSite);
    setDrawerOwner(initialOwner);
    setDrawerCostCenter(initialCostCenter);
    setDrawerDirector(initialDirector);
    setDrawerProjectName(initialProjectName);
    setDrawerStartDate(initialStartDate);
    setDrawerEndDate(initialEndDate);
    setDrawerAmount(initialAmount);
    setDrawerCommitted(initialCommitted);
    setDrawerActualCompletion(initialActualCompletion);
    setDrawerFundsUsed(initialFundsUsed);
    setDrawerComments(initialComments);
    setDrawerPurpose(initialPurpose);
    setDrawerBenefits(initialBenefits);
    setDrawerRisks(initialRisks);
    setArNumber(initialArNumber);
    setDrawerAsset(initialAsset);
    setDrawerType(initialType);

    setIsChanged(false);
  };

  const handleActiveStepChange = value => {
    setDrawerArStatusId(value + 1);
    setDrawerArStatus(denumerateStatus(value + 1));
    setIsChanged(true);
  };

  const handleDrawerArNumberChange = value => {
    setDrawerArNumber(value);
    setArNumber(value);
    setIsChanged(true);
  };

  const handleTypeChange = value => {
    if (isRole("FINANCE")) {
      setDrawerType(value);
      setIsChanged(true);
    }
  };

  const handleAssetChange = value => {
    if (isRole("FINANCE")) {
      setDrawerAsset(value);
      setDrawerType(1);
      setIsChanged(true);
    }
  };

  return (
    <div className={classes.root}>
      <CssBaseline />

      <Dialog
        maxWidth={"md"}
        open={commentsDialogOpen}
        onClose={handleCommentsDialogClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          View / Edit Comments
        </DialogTitle>
        <DialogContent>
          <Divider style={{ marginBottom: 20 }} />
          <Grid component="label" container spacing={3}>
            <Grid item xs={12} sm={12}>
              <TextField
                style={{ width: 500 }}
                id="purpose"
                label={
                  <Typography style={{ fontWeight: "bold" }}>
                    Purpose of Project
                  </Typography>
                }
                value={drawerPurpose}
                onChange={event => {
                  if (
                    isRole("FINANCE") ||
                    (isRole("OWNER") && currentUserFullName === drawerOwner) ||
                    (isRole("DIRECTOR") &&
                      currentUserFullName === drawerDirector)
                  ) {
                    setDrawerPurpose(event.target.value);
                    setIsChanged(true);
                  }
                }}
                multiline={true}
                rows={5}
                variant="outlined"
                size="small"
              />
            </Grid>
          </Grid>
          <Grid component="label" container spacing={3}>
            <Grid item xs={12} sm={12}>
              <TextField
                style={{ width: 500 }}
                id="benefits"
                label={
                  <Typography style={{ fontWeight: "bold" }}>
                    Opportunities / Benefits to be realized from project
                  </Typography>
                }
                value={drawerBenefits}
                onChange={event => {
                  if (
                    isRole("FINANCE") ||
                    (isRole("OWNER") && currentUserFullName === drawerOwner) ||
                    (isRole("DIRECTOR") &&
                      currentUserFullName === drawerDirector)
                  ) {
                    setDrawerBenefits(event.target.value);
                    setIsChanged(true);
                  }
                }}
                multiline={true}
                rows={5}
                variant="outlined"
                size="small"
              />
            </Grid>
          </Grid>
          <Grid component="label" container spacing={3}>
            <Grid item xs={12} sm={12}>
              <TextField
                style={{ width: 500 }}
                id="risks"
                label={
                  <Typography style={{ fontWeight: "bold" }}>
                    Risks inherit in project
                  </Typography>
                }
                value={drawerRisks}
                onChange={event => {
                  if (
                    isRole("FINANCE") ||
                    (isRole("OWNER") && currentUserFullName === drawerOwner) ||
                    (isRole("DIRECTOR") &&
                      currentUserFullName === drawerDirector)
                  ) {
                    setDrawerRisks(event.target.value);
                    setIsChanged(true);
                  }
                }}
                multiline={true}
                rows={5}
                variant="outlined"
                size="small"
              />
            </Grid>
          </Grid>
          <Grid component="label" container spacing={3}>
            <Grid item xs={12} sm={12}>
              <TextField
                style={{ width: 500 }}
                id="comments"
                label={
                  <Typography style={{ fontWeight: "bold" }}>
                    Other Comments
                  </Typography>
                }
                value={drawerComments}
                onChange={event => {
                  if (
                    isRole("FINANCE") ||
                    (isRole("OWNER") && currentUserFullName === drawerOwner) ||
                    (isRole("DIRECTOR") &&
                      currentUserFullName === drawerDirector)
                  ) {
                    setDrawerComments(event.target.value);
                    setIsChanged(true);
                  }
                }}
                multiline={true}
                rows={5}
                variant="outlined"
                size="small"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCommentsDialogClose} color="primary">
            Return
          </Button>
        </DialogActions>
      </Dialog>
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
            Changing a project amount will return the status to 'AR Pending'..
            Do you wish to continue?"
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleNo} color="primary">
            No
          </Button>
          <Button
            onClick={event => {
              handleYes(event);
            }}
            color="primary"
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Drawer
        className={classes.drawer}
        anchor="left"
        open={props.drawerOpen}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <EditStepper
            activeStep={drawerArStatusId}
            onActiveStepChange={handleActiveStepChange}
            onDrawerArNumberChange={handleDrawerArNumberChange}
          />
          <Button
            onClick={() => {
              props.onDrawerClose();
            }}
          >
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </Button>
        </div>
        <Grid component="label" container alignItems="center" spacing={3}>
          <Grid className={classes2.paper} item xs={12} sm={12}>
            <Card className={classes2.card} variant="outlined">
              <CardContent>
                <Grid
                  component="label"
                  container
                  alignItems="center"
                  spacing={3}
                >
                  <Grid className={classes2.paper} item xs={4} sm={4}>
                    <Typography variant="h6" align="right">
                      AR Number:
                    </Typography>
                  </Grid>
                  <Grid className={classes2.paper} item xs={8} sm={8}>
                    <Input
                      align="left"
                      id="arNumber"
                      value={drawerArNumber ? drawerArNumber : "Pending..."}
                      inputProps={{ "aria-label": "description" }}
                      style={{ width: 370 }}
                      onChange={event => {
                        if (isRole("FINANCE")) {
                          setDrawerArNumber(event.target.value);
                          setArNumber(event.target.value);
                          setIsChanged(true);
                          //TODO: Allowing finance to make this change will require integration with other apis in our live environment
                        }
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid
                  component="label"
                  container
                  alignItems="center"
                  spacing={3}
                >
                  <Grid className={classes2.paper} item xs={4} sm={4}>
                    <Typography variant="h6" align="right">
                      Project Description:
                    </Typography>
                  </Grid>
                  <Grid className={classes2.paper} item xs={8} sm={8}>
                    <Input
                      align="left"
                      id="projectName"
                      value={drawerProjectName}
                      onChange={event => {
                        if (isRole("FINANCE")) {
                          setDrawerProjectName(event.target.value);
                          setIsChanged(true);
                        }
                      }}
                      inputProps={{ "aria-label": "description" }}
                      style={{ width: 370 }}
                    />
                  </Grid>
                </Grid>
                <div className={classes2.root}>
                  <Grid container spacing={3}>
                    <Grid item xs={6} sm={6}>
                      <Paper
                        style={{ marginLeft: 50, width: 260 }}
                        className={classes2.paper}
                      >
                        <FormControl
                          style={{ marginTop: 10, textAlign: "left" }}
                          size="small"
                          className={classes3.formControl}
                        >
                          <InputLabel
                            variant="outlined"
                            id="site"
                            style={{ backgroundColor: "white" }}
                          >
                            Site
                          </InputLabel>

                          <Select
                            variant="outlined"
                            size="small"
                            labelId="site"
                            id="site"
                            value={drawerSite}
                            onChange={event => {
                              if (isRole("FINANCE")) {
                                setDrawerSite(event.target.value);
                                setIsChanged(true);
                              }
                            }}
                          >
                            {siteList !== null &&
                              siteList.map(site => (
                                <MenuItem key={site.siteID} value={site.code}>
                                  {site.code}
                                </MenuItem>
                              ))}
                          </Select>
                        </FormControl>

                        <FormControl
                          style={{ marginTop: -1, textAlign: "left" }}
                          size="small"
                          variant="outlined"
                          className={classes3.formControl}
                        >
                          <InputLabel
                            id="owner"
                            style={{ backgroundColor: "white" }}
                          >
                            Owner
                          </InputLabel>
                          <Select
                            size="small"
                            labelId="owner"
                            id="owner"
                            value={drawerOwner}
                            onChange={event => {
                              if (isRole("FINANCE")) {
                                setDrawerOwner(event.target.value);
                                setIsChanged(true);
                              }
                            }}
                          >
                            {ownerList !== null &&
                              ownerList.map(owner => (
                                <MenuItem
                                  key={owner.userID}
                                  value={`${owner.firstName} ${owner.lastName}`}
                                >
                                  {owner.firstName} {owner.lastName}
                                </MenuItem>
                              ))}
                          </Select>
                        </FormControl>
                        <FormControl
                          style={{ marginTop: 0, textAlign: "left" }}
                          size="small"
                          variant="outlined"
                          className={classes3.formControl}
                        >
                          <InputLabel
                            id="costCenter"
                            style={{ backgroundColor: "white" }}
                          >
                            Cost Center
                          </InputLabel>
                          <Select
                            size="small"
                            labelId="costCenter"
                            id="costCenter"
                            value={drawerCostCenter}
                            onChange={event => {
                              if (isRole("FINANCE")) {
                                setDrawerCostCenter(event.target.value);
                                setIsChanged(true);
                              }
                            }}
                          >
                            {costCenterList !== null &&
                              costCenterList.map(costCenter => (
                                <MenuItem
                                  key={costCenter.id}
                                  value={`${costCenter.value} (${costCenter.description})`}
                                >
                                  {costCenter.value} ({costCenter.description})
                                </MenuItem>
                              ))}
                          </Select>
                        </FormControl>

                        <FormControl
                          style={{ marginTop: 0, textAlign: "left" }}
                          size="small"
                          variant="outlined"
                          className={classes3.formControl}
                        >
                          <InputLabel
                            id="director"
                            style={{ backgroundColor: "white" }}
                          >
                            Director
                          </InputLabel>
                          <Select
                            size="small"
                            labelId="director"
                            id="director"
                            value={drawerDirector}
                            onChange={event => {
                              if (isRole("FINANCE")) {
                                setDrawerDirector(event.target.value);
                                setIsChanged(true);
                              }
                            }}
                          >
                            {directorList !== null &&
                              directorList.map(director => (
                                <MenuItem
                                  key={director.userID}
                                  value={`${director.firstName} ${director.lastName}`}
                                >
                                  {director.firstName} {director.lastName}
                                </MenuItem>
                              ))}
                          </Select>
                        </FormControl>
                        <Paper
                          style={{
                            marginTop: -8,
                            position: "relative",
                            width: 220
                          }}
                          className={classes2.paper}
                        >
                          <ThreshHoldSlider
                            value={drawerFundsUsed}
                            onChange={handleFundsUsedChange}
                          />
                          <h4>
                            {fundsUsedPercentage(drawerCommitted, drawerAmount)}
                            % of Funds Used
                          </h4>
                        </Paper>
                      </Paper>
                    </Grid>
                    <Grid item xs={6} sm={6}>
                      <Paper style={{ width: 260 }} className={classes2.paper}>
                        <MuiPickersUtilsProvider utils={MomentUtils}>
                          <KeyboardDatePicker
                            size="small"
                            autoOk
                            variant="inline"
                            inputVariant="outlined"
                            maxDate={new Date(drawerEndDate)}
                            label={
                              <Typography style={{ fontWeight: "bold" }}>
                                Start Date
                              </Typography>
                            }
                            format="MM/DD/YYYY"
                            value={drawerStartDate}
                            onChange={date => {
                              if (isRole("FINANCE")) {
                                setDrawerStartDate(date);
                                setIsChanged(true);
                              }
                            }}
                            inputProps={{ readOnly: true }}
                          />
                        </MuiPickersUtilsProvider>

                        <MuiPickersUtilsProvider utils={MomentUtils}>
                          <KeyboardDatePicker
                            size="small"
                            autoOk
                            minDate={new Date(drawerStartDate)}
                            variant="inline"
                            inputVariant="outlined"
                            label={
                              <Typography style={{ fontWeight: "bold" }}>
                                End Date
                              </Typography>
                            }
                            format="MM/DD/YYYY"
                            value={drawerEndDate}
                            inputProps={{ readOnly: true }}
                            onChange={date => {
                              if (isRole("FINANCE")) {
                                handleEndDateChange(date);
                              }
                            }}
                          />
                        </MuiPickersUtilsProvider>

                        <TextField
                          id="amount"
                          name="Amount"
                          label={
                            <Typography style={{ fontWeight: "bold" }}>
                              Amount
                            </Typography>
                          }
                          value={drawerAmount}
                          onBlur={event => {
                            currencyValidator(
                              event,
                              drawerAmount,
                              drawerOwner,
                              drawerDirector
                            ) !== null && handleAmountBlur();
                          }}
                          onChange={event => {
                            if (
                              isRole("FINANCE") ||
                              (isRole("OWNER") &&
                                currentUserFullName === drawerOwner) ||
                              (isRole("DIRECTOR") &&
                                currentUserFullName === drawerDirector)
                            )
                              handleAmountChange(event.target.value);
                          }}
                          variant="outlined"
                          size="small"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                $
                              </InputAdornment>
                            )
                          }}
                        />
                        <TextField
                          autoFocus
                          id="totalcommitted"
                          name="Total Committed"
                          label={
                            <Typography style={{ fontWeight: "bold" }}>
                              Total committed
                            </Typography>
                          }
                          value={drawerCommitted}
                          onBlur={event => {
                            currencyValidator(
                              event,
                              drawerCommitted,
                              drawerOwner,
                              drawerDirector
                            );
                          }}
                          onChange={event => {
                            if (
                              isRole("FINANCE") ||
                              (isRole("OWNER") &&
                                currentUserFullName === drawerOwner) ||
                              (isRole("DIRECTOR") &&
                                currentUserFullName === drawerDirector)
                            )
                              handleCommittedChange(event.target.value);
                          }}
                          variant="outlined"
                          size="small"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                $
                              </InputAdornment>
                            )
                          }}
                        />
                        <Paper className={classes2.paper}>
                          <ThreshHoldSlider
                            value={drawerActualCompletion}
                            onChange={handleSliderChange}
                          />
                          <h4>{drawerActualCompletion}% Actual Completion</h4>
                        </Paper>
                      </Paper>
                    </Grid>
                    <Grid container spacing={3} style={{ paddingBottom: 10 }}>
                      <Grid item xs={4} sm={4}>
                        <Button
                          style={{ marginLeft: 135 }}
                          onClick={() => {
                            setCommentsDialogOpen(true);
                          }}
                          variant="contained"
                          color="primary"
                        >
                          View / Edit Comments
                        </Button>
                      </Grid>
                      <Grid item xs={4} sm={4}>
                        {isChanged && (
                          <Button
                            style={{ marginLeft: 210 }}
                            onClick={() => {
                              handleSaveYes();
                            }}
                            variant="contained"
                            color="primary"
                          >
                            Save Changes
                          </Button>
                        )}
                      </Grid>
                      <Grid item xs={4} sm={4}></Grid>
                    </Grid>
                    {/*                     <DepreciationSchedule
                      asset={drawerAsset}
                      amount={drawerAmount}
                      type={drawerType}
                      onAssetChange={handleAssetChange}
                      onTypeChange={handleTypeChange}
                    /> */}
                  </Grid>
                </div>
              </CardContent>
            </Card>

            <div className={classes.parent}>
              <Slide in={true} direction="left" timeout={2500}>
                <img
                  src={arText}
                  className={classes.arText}
                  alt="Accounts Receivable"
                />
              </Slide>
              <Slide direction="right" timeout={1500} in={true} width={750}>
                <img
                  className={classes.arImage}
                  src={arImage}
                  alt="Accounts Receivable"
                />
              </Slide>
            </div>
          </Grid>
        </Grid>
      </Drawer>
    </div>
  );
}
