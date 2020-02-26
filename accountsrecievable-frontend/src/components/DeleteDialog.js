import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Paper from "@material-ui/core/Paper";
import Draggable from "react-draggable";
import { ArContext } from "./context";
import axios from "axios";
import { toast } from "react-toastify";
import { css } from "glamor";
import { arAuthHeader } from "./common/functions";

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

export default function DeleteDialog(props) {
  const arContext = useContext(ArContext);

  const {
    setAsset,
    setType,
    setArRow,
    setArRows,
    setPrRows,
    arIndex,
    setArIndex,
    setArNumber,
    setPrIndex,
    setPrRow,
    arNumber,
    setProjectName,
    setSite,
    setDirector,
    setOwner,
    setCostCenter,
    setArStatus,
    setArStatusId,
    setStartDate,
    setEndDate,
    setAmount,

    setCommitted,
    projectName,
    arId,
    setArId,
    setBenefits,
    setRisks,
    setComments,
    setPurpose
  } = arContext;

  const handleDelete = event => {
    event.preventDefault();

    const project = projectName;
    axios
      .delete(`https://localhost:6001/api/v1/ar/${arId}`, {
        headers: { Authorization: arAuthHeader }
      })
      .catch(e => {
        toast.error(
          `There was a problem trying to update the project. Please contact MIS for resolution.`,
          {
            position: toast.POSITION.BOTTOM_RIGHT,
            className: css({
              background: "#B42C01 !important"
            })
          }
        );
      });

    setArRows(deleteRow(arIndex));
    setComments("");
    setPurpose("");
    setBenefits("");
    setRisks("");
    setAsset("");
    setType("");
    setArId(0);
    setArIndex([]);
    setArRow([]);
    setProjectName("");
    setArNumber("");
    setArStatusId(-1);
    setArStatus("");
    setPrIndex([]);
    setPrRow([]);
    setPrRows([]);
    setSite("");
    setOwner("");
    setDirector("");
    setCostCenter("");
    setStartDate(null);
    setEndDate(null);
    setAmount("");
    setCommitted("");

    toast.success(`Project: ${project} has been deleted.`, {
      position: toast.POSITION.BOTTOM_RIGHT,
      className: css({
        background: "#008767 !important"
      })
    });
    props.onDialogToggle(false);
  };
  const handleClose = () => {
    props.onDialogToggle(false);
  };

  const deleteRow = rowIdx => rows => {
    const nextRows = [...rows];
    nextRows.splice(rowIdx, 1);

    return nextRows;
  };

  return (
    <div>
      <Dialog
        open={props.dialogOpen}
        onClose={props.onDialogClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Delete Project
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            You are about to delete the following project: Project:{" "}
            {projectName}. This is irreversible. Do you wish to continue?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            No (Don't Delete Project)
          </Button>
          <Button onClick={handleDelete} color="primary">
            Yes (Delete Project)
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
