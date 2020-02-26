import React, { useState, useEffect, useContext } from "react";
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
import CreateStepper from "./CreateStepper";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import MomentUtils from "@date-io/moment";
import InputAdornment from "@material-ui/core/InputAdornment";
import { useDidMount } from "./useDidMount";
import Input from "@material-ui/core/Input";
import axios from "axios";
import Slide from "@material-ui/core/Slide";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import Fade from "@material-ui/core/Fade";
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
  denumerateStatus,
  isRole,
  fundsUsedPercentage,
  currencyValidator,
  drawerIsComplete,
  arAuthHeader
} from "./common/functions";
import arImage from "../resources/img/createarimage.png";
import arText from "../resources/img/createartext.png";

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
    height: 930,
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
    width: drawerWidth
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
    top: 100,
    left: 80
  }
}));

export default function ArDrawerCreate(props) {
  const arContext = useContext(ArContext);

  const {
    actualCompletion,
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
    setAsset,
    setType,
    arIndex,
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
    fundsUsed,
    asset,
    type,
    createFlag,
    setCreateFlag,
    setPrRows,
    setPrRow,
    setCostCenterList,
    setStatusList,
    setOwnerList,
    setDirectorList,
    setSiteList
  } = arContext;

  const siteList = JSON.parse(sessionStorage.getItem("siteList"));
  const statusList = JSON.parse(sessionStorage.getItem("statusList"));
  const costCenterList = JSON.parse(sessionStorage.getItem("costCenterList"));
  const directorList = JSON.parse(sessionStorage.getItem("directorList"));
  const ownerList = JSON.parse(sessionStorage.getItem("ownerList"));

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
  const [initialStartDate, setInitialStartDate] = useState(new Date());
  const [initialEndDate, setInitialEndDate] = useState(new Date());
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

  const [isChanged, setIsChanged] = useState(false);
  const [rowCount, setRowCount] = useState(false); // Used to set the row the use just created after the grid is rendered with changes

  const isMount = useDidMount();
  const setEmptyAr = () => {
    setDrawerComments("");
    setDrawerPurpose("");
    setDrawerBenefits("");
    setDrawerRisks("");
    setDrawerArNumber("");

    setDrawerArStatus("AR Pending");
    setDrawerArStatusId(1);
    setDrawerProjectName("");
    setDrawerCostCenter("");
    setDrawerSite("");
    setDrawerOwner("");
    setDrawerDirector("");
    setDrawerStartDate(null);
    setDrawerEndDate(null);
    setDrawerAmount(0);
    setDrawerCommitted(0);
    setDrawerAsset("");
    setDrawerType("");
    setDrawerActualCompletion(0);
    setDrawerFundsUsed(0);

    setCreateFlag(false); //Turn this off so the create routine can run the next time
  };
  const setArs = () => {
    axios
      .get("https://localhost:6001/api/v1/ar", {
        headers: { Authorization: arAuthHeader }
      })
      .then(result => {
        setArRows(result.data);
        setRowCount(result.data.length);
        setRefetchGrid(false);
      });
  };

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
    //alert("create");
    if (createFlag === true) {
      //alert("empty ar");
      setEmptyAr();
    }
  }, [createFlag]);

  // If this is not a page render and is a refetch is triggered by code, query
  // the AR API and render set arRows(ArDataGrid's datasource)
  useEffect(() => {
    if (!isMount && refetchGrid) {
      setArs();
    }
  }, [refetchGrid]);

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

  const handleActualCompletionChange = value => {
    if (isRole("FINANCE") || isRole("OWNER") || isRole("DIRECTOR")) {
      setDrawerActualCompletion(value);
      setIsChanged(true);
    }
  };

  const handleFundsUsedChange = value => {
    if (isRole("FINANCE") || isRole("OWNER") || isRole("DIRECTOR")) {
      drawerAmount === "" && setDrawerAmount(0);
      const fundsDecimal = drawerFundsUsed / 100;
      const roundedDecimal = parseFloat(fundsDecimal.toFixed(2)) * amount;

      setDrawerFundsUsed(value);
      setDrawerCommitted(roundedDecimal);
      setIsChanged(true);
    }
  };

  const handleFundsUsedCommitted = value => {
    setDrawerFundsUsed(fundsUsedPercentage(drawerCommitted, drawerAmount));
  };

  const handleAmountChange = value => {
    if (isRole("FINANCE") || isRole("OWNER") || isRole("DIRECTOR")) {
      //const filteredInput = value.replace("-", "");
      setDrawerAmount(value);
      setDrawerFundsUsed(fundsUsedPercentage(drawerCommitted, value));
      setIsChanged(true);
    }
  };

  const handleCommittedChange = value => {
    if (isRole("FINANCE") || isRole("DIRECTOR") || isRole("OWNER")) {
      //const filteredInput = value.replace("-", "");

      setDrawerCommitted(value);
      setDrawerFundsUsed(fundsUsedPercentage(value, drawerAmount));
      setIsChanged(true);
    }
  };

  const classes = useStyles();
  const theme = useTheme();

  const handleYes = () => {
    setDrawerArStatus("AR Pending");
    setDrawerArStatusId(1);

    setDrawerFundsUsed(fundsUsedPercentage(drawerCommitted, drawerAmount));
    toast.success(
      `Project amount changed, status for AR${drawerArNumber} changed to AR Pending`,
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

  const handleTypeChange = value => {
    setDrawerType(value);
  };

  const handleAssetChange = value => {
    setDrawerAsset(value);
    setIsChanged(true);
  };

  const handleSaveDialogClose = () => {
    setIsChanged(true);
  };

  const handleSliderChange = value => {
    if (isRole("FINANCE") || isRole("OWNER") || isRole("DIRECTOR")) {
      setDrawerActualCompletion(value);
    }
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
      return item.scheduleTypeID;
    }
    return null;
  };

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
        enteredById: userId,
        siteID: getSiteId(drawerSite),
        status: drawerArStatusId + 1,
        asset: 1,
        type: 1
      };

      axios
        .post(`https://localhost:6001/api/v1/ar`, ar, {
          headers: { Authorization: arAuthHeader }
        })
        .then(response => {
          toast.success(
            `Project: ${drawerProjectName} has been created and submitted for finance approval.`,
            {
              position: toast.POSITION.BOTTOM_RIGHT,
              className: css({
                background: "#008767 !important"
              })
            }
          );
          setRefetchGrid(true);
          setCreateFlag(false);
          setIsChanged(false);
          setArIndex([]);
          setArRow([]);

          setPrRows([]);
          setPrRow([]);

          setArId(0);
          setArStatusId(-1);
          setArStatus("");
          setComments("");
          setPurpose("");
          setBenefits("");
          setRisks("");
          setArNumber("");
          setProjectName("");
          setCostCenter("");
          setSite("");
          setOwner("");
          setDirector("");
          setStartDate(null);
          setEndDate(null);
          setAmount("");
          setCommitted("");
          setAsset("");
          setType("");

          /*         setArStatusId(drawerArStatusId);
          setArStatus(denumerateStatus(drawerArStatusId));
          setComments(drawerComments);
          setPurpose(drawerPurpose);
          setBenefits(drawerBenefits);
          setRisks(drawerRisks);
          setArNumber(null);
          setArStatus(drawerArStatus);
          setArStatusId(drawerArStatusId);
          setProjectName(drawerProjectName);
          setCostCenter(drawerCostCenter);
          setSite(drawerSite);
          setOwner(drawerOwner);
          setDirector(drawerDirector);
          setStartDate(drawerStartDate);
          setEndDate(drawerEndDate);
          setAmount(drawerAmount);
          setCommitted(drawerCommitted);
          setAsset("Land");
          setType("Land");
   */ setActualCompletion(
            drawerActualCompletion
          );

          setFundsUsed(0);
        })
        .catch(e => {
          toast.error(
            `There was a problem trying to create the project. Please contact MIS for resolution.`,
            {
              position: toast.POSITION.BOTTOM_RIGHT,
              className: css({
                background: "#B42C01 !important"
              })
            }
          );
        });
      props.onDrawerClose();
    }
  };

  const handleSaveNo = () => {
    // Reset any changed values to intial values

    setDrawerArStatusId(initialStatusId);

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
    setDrawerArNumber(initialArNumber);
    setArStatusId(initialStatusId);
    //status name needed?
    setDrawerAsset(initialAsset);
    setDrawerType(initialType);

    setCreateFlag(false);
    setIsChanged(false);
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
                    isRole("DIRECTOR") ||
                    isRole("OWNER")
                  )
                    setDrawerPurpose(event.target.value);
                  setIsChanged(true);
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
                    isRole("DIRECTOR") ||
                    isRole("OWNER")
                  )
                    setDrawerBenefits(event.target.value);
                  setIsChanged(true);
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
                    isRole("DIRECTOR") ||
                    isRole("OWNER")
                  )
                    setDrawerRisks(event.target.value);
                  setIsChanged(true);
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
                    isRole("DIRECTOR") ||
                    isRole("OWNER")
                  )
                    setDrawerComments(event.target.value);
                  setIsChanged(true);
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
      <Drawer
        className={classes.drawer}
        anchor="left"
        open={props.drawerOpen}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <CreateStepper />
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
                      Project Description:
                    </Typography>
                  </Grid>
                  <Grid className={classes2.paper} item xs={8} sm={8}>
                    <Input
                      autoFocus
                      align="left"
                      id="projectName"
                      value={drawerProjectName}
                      onChange={event => {
                        if (
                          isRole("FINANCE") ||
                          isRole("OWNER") ||
                          isRole("DIRECTOR")
                        ) {
                          setDrawerProjectName(event.target.value);
                        }
                      }}
                      onBlur={event => {
                        if (
                          isRole("FINANCE") ||
                          isRole("DIRECTOR") ||
                          isRole("OWNER")
                        )
                          setIsChanged(true);
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
                          variant="outlined"
                        >
                          <InputLabel
                            style={{ backgroundColor: "white" }}
                            id="siteLabel"
                          >
                            Site
                          </InputLabel>

                          <Select
                            labelId="siteLabel"
                            id="site"
                            value={drawerSite}
                            onChange={event => {
                              if (
                                isRole("FINANCE") ||
                                isRole("DIRECTOR") ||
                                isRole("OWNER")
                              )
                                setDrawerSite(event.target.value);
                              setIsChanged(true);
                            }}
                          >
                            {siteList &&
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
                            style={{ backgroundColor: "white" }}
                            id="owner"
                          >
                            <Typography style={{ fontWeight: "bold" }}>
                              Owner
                            </Typography>
                          </InputLabel>
                          <Select
                            size="small"
                            labelId="owner"
                            id="owner"
                            value={drawerOwner}
                            onChange={event => {
                              if (
                                isRole("FINANCE") ||
                                isRole("DIRECTOR") ||
                                isRole("OWNER")
                              )
                                setDrawerOwner(event.target.value);
                              setIsChanged(true);
                            }}
                          >
                            {ownerList &&
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
                            style={{ backgroundColor: "white" }}
                            id="site"
                          >
                            <Typography style={{ fontWeight: "bold" }}>
                              Cost Center
                            </Typography>
                          </InputLabel>
                          <Select
                            size="small"
                            labelId="costCenter"
                            id="costCenter"
                            value={drawerCostCenter}
                            onChange={event => {
                              if (
                                isRole("FINANCE") ||
                                isRole("DIRECTOR") ||
                                isRole("OWNER")
                              )
                                setDrawerCostCenter(event.target.value);
                              setIsChanged(true);
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
                            style={{ backgroundColor: "white" }}
                            id="director"
                          >
                            <Typography style={{ fontWeight: "bold" }}>
                              Director
                            </Typography>
                          </InputLabel>
                          <Select
                            size="small"
                            labelId="director"
                            id="director"
                            value={drawerDirector}
                            onChange={event => {
                              if (
                                isRole("FINANCE") ||
                                isRole("DIRECTOR") ||
                                isRole("OWNER")
                              )
                                setDrawerDirector(event.target.value);
                              setIsChanged(true);
                            }}
                          >
                            {directorList &&
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
                            label={
                              <Typography style={{ fontWeight: "bold" }}>
                                Start Date
                              </Typography>
                            }
                            format="MM/DD/YYYY"
                            value={drawerStartDate}
                            onChange={date => {
                              if (
                                isRole("FINANCE") ||
                                isRole("DIRECTOR") ||
                                isRole("OWNER")
                              )
                                setDrawerStartDate(date);
                              setIsChanged(true);
                              return drawerStartDate;
                            }}
                            inputProps={{ readOnly: true }}
                          />
                        </MuiPickersUtilsProvider>

                        <MuiPickersUtilsProvider utils={MomentUtils}>
                          <KeyboardDatePicker
                            size="small"
                            autoOk
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
                              if (
                                isRole("FINANCE") ||
                                isRole("DIRECTOR") ||
                                isRole("OWNER")
                              )
                                handleEndDateChange(date);
                              return drawerEndDate;
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
                            );
                          }}
                          onChange={event => {
                            if (
                              isRole("FINANCE") ||
                              isRole("DIRECTOR") ||
                              isRole("OWNER")
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
                              drawerAmount,
                              drawerOwner,
                              drawerDirector
                            );
                          }}
                          onChange={event => {
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
                            onChange={handleSliderChange}
                            value={drawerActualCompletion}
                          />
                          <h4>{drawerActualCompletion}% Actual Completion</h4>
                        </Paper>
                      </Paper>
                    </Grid>
                    <Grid
                      component="label"
                      container
                      spacing={3}
                      style={{ paddingBottom: 10 }}
                    >
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
                      </Grid>
                      <Grid item xs={4} sm={4}></Grid>
                    </Grid>
                  </Grid>
                  <Grid
                    component="label"
                    container
                    spacing={3}
                    style={{ paddingTop: 100 }}
                  >
                    <Grid item xs={12} sm={12}>
                      <Fade in={true} timeout={3000}>
                        <div className={classes.parent}>
                          <img
                            className={classes.arImage}
                            src={arImage}
                            height="200"
                            alt="Accounts Receivable"
                          />
                          <Slide direction="right" timeout={3000} in={true}>
                            <img
                              src={arText}
                              className={classes.arText}
                              alt="Accounts Receivable"
                            />
                          </Slide>
                        </div>
                      </Fade>
                    </Grid>
                  </Grid>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Drawer>
    </div>
  );
}
