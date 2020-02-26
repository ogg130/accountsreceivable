import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ArContext } from "./context";
import axios from "axios";
import { toast } from "react-toastify";
import { css } from "glamor";
import {
  denumerateStatus,
  enumerateStatus,
  fundsUsedPercentage,
  arAuthHeader
} from "./common/functions";
import ArView from "./ArView";
import { useDidMount } from "./useDidMount";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff"
  },
  paper: {
    marginTop: -20,
    padding: theme.spacing(2),
    color: theme.palette.text.secondary
  },
  statuscard: {
    minWidth: 275
  },
  card: {
    height: 710
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
}));

function ArController() {
  const arContext = useContext(ArContext);

  const {
    setArId,
    setCostCenter,
    setPrRows,
    setAmount,
    setArRow,
    setArStatus,
    setArIndex,
    setAsset,
    setType,
    setArNumber,
    setProjectName,
    arNumber,
    setSite,
    setDirector,
    setOwner,
    setStartDate,
    setEndDate,
    setCommitted,
    setComments,
    setFundsUsed,
    setArStatusId,
    setActualCompletion,
    setArRows,
    setRisks,
    setBenefits,
    setPurpose,
    showWelcome,
    setShowWelcome,
    arId,
    arIndex,
    arRow,
    setInitFlag,
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
    setCreateFlag,
    createFlag,
    setEditFlag,
    editFlag,
    arStatusId,
    refetchGrid,
    setRefetchGrid
  } = arContext;

  const [editDrawerOpen, setEditDrawerOpen] = useState(false);
  const [createDrawerOpen, setCreateDrawerOpen] = useState(false);
  const classes = useStyles();
  const currentUserFullName = sessionStorage.getItem("fullName");
  const isMount = useDidMount();

  const handleCreateDrawerOpen = () => {
    setCreateDrawerOpen(true);
  };

  const handleEditDrawerClose = (isChanged, setIsChanged) => {
    if (isChanged) {
      setIsChanged(false);
    }
    setEditDrawerOpen(false);
  };

  const handleEditDrawerOpen = () => {
    setEditDrawerOpen(true);
  };

  const handleCreateDrawerClose = () => {
    setCreateDrawerOpen(false);
  };

  const setArs = () => {
    axios
      .get("https://localhost:6001/api/v1/ar", {
        headers: { Authorization: arAuthHeader }
      })
      .then(result => {
        setArRows(result.data);
        if (result.data[0]) {
          setComments(result.data[0].comments);
          setPurpose(result.data[0].purpose);
          setBenefits(result.data[0].benefits);
          setRisks(result.data[0].risks);
          setArId(result.data[0].arID);
          setArRow(result.data[0]);
          setArNumber(result.data[0].arNumber);
          setArStatus(result.data[0].status);
          setArStatusId(enumerateStatus(result.data[0].status));
          setProjectName(result.data[0].projectName);
          setCostCenter(result.data[0].costCenter);
          setSite(result.data[0].site);
          setOwner(result.data[0].owner);
          setDirector(result.data[0].director);
          setStartDate(result.data[0].startDate);
          setEndDate(result.data[0].endDate);
          setAmount(result.data[0].amount);
          setCommitted(result.data[0].committed);
          setAsset(result.data[0].asset);
          setType(result.data[0].type);
          setActualCompletion(result.data[0].actualPercent);
          setFundsUsed(
            fundsUsedPercentage(result.data[0].committed, result.data[0].amount)
          );
          setComments(result.data[0].comments);
          setDrawerPurpose(result.data[0].purpose);
          setDrawerBenefits(result.data[0].benefits);
          setDrawerRisks(result.data[0].risks);
          setDrawerArNumber(result.data[0].arNumber);

          setDrawerArStatus(result.data[0].arStatus);
          setDrawerArStatusId(result.data[0].arStatusId);
          setDrawerProjectName(result.data[0].projectName);
          setDrawerCostCenter(result.data[0].costCenter);
          setDrawerSite(result.data[0].site);
          setDrawerOwner(result.data[0].owner);
          setDrawerDirector(result.data[0].director);
          setDrawerStartDate(result.data[0].startDate);
          setDrawerEndDate(result.data[0].endDate);
          setDrawerAmount(result.data[0].amount);
          setDrawerCommitted(result.data[0].committed);
          setDrawerAsset(result.data[0].asset);
          setDrawerType(result.data[0].type);
          setDrawerActualCompletion(result.data[0].actualCompletion);
          setDrawerFundsUsed(
            fundsUsedPercentage(result.data[0].committed, result.data[0].amount)
          );
        }
      })
      .catch(e => {
        if (e.status !== 400) {
          //If this is not an empty set of data (400)
          toast.error(
            `There is a problem connecting to the server. Please contact MIS for details and resolution.`,
            {
              position: toast.POSITION.BOTTOM_RIGHT,
              className: css({
                background: "#B42C01 !important"
              })
            }
          );
        }
      });
  };

  const setPrs = () => {
    if (arNumber !== "") {
      axios
        .get(`https://localhost:2001/api/v1/pr/${arNumber}`, {
          headers: { Authorization: arAuthHeader }
        })
        .then(result => {
          setPrRows(result.data);
        });
    } else {
      setPrRows([]);
    }
  };

  const setCurrentAr = () => {
    if (arNumber !== "" && arNumber !== null) {
      axios
        .get(`https://localhost:6001/api/v1/ar/${arNumber}?arnumber=true`, {
          headers: { Authorization: arAuthHeader }
        })
        .then(result => {
          setArRow([arIndex]);
          setRefetchGrid(false);
          /*           setDrawerComments(result.data[0].comments);
          setDrawerPurpose(result.data[0].purpose);
          setDrawerBenefits(result.data[0].benefits);
          setDrawerRisks(result.data[0].risks);
          setDrawerArNumber(result.data[0].arNumber);
          setDrawerArStatus(result.data[0].arStatus);
          setDrawerArStatusId(result.data[0].arStatusId);
          setDrawerProjectName(result.data[0].projectName);
          setDrawerCostCenter(result.data[0].costCenter);
          setDrawerSite(result.data[0].site);
          setDrawerOwner(result.data[0].owner);
          setDrawerDirector(result.data[0].director);
          setDrawerStartDate(result.data[0].startDate);
          setDrawerEndDate(result.data[0].endDate);
          setDrawerAmount(result.data[0].amount);
          setDrawerCommitted(result.data[0].committed);
          setDrawerAsset(result.data[0].asset);
          setDrawerType(result.data[0].type);
          setDrawerActualCompletion(result.data.actualCompletion);
 */
          setComments(result.data.comments);
          setPurpose(result.data.purpose);
          setBenefits(result.data.benefits);
          setRisks(result.data.risks);
          setArNumber(result.data.arNumber);
          setArStatus(result.data.arStatus);
          setArStatusId(result.data.arStatusId);
          setProjectName(result.data.projectName);
          setCostCenter(result.data.costCenter);
          setSite(result.data.site);
          setOwner(result.data.owner);
          setDirector(result.data.director);
          setStartDate(result.data.startDate);
          setEndDate(result.data.endDate);
          setAmount(result.data.amount);
          setCommitted(result.data.committed);
          setAsset(result.data.asset);
          setType(result.data.type);
          setActualCompletion(result.data.actualCompletion);
          setFundsUsed(
            fundsUsedPercentage(result.data.committed, result.data.amount)
          );
        });
    }
  };

  const toastWelcome = () => {
    if (showWelcome) {
      toast.success(`Welcome, ${currentUserFullName}`, {
        position: toast.POSITION.BOTTOM_RIGHT,
        className: css({
          background: "#008767 !important"
        })
      });
      setShowWelcome(false);
    }
  };

  // On page render, query the AR API and render set arRows(ArDataGrid's datasource)
  useEffect(() => {
    if (isMount || refetchGrid) {
      setArs();
      setCurrentAr();
    }
  }, [refetchGrid, arStatusId]);

  // Only on page render and only if the user is opening this page for the first time
  // post-login, toast them!
  useEffect(() => {
    if (isMount) {
      toastWelcome();
    }
  }, [showWelcome]);

  // If this is not a page render and is an ARNumber change, set prRows (PRDataGrid's
  // datasource) and set the current AR data values in state to use in the edit drawer
  // so it does not appear empty
  useEffect(() => {
    if (!isMount) {
      setPrs();
    }
  }, [arNumber]);

  return (
    <ArView
      createDrawerOpen={createDrawerOpen}
      onCreateDrawerOpen={handleCreateDrawerOpen}
      onCreateDrawerClose={handleCreateDrawerClose}
      editDrawerOpen={editDrawerOpen}
      onEditDrawerOpen={handleEditDrawerOpen}
      onEditDrawerClose={handleEditDrawerClose}
      classes={classes}
      context={arContext}
    />
  );
}

export default ArController;
