import PropTypes from "prop-types";
import { useState, useContext, useEffect } from "react";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ArContext } from "./context";
import { toast } from "react-toastify";
import { css } from "glamor";
import LoginView from "./LoginView";
import axios from "axios";
import { useDidMount } from "./useDidMount";
import { isRole, arAuthHeader } from "./common/functions";

const useStyles = makeStyles(theme => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200,
      flexGrow: 1
    }
  },
  paper: {
    width: 260,
    marginLeft: 17,
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
    marginTop: 100
  }
}));

const useStyles2 = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      backgroundColor: "#006FCF"
    }
  }
}));
function LoginController(props) {
  const arContext = useContext(ArContext);

  const {
    // Props depend on some of these contexts that eslint is crying about.
    // Dont remove context that seems like its not in use
    userName,
    password,
    setAssetList,
    setTypeList,
    setPassword,
    setArNumber,
    userRole,
    setUserRole,
    userId,
    setUserId,
    setArRows,
    setArStatus,
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
    setShowWelcome,
    siteList,
    ownerList,
    directorList,
    statusList,
    setSiteList,
    setDirectorList,
    setOwnerList,
    setStatusList,
    setCostCenterList,
    costCenterList,
    assetList
  } = arContext;

  const classes = useStyles();
  const classes2 = useStyles2();

  const [link, setLink] = useState("/login");

  const setUser = () => {
    axios
      .get("https://localhost:5001/api/v1/user", {
        headers: { Authorization: arAuthHeader }
      })
      .then(result => {
        const currentUser = result.data.find(
          users => users.userName.toUpperCase() === userName.toUpperCase()
        );

        if (typeof currentUser !== "undefined" || currentUser != null) {
          setUserId(currentUser.userID);
          sessionStorage.setItem("userId", currentUser.userID);
          sessionStorage.setItem(
            "fullName",
            `${currentUser.firstName} ${currentUser.lastName}`
          );
        }
      });
  };

  const setRoles = () => {
    if (userId !== 0) {
      axios
        .get(`https://localhost:5001/api/v1/role/${userId}`, {
          headers: { Authorization: arAuthHeader }
        })
        .then(result => {
          if (userId !== "") {
            setUserRole([result.data]);
            sessionStorage.setItem("userRoles", JSON.stringify(result.data));
          }
        });
    }
  };
  const isMount = useDidMount();

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

  const setAssets = () => {
    axios
      .get("https://localhost:6001/api/v1/scheduleasset", {
        headers: { Authorization: arAuthHeader }
      })
      .then(result => {
        setAssetList(result.data);
        sessionStorage.setItem("assetList", JSON.stringify(result.data));
      });
  };

  const setTypes = () => {
    axios
      .get(`https://localhost:6001/api/v1/scheduletype`, {
        headers: { Authorization: arAuthHeader }
      })
      .then(result => {
        setTypeList(result.data);
        sessionStorage.setItem("typeList", JSON.stringify(result.data));
      });
  };

  // All of the below useffect calls must occur before the AR page renders or
  // else the controls which rely upon list and user data will cause faults.

  // All of the below useffect calls set the data that is being set into state
  // and storage because I was having a lot of problems trying to just keep them
  // in session storage, having started using state. I didnt want to untangle this
  // quite yet due to school time constraints so we will tackle this once we bring
  // it in house.

  // Session storage is used to persist the list values when a page is re-rendered
  // because state loses the value on re-render.

  // If this is a page mount, clear session storage - The user should have to login
  // again if they page back into the login page.
  useEffect(() => {
    if (isMount) {
      // Wipe user related sesssion storage
      sessionStorage.setItem("userName", "");
      sessionStorage.setItem("userId", -1);
      sessionStorage.setItem("userRoles", []);
      sessionStorage.setItem("authorized", "false");
      sessionStorage.setItem("fullName", "");
    }
  }, []);

  // If this is not a page render, and a successful username has been passed
  // to the users API, set the list of depreciation schedule assets and the
  // default asset so that the next useeffect hook will run
  /*   useEffect(() => {
    if (!isMount) {
      setAssets();
    }
  }, [userName]);
 */
  // If this is not a page render, and a successful username has been passed
  // to the users API, set the current users full name to be able to toast when
  // ArView renders and the save the userId to local storage so that it can be
  // remembered after a page refresh
  useEffect(() => {
    if (!isMount) {
      setUser();
    }
  }, [password]);

  // If this is not a page render and an asset value has been set in the
  // previous useEffect hook, set the list of depreciation schedule types
  // from the AR api
  /*   useEffect(() => {
    setTypes();
  }, [assetList]);
 */
  // If this is not a page render and a userId has been set with the previous
  // useEffect hook, store the current users roles in a list from the users API
  useEffect(() => {
    if (!isMount) {
      setRoles();
    }
  }, [userId]);

  // If this is not a page render and a userRole has been set with the previous
  // useEffect hook, create a list of directors from the users API
  useEffect(() => {
    if (!isMount) {
      setDirectors();
    }
  }, [userRole]);

  // If this is not a page render and the director list has been populated in
  // the previous useEffect hook, create a list of owners from the users API
  useEffect(() => {
    if (!isMount) {
      setOwners();
    }
  }, [directorList]);

  // If this is not a page render and the owner list has been populated in
  // the previous useEffect hook, create a list of sites from the sites API
  useEffect(() => {
    if (!isMount) {
      setSites();
    }
  }, [ownerList]);

  // If this is not a page render and the site list has been populated in
  // the previous useEffect hook, create a list of statuses from the status API
  useEffect(() => {
    if (!isMount) {
      setStatuses();
    }
  }, [siteList]);

  // If this is not a page render and the status list has been populated in
  // the previous useEffect hook, create a list of cost centers from the
  // cost center API
  useEffect(() => {
    if (!isMount) {
      setCostCenters();
    }
  }, [statusList]);

  const submitForm = e => {
    e.preventDefault();
    axios
      .post(
        `https://localhost:5001/api/v1/user/login/${userName}`,
        {
          Password: password
        },
        { headers: { Authorization: arAuthHeader } }
      )
      .then(response => {
        setLink("/projects");

        sessionStorage.setItem("authorized", "true");
        setShowWelcome(true);
        setUserId("");
        setPassword("");
        props.history.push("/projects");
      })
      .catch(error => {
        if (typeof error.response === "undefined") {
          toast.error(
            `There is a problem connecting to the authentication server. Please contact MIS for resolution.`,
            {
              position: toast.POSITION.BOTTOM_RIGHT,
              className: css({
                background: "#B42C01 !important"
              })
            }
          );
        } else if (error.response.status === 401) {
          toast.error(
            `The credentials you have entered are not valid. Please try again.`,
            {
              position: toast.POSITION.BOTTOM_RIGHT,
              className: css({
                background: "#B42C01 !important"
              })
            }
          );
        } else {
          console.log(error.response.status);
        }
      });
  };

  return (
    <LoginView
      classes={classes}
      classes2={classes2}
      context={arContext}
      link={link}
      submitForm={submitForm}
    />
  );
}

export default LoginController;

LoginController.propTypes = {
  userId: PropTypes.string,
  password: PropTypes.string,
  postBody: PropTypes.string,
  url: PropTypes.string,
  token: PropTypes.string
};
