import React, { createContext, useState } from "react";
import PropTypes from "prop-types";

export const Context = createContext({});

export const Provider = props => {
  // Initial values are obtained from the props
  const {
    // Persisted user data
    userId: initialUserId,
    userName: initialUserName,
    password: initialPassword,
    userRole: initialUserRole,
    refetchGrid: initialRefetchGrid,
    authorized: initialAuthorized,
    fullName: initialFullName,

    // Persisted data lists
    siteList: initialSiteList,
    costCenterList: initialCostCenterList,
    directorList: initialDirectorList,
    ownerList: initialOwnerList,
    statusList: initialStatusList,
    assetList: initialAssetList,
    typeList: initialTypeList,

    // Ar Grid Data
    arIndex: initialArIndex,
    arRow: initialArRow,
    arRows: initialArRows,
    arId: initialArId,

    // PR grid Data
    prIndex: initialPrIndex,
    prRow: initialPrRow,
    prRows: initialPrRows,

    // Current AR data
    actualCompletion: initialActualCompletion,
    amount: initialAmount,
    arNumber: initialArNumber,
    arStatus: initialArStatus,
    arStatusId: initialArStatusId,
    committed: initialCommitted,
    costCenter: initialCostCenter,
    director: initialDirector,
    endDate: initialEndDate,
    fundsUsed: initialFundsUsed,
    owner: initialOwner,
    projectName: initialProjectName,
    site: initialSite,
    startDate: initialStartDate,
    purpose: initialPurpose,
    benefits: initialBenefits,
    risks: initialRisks,
    comments: initialComments,
    asset: initialAsset,
    type: initialType,

    // Pre-Save drawer data
    drawerActualCompletion: initialDrawerActualCompletion,
    drawerAmount: initialDrawerAmount,
    drawerarNumber: initialDrawerArNumber,
    drawerArStatus: initialDrawerArStatus,
    drawerArStatusId: initialDrawerArStatusId,
    drawerCommitted: initialDrawerCommitted,
    drawerCostCenter: initialDrawerCostCenter,
    drawerDirector: initialDrawerDirector,
    drawerEndDate: initialDrawerEndDate,
    drawerFundsUsed: initialDrawerFundsUsed,
    drawerOwner: initialDrawerOwner,
    drawerProjectName: initialDrawerProjectName,
    drawerSite: initialDrawerSite,
    drawerStartDate: initialDrawerStartDate,
    drawerPurpose: initialDrawerPurpose,
    drawerBenefits: initialDrawerBenefits,
    drawerRisks: initialDrawerRisks,
    drawerComments: initialDrawerComments,
    drawerAsset: initialDrawerAsset,
    drawerType: initialDrawerType,

    // Flags for general operation
    showWelcome: initialShowWelcome,
    createFlag: initialCreateFlag,
    editFlag: initialEditFlag,

    // Questionable
    openBackdrop: initialOpenBackdrop,
    tableData: initialScheduleData,
    initFlag: initialInitFlag,

    children // Mandatory syntax
  } = props;

  // Create state for all of the above to keep the values
  // Persisted user data
  const [userName, setUserName] = useState(initialUserName);
  const [authorized, setAuthorized] = useState(initialAuthorized);
  const [userRole, setUserRole] = useState([initialUserRole]);
  const [password, setPassword] = useState(initialPassword);
  const [userId, setUserId] = useState(initialUserId);
  const [fullName, setFullName] = useState(initialFullName);

  // Persisted data lists
  const [siteList, setSiteList] = useState([initialSiteList]);
  const [costCenterList, setCostCenterList] = useState([initialCostCenterList]);
  const [directorList, setDirectorList] = useState([initialDirectorList]);
  const [ownerList, setOwnerList] = useState([initialOwnerList]);
  const [statusList, setStatusList] = useState([initialStatusList]);
  const [typeList, setTypeList] = useState(initialTypeList);
  const [assetList, setAssetList] = useState(initialAssetList);

  // Ar Grid data
  const [arIndex, setArIndex] = useState(initialArIndex);
  const [arId, setArId] = useState(initialArId);
  const [arRow, setArRow] = useState(initialArRow);
  const [arRows, setArRows] = useState(initialArRows);

  // Pr Grid Data
  const [prIndex, setPrIndex] = useState(initialPrIndex);
  const [prRow, setPrRow] = useState(initialPrRow);
  const [prRows, setPrRows] = useState(initialPrRows);

  // Current Ar Data
  const [actualCompletion, setActualCompletion] = useState(
    initialActualCompletion
  );
  const [asset, setAsset] = useState(initialAsset);
  const [type, setType] = useState(initialType);
  const [amount, setAmount] = useState(initialAmount);
  const [arNumber, setArNumber] = useState(initialArNumber);
  const [arStatus, setArStatus] = useState(initialArStatus);
  const [arStatusId, setArStatusId] = useState(initialArStatusId);
  const [committed, setCommitted] = useState(initialCommitted);
  const [costCenter, setCostCenter] = useState(initialCostCenter);
  const [director, setDirector] = useState(initialDirector);
  const [endDate, setEndDate] = useState(initialEndDate);
  const [fundsUsed, setFundsUsed] = useState(initialFundsUsed);
  const [owner, setOwner] = useState(initialOwner);
  const [projectName, setProjectName] = useState(initialProjectName);
  const [site, setSite] = useState(initialSite);
  const [startDate, setStartDate] = useState(initialStartDate);
  const [comments, setComments] = useState(initialComments);
  const [purpose, setPurpose] = useState(initialPurpose);
  const [risks, setRisks] = useState(initialRisks);
  const [benefits, setBenefits] = useState(initialBenefits);

  // Pre-Save drawer data
  const [drawerActualCompletion, setDrawerActualCompletion] = useState(
    initialDrawerActualCompletion
  );
  const [drawerAsset, setDrawerAsset] = useState(initialDrawerAsset);
  const [drawerType, setDrawerType] = useState(initialDrawerType);
  const [drawerAmount, setDrawerAmount] = useState(initialDrawerAmount);
  const [drawerArNumber, setDrawerArNumber] = useState(initialDrawerArNumber);
  const [drawerArStatus, setDrawerArStatus] = useState(initialDrawerArStatus);
  const [drawerArStatusId, setDrawerArStatusId] = useState(
    initialDrawerArStatusId
  );
  const [drawerCommitted, setDrawerCommitted] = useState(
    initialDrawerCommitted
  );
  const [drawerCostCenter, setDrawerCostCenter] = useState(
    initialDrawerCostCenter
  );
  const [drawerDirector, setDrawerDirector] = useState(initialDrawerDirector);
  const [drawerEndDate, setDrawerEndDate] = useState(initialDrawerEndDate);
  const [drawerFundsUsed, setDrawerFundsUsed] = useState(
    initialDrawerFundsUsed
  );
  const [drawerOwner, setDrawerOwner] = useState(initialDrawerOwner);
  const [drawerProjectName, setDrawerProjectName] = useState(
    initialDrawerProjectName
  );
  const [drawerSite, setDrawerSite] = useState(initialDrawerSite);
  const [drawerStartDate, setDrawerStartDate] = useState(
    initialDrawerStartDate
  );
  const [drawerComments, setDrawerComments] = useState(initialDrawerComments);
  const [drawerPurpose, setDrawerPurpose] = useState(initialDrawerPurpose);
  const [drawerRisks, setDrawerRisks] = useState(initialDrawerRisks);
  const [drawerBenefits, setDrawerBenefits] = useState(initialDrawerBenefits);

  // Flags for General Operation
  const [showWelcome, setShowWelcome] = useState(initialShowWelcome); //Used to control whether a welcome message is shown after logging in
  const [createFlag, setCreateFlag] = useState(initialCreateFlag);
  const [editFlag, setEditFlag] = useState(initialEditFlag);

  // Questionable
  const [scheduleData, setScheduleData] = useState(initialScheduleData);
  const [openBackdrop, setOpenBackdrop] = useState(initialOpenBackdrop);
  const [refetchGrid, setRefetchGrid] = useState(initialRefetchGrid);
  const [initFlag, setInitFlag] = useState(initialInitFlag);

  // Make the context object:
  const arContext = {
    userId,
    setUserId,
    actualCompletion,
    setActualCompletion,
    amount,
    setAmount,
    arIndex,
    setArIndex,
    arNumber,
    setArNumber,
    arRow,
    setArRow,
    arRows,
    setArRows,
    setPrRows,
    arStatus,
    setArStatus,
    arStatusId,
    setArStatusId,
    committed,
    setCommitted,
    costCenter,
    setCostCenter,
    director,
    setDirector,
    endDate,
    setEndDate,
    fundsUsed,
    setFundsUsed,
    owner,
    setOwner,
    prIndex,
    setPrIndex,
    projectName,
    setProjectName,
    prRow,
    prRows,
    setPrRow,
    site,
    setSite,
    startDate,
    setStartDate,
    createFlag,
    setCreateFlag,
    editFlag,
    setEditFlag,
    comments,
    setComments,
    risks,
    setRisks,
    benefits,
    setBenefits,
    purpose,
    setPurpose,
    siteList,
    setSiteList,
    statusList,
    setStatusList,
    ownerList,
    setOwnerList,
    directorList,
    setDirectorList,
    costCenterList,
    setCostCenterList,
    userName,
    userRole,
    setUserRole,
    password,
    setPassword,
    setUserName,
    arId,
    setArId,
    refetchGrid,
    setRefetchGrid,
    authorized,
    setAuthorized,
    fullName,
    setFullName,
    showWelcome,
    setShowWelcome,
    setAsset,
    asset,
    setType,
    type,
    setAssetList,
    assetList,
    setTypeList,
    typeList,
    openBackdrop,
    setOpenBackdrop,
    setScheduleData,
    scheduleData,
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
    drawerFundsUsed
  };

  // pass the value in provider and return
  return <Context.Provider value={arContext}>{children}</Context.Provider>;
};

export const { Consumer } = Context;

Provider.propTypes = {
  actualCompletion: PropTypes.number,
  amount: PropTypes.number,
  comments: PropTypes.string,
  purpose: PropTypes.string,
  risks: PropTypes.string,
  benefits: PropTypes.string,

  refetchGrid: PropTypes.bool,

  arIndex: PropTypes.array,
  arNumber: PropTypes.string,
  arRow: PropTypes.number,
  arRows: PropTypes.array,
  arStatus: PropTypes.string,
  arStatusId: PropTypes.number,
  committed: PropTypes.number,
  costCenter: PropTypes.string,
  director: PropTypes.string,
  //endDate: PropTypes.instanceOf(Date),
  fundsUsed: PropTypes.number,
  owner: PropTypes.string,
  prIndex: PropTypes.array,
  projectName: PropTypes.string,
  prRow: PropTypes.number,
  prRows: PropTypes.array,
  site: PropTypes.string,
  fullName: PropTypes.string,
  //startDate: PropTypes.instanceOf(Date),
  createFlag: PropTypes.bool,
  editFlag: PropTypes.bool,
  authorized: PropTypes.string,
  showWelcome: PropTypes.bool,
  asset: PropTypes.string,
  type: PropTypes.string,
  openBackdrop: PropTypes.bool,
  initFlag: PropTypes.bool
};

Provider.defaultProps = {
  arRows: [],
  scheduleData: [],
  prIndex: [],
  arIndex: []
};
