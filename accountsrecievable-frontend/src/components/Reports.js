import React, { useState, useEffect } from "react";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Slide from "@material-ui/core/Slide";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { isRole, arAuthHeader } from "./common/functions";
import { toast, ToastType } from "react-toastify";
import { css } from "glamor";
import { useDidMount } from "./useDidMount";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1)
    }
  },
  card: {
    paddingLeft: 45
  },
  table: {
    borderSpacing: "1px",
    borderCollapse: "separate",
    tableLayout: "fixed"
  },
  th: {
    border: "1px solid grey"
  },
  td: {
    border: "1px solid grey"
  },

  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  formControl: {
    margin: theme.spacing(3)
  }
}));

function Reports() {
  const [report, setReport] = useState([]);
  const [hide, setHide] = useState(true);
  const [reportName, setReportName] = useState("");

  //const isMount = useDidMount();
  const currentUserId = sessionStorage.getItem("userId");
  const currentUserFullName = sessionStorage.getItem("fullName");

  const isMount = useDidMount();

  const setReportData = value => {
    if (value === "1") {
      axios
        .get(
          `https://localhost:6001/api/v1/ar/report/1/owner/${currentUserId}`,
          { headers: { Authorization: arAuthHeader } }
        )
        .then(result => {
          setHide(false);
          setReport(result.data);
        })
        .catch(e => {
          setHide(true);
          toast.success(`There is no data to show for this report.`, {
            position: toast.POSITION.BOTTOM_RIGHT,
            className: css({
              background: "#008767 !important"
            })
          });
        });
      setReportName(`Project records owned by ${currentUserFullName}`);
    } else if (value === "2") {
      axios
        .get(`https://localhost:6001/api/v1/ar/report/2`, {
          headers: { Authorization: arAuthHeader }
        })
        .then(result => {
          if (result.data.length !== 0) {
            setReport(result.data);
            setHide(false);
          } else {
            toast.success(`There is no data to show for this report.`, {
              position: toast.POSITION.BOTTOM_RIGHT,
              className: css({
                background: "#008767 !important"
              })
            });
          }
        })
        .catch(e => {
          setHide(true);
          toast.error(
            `There was a problem trying to connect to the server. Please contact MIS for resolution.`,
            {
              position: toast.POSITION.BOTTOM_RIGHT,
              className: css({
                background: "#B42C01 !important"
              })
            }
          );
        });
      setReportName(`Closed Projects`);
    } else if (value === "3") {
      axios
        .get(`https://localhost:6001/api/v1/ar/report/3`, {
          headers: { Authorization: arAuthHeader }
        })
        .then(result => {
          setReport(result.data);
          setHide(false);
        })
        .catch(e => {
          setHide(true);
          toast.success(`There is no data to show for this report.`, {
            position: toast.POSITION.BOTTOM_RIGHT,
            className: css({
              background: "#008767 !important"
            })
          });
        });
      setReportName(`Projects having total cost over $50000.00`);
    }
  };

  const classes = useStyles();
  const [value, setValue] = React.useState("");

  useEffect(() => {
    if (!isMount) {
      setReportData(value);
    }
  }, [value]);

  const handleChange = event => {
    setValue(event.target.value);
  };
  return (
    <>
      <Grid
        container
        spacing={2}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ paddingTop: 25 }}
      >
        <Slide direction={"left"} in={true} timeout={1500}>
          <Grid item xs={12} sm={12}>
            <Grid item xs={12} sm={12}>
              <Paper elevation={3} className={classes.paper}>
                <div className="jumbotron">
                  <h1>Reporting Dashboard</h1>
                  <p>
                    Please select the report you wish to run, then click the
                    'Download' button to download the report:
                  </p>
                  <div className={classes.root}>
                    <Paper style={{ width: 850 }} elevation={3}>
                      <FormControl
                        component="fieldset"
                        className={classes.formControl}
                      >
                        <RadioGroup value={value} onChange={handleChange}>
                          <FormControlLabel
                            value="1"
                            control={<Radio color="primary" />}
                            label="Projects in which I am the owner of"
                          />
                          <FormControlLabel
                            value="2"
                            control={<Radio color="primary" />}
                            label="Closed Projects"
                          />
                          <FormControlLabel
                            value="3"
                            control={<Radio color="primary" />}
                            label="Projects having total cost over 50,000$"
                          />
                        </RadioGroup>
                        {!hide && (
                          <ReactHTMLTableToExcel
                            id="test-table-xls-button"
                            className="button"
                            table="table-to-xls"
                            filename="tablexls"
                            sheet="tablexls"
                            buttonText="Download as XLS"
                          />
                        )}
                      </FormControl>
                    </Paper>
                  </div>
                </div>
              </Paper>
            </Grid>
          </Grid>
        </Slide>

        {!hide && (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <Card className={classes.card} variant="outlined">
                <CardContent>
                  <Typography
                    variant="h6"
                    style={{ paddingTop: 20, fontWeight: "bold" }}
                  >
                    Report Preview
                  </Typography>
                  <table
                    style={{ width: "100%" }}
                    className={classes.th}
                    id="table-to-xls"
                  >
                    <th>
                      <h4>Report: {reportName}</h4>
                    </th>
                    <tr
                      style={{ backgroundColor: "#C8C9C7", fontWeight: "bold" }}
                    >
                      <th className={classes.th}>AR Number</th>
                      <th className={classes.th}>Project Name</th>
                      <th className={classes.th}>Owner</th>
                      <th className={classes.th}>Status</th>
                      <th className={classes.th}>Owner</th>
                      <th className={classes.th}>Director</th>
                      <th className={classes.th}>Amount</th>
                      <th className={classes.th}>Total Committed</th>
                      <th className={classes.th}>Funds Used %</th>
                      <th className={classes.th}>End Date</th>
                      <th className={classes.th}>Start Date</th>
                      <th className={classes.th}>Purpose</th>
                      <th className={classes.th}>Benefits</th>
                      <th className={classes.th}>Risks</th>
                      <th className={classes.th}>Comments</th>
                      <th className={classes.th}>Asset</th>
                      <th className={classes.th}>Type</th>
                      <th className={classes.th}>TimeStamp</th>
                    </tr>
                    {report.map(ar => (
                      <tr>
                        <td className={classes.td}>
                          {ar.arNumber !== "" ? ar.arNumber : "Pending..."}
                        </td>
                        <td className={classes.td}>{ar.projectName}</td>
                        <td className={classes.td}>{ar.site}</td>
                        <td className={classes.td}>{ar.status}</td>
                        <td className={classes.td}>{ar.owner}</td>
                        <td className={classes.td}>{ar.director}</td>
                        <td className={classes.td}>{ar.amount}</td>
                        <td className={classes.td}>{ar.committed}</td>
                        <td className={classes.td}>{ar.actualPercent}</td>
                        <td className={classes.td}>{ar.endDate}</td>
                        <td className={classes.td}>{ar.startDate}</td>
                        <td className={classes.td}>{ar.purpose}</td>
                        <td className={classes.td}>{ar.benefits}</td>
                        <td className={classes.td}>{ar.risks}</td>
                        <td className={classes.td}>{ar.comments}</td>
                        <td className={classes.td}>{ar.asset}</td>
                        <td className={classes.td}>{ar.type}</td>
                        <td className={classes.td}>{ar.enteredDate}</td>
                      </tr>
                    ))}
                  </table>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
      </Grid>
    </>
  );
}

export default Reports;
