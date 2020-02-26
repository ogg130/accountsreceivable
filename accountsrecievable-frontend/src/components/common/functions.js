import { toast } from "react-toastify";
import { css } from "glamor";

const currentUserFullName = sessionStorage.getItem("fullName");

var base64 = require("base-64");
const token = base64.encode(process.env.REACT_APP_API_CREDENTIALS);

export const arAuthHeader = "Basic " + token;

export const denumerateStatus = statusId => {
  let returnStatus = null;
  if (statusId === 0) {
    returnStatus = "Create New AR";
  }
  if (statusId === 1) {
    returnStatus = "AR Pending";
  }
  if (statusId === 2) {
    returnStatus = "AR Approved";
  }
  if (statusId === 3) {
    returnStatus = "Baseline";
  }
  if (statusId === 4) {
    returnStatus = "Purchasing";
  }
  if (statusId === 5) {
    returnStatus = "Closeout";
  }
  if (statusId === 6) {
    returnStatus = "Close";
  }
  return returnStatus;
};

export const enumerateStatus = status => {
  let returnStatus = -1;
  debugger;
  if (status === "Create New AR") {
    returnStatus = 0;
  }
  if (status === "AR Pending") {
    returnStatus = 1;
  }
  if (status === "AR Approved") {
    returnStatus = 2;
  }
  if (status === "Baseline") {
    returnStatus = 3;
  }
  if (status === "Purchasing") {
    returnStatus = 4;
  }
  if (status === "Closeout") {
    returnStatus = 5;
  }
  if (status === "Close") {
    returnStatus = 6;
  }
  return returnStatus;
};

export const isRole = role => {
  const roles = sessionStorage.getItem("userRoles");
  let answer = false;
  if (roles.includes(role.toUpperCase())) {
    answer = true;
  }
  return answer;
};

export const isDirector = user => {
  const roles = sessionStorage.getItem("directorList");
};

export const fundsUsedPercentage = (committed, amount) => {
  const percentage = Math.round((Number(committed) / Number(amount)) * 100);
  return Number.isNaN(percentage)
    ? 0
    : percentage < 0
    ? 0
    : percentage > 100
    ? 100
    : percentage;
};

export const currencyValidator = (event, value, owner, director) => {
  if (
    isRole("FINANCE") ||
    (isRole("OWNER") && currentUserFullName === owner) ||
    (isRole("DIRECTOR") && currentUserFullName === director)
  )
    if (event.target.value < 1) {
      toast.error(
        `${event.target.name} must be greater than or equal to 1. Please try again.`,
        {
          position: toast.POSITION.BOTTOM_RIGHT,
          className: css({
            background: "#B42C01 !important"
          })
        }
      );
      return null;
    }

  if (isNaN(event.target.value)) {
    toast.error(
      `${event.target.name} must be a numeric value. Please try again.`,
      {
        position: toast.POSITION.BOTTOM_RIGHT,
        className: css({
          background: "#B42C01 !important"
        })
      }
    );
    return null;
  }

  var precision = event.target.value.split(".")[1];
  if (typeof precision !== "undefined") {
    if (precision !== "") {
      if (precision.length > 2) {
        toast.error(
          `${event.target.name} must be a whole number or have two or fewer decimal places. Please try again.`,
          {
            position: toast.POSITION.BOTTOM_RIGHT,
            className: css({
              background: "#B42C01 !important"
            })
          }
        );
        return null;
      }
    } else {
      toast.error(
        `${event.target.name} must be a whole number or have two or fewer decimal places. Please try again.`,
        {
          position: toast.POSITION.BOTTOM_RIGHT,
          className: css({
            background: "#B42C01 !important"
          })
        }
      );
      return null;
    }
  }

  if (value === "" || value === null) {
    toast.error(
      `${event.target.name} must have a value of 0 or greater. Please try again.`,
      {
        position: toast.POSITION.BOTTOM_RIGHT,
        className: css({
          background: "#B42C01 !important"
        })
      }
    );
    return null;
  }
};

export const drawerIsComplete = fields => {
  let errors = [];
  if (fields[0] === "") {
    errors.push("Project name is empty");
  }
  if (fields[1] === "") {
    errors.push("Site is empty");
  }
  if (fields[2] === "") {
    errors.push("Owner is empty");
  }
  if (fields[3] === "") {
    errors.push("Cost Center is empty");
  }
  if (fields[4] === "") {
    errors.push("Director name is empty");
  }
  if (fields[5] === "") {
    errors.push("Start Date is empty");
  }
  if (fields[6] === "") {
    errors.push("End Date is empty");
  }

  if (new Date(fields[5]) > new Date(fields[6])) {
    errors.push("Start date must be before end date.");
  }

  if (isNaN(fields[7])) {
    errors.push("Amount must be a numeric value");
  } else {
    if (fields[7] < 1) {
      errors.push("Amount must have a value of 1 or greater");
    }
    let precision = fields[7].toString().split(".")[1];
    if (typeof precision !== "undefined") {
      if (precision !== "") {
        if (precision.length > 2) {
          errors.push(
            `Amount must be a whole number or have two or fewer decimal places`
          );
        }
      } else {
        errors.push(
          `Amount must be a whole number or have two or fewer decimal places`
        );
      }
    }
  }

  if (isNaN(fields[8])) {
    errors.push("Total committed must be a numeric value");
  } else {
    if (fields[8] < 1) {
      errors.push("Amount must have a value of 1 or greater");
    }
    let precision = fields[8].toString().split(".")[1];
    if (typeof precision !== "undefined") {
      if (precision !== "") {
        if (precision.length > 2) {
          errors.push(
            `Total committed must be a whole number or have two or fewer decimal places`
          );
        }
      } else {
        errors.push(
          `Total committed must be a whole number or have two or fewer decimal places`
        );
      }
    }
  }

  return errors;
};

/* export const dateValidator = (event, startDate, endDate) => {
  if (startDate > endDate) {
    toast.error(
      `The change you have requested to ${event.target.name} would make it so that the start date comes after the end date. Please try again.`,
      {
        position: toast.POSITION.BOTTOM_RIGHT,
        className: css({
          background: "#B42C01 !important"
        })
      }
    );
    return null;
  } */
