import React from "react";
import Reports from "./Reports";
import ArController from "./ArController";
import Header from "./common/Header";
import { Route, Switch } from "react-router-dom";
import NotFoundPage from "./NotFoundPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ArContextProvider } from "./context";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import LoginController from "./LoginController.js";
import PrivateRoute from "./PrivateRoute";

const theme = createMuiTheme({
  typography: {
    // Tell Material-UI what's the font-size on the html element is.
    fontSize: 20
  }
});

function App() {
  const amount = 0;
  const committed = 0;
  const actualCompletion = 0;
  const costCenter = "";
  const director = "";
  const endDate = "";
  const fundsUsed = 0;
  const arIndex = [0];
  const arNumber = null;
  const arRow = 1;
  let arRows = [];
  const arStatus = "";
  const arStatusId = -1;
  const owner = "";
  const prRow = 1;
  const prRows = [];
  const prIndex = [];
  const projectName = sessionStorage.getItem("projectName") || "";
  const site = "";
  const startDate = "";
  const createFlag = false;
  const editFlag = false;

  const comments = "";
  const purpose = "";
  const risks = "";
  const benefits = "";
  const showWelcome = false;
  const asset = "";
  const type = "";
  const openBackdrop = false;
  const initFlag = true;
  const drawerComments = "";
  const drawerPurpose = "";
  const drawerBenefits = "";
  const drawerRisks = "";
  const drawerArNumber = "";
  const drawerArStatus = "";
  const drawerArStatusId = -1;
  const drawerProjectName = "";
  const drawerCostCenter = "";
  const drawerSite = "";
  const drawerOwner = "";
  const drawerDirector = "";
  const drawerStartDate = "";
  const drawerEndDate = "";
  const drawerAmount = 0;
  const drawerCommitted = 0;
  const drawerAsset = "";
  const drawerType = "";
  const drawerActualCompletion = 0;
  const drawerFundsUsed = 0;
  // Persist user info to be able to make use decisons after refreshes
  const userName = sessionStorage.getItem("userName") || "";
  const password = sessionStorage.getItem("userId") || -1;
  const userRoles = sessionStorage.getItem("userRoles") || [];
  const authorized = sessionStorage.getItem("authorized") || "false";
  const fullName = sessionStorage.getItem("fullName") || "";

  // Persists lists to be able to make list decisions / renders after refreshes
  const statusList = sessionStorage.getItem("statusList") || [];
  const directorList = sessionStorage.getItem("directorList") || [];
  const ownerList = sessionStorage.getItem("ownerList") || [];
  const siteList = sessionStorage.getItem("siteList") || [];
  const costCenterList = sessionStorage.getItem("costCenterList") || [];
  const assetList = sessionStorage.getItem("assetList") || [];
  const typeList = sessionStorage.getItem("typeList") || [];
  const scheduleData = sessionStorage.getItem("scheduleData") || [];

  const arId = null;
  const userId = 0;
  const refetchGrid = false;

  return (
    <div className="container-fluid">
      <MuiThemeProvider theme={theme}>
        <ArContextProvider
          amount={amount}
          committed={committed}
          actualCompletion={actualCompletion}
          costCenter={costCenter}
          director={director}
          endDate={endDate}
          fundsUsed={fundsUsed}
          owner={owner}
          projectName={projectName}
          site={site}
          startDate={startDate}
          arStatus={arStatus}
          arStatusId={arStatusId}
          arNumber={arNumber}
          arRow={arRow}
          arRows={arRows}
          arIndex={arIndex}
          prRow={prRow}
          prRows={prRows}
          prIndex={prIndex}
          statusList={statusList}
          directorList={directorList}
          ownerList={ownerList}
          siteList={siteList}
          costCenterList={costCenterList}
          createFlag={createFlag}
          editFlag={editFlag}
          comments={comments}
          purpose={purpose}
          risks={risks}
          benefits={benefits}
          userName={userName}
          password={password}
          userRoles={userRoles}
          arId={arId}
          userId={userId}
          refetchGrid={refetchGrid}
          authorized={authorized}
          fullName={fullName}
          showWelcome={showWelcome}
          asset={asset}
          type={type}
          assetList={assetList}
          typeList={typeList}
          openBackdrop={openBackdrop}
          scheduleData={scheduleData}
          initFlag={initFlag}
          drawerComments={drawerComments}
          drawerPurpose={drawerPurpose}
          drawerBenefits={drawerBenefits}
          drawerRisks={drawerRisks}
          drawerArNumber={drawerArNumber}
          drawerArStatus={drawerArStatus}
          drawerArStatusId={drawerArStatusId}
          drawerCostCenter={drawerCostCenter}
          drawerSite={drawerSite}
          drawerOwner={drawerOwner}
          drawerDirector={drawerDirector}
          drawerStartDate={drawerStartDate}
          drawerEndDate={drawerEndDate}
          drawerAmount={drawerAmount}
          drawerCommitted={drawerCommitted}
          drawerAsset={drawerAsset}
          drawerType={drawerType}
          drawerActualCompletion={drawerActualCompletion}
          drawerFundsUsed={drawerFundsUsed}
          drawerProjectName={drawerProjectName}
        >
          <ToastContainer
            style={{ fontSize: 14 }}
            autoClose={4000}
            hideProgressBar
          />
          <Header />
          <Switch>
            <Route exact path="/login" component={LoginController} />
            <PrivateRoute exact path="/projects" component={ArController} />
            <PrivateRoute exact path="/reporting" component={Reports} />
            <PrivateRoute component={NotFoundPage} />
          </Switch>
        </ArContextProvider>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
