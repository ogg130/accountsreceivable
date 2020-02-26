import React, { useRef, useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Schedule from "./Schedule";
import axios from "axios";
import { ArContext } from "./context";
import { isRole, arAuthHeader } from "./common/functions";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles(theme => ({
  root: { paddingLeft: 20 },
  formControl: {
    margin: theme.spacing(),
    minWidth: 200
  },
  card: {
    minWidth: 275
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

function DepreciationSchedule(props) {
  const arContext = useContext(ArContext);

  const { setAsset } = arContext;

  const classes = useStyles();
  const inputLabel = useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);

  const typeList = JSON.parse(sessionStorage.getItem("typeList"));
  const assetList = JSON.parse(sessionStorage.getItem("assetList"));

  function createTopRows(y1, y2, y3, y4, y5, y6) {
    return [y1, y2, y3, y4, y5, y6];
  }

  function createBottomRows(y7, y8, y9, y10, total) {
    return { y7, y8, y9, y10, total };
  }

  const getTypeId = value => {
    if (typeList.length > 0) {
      var item = typeList.find(r => r.value === value);
      return item.scheduleTypeID;
    }
    return null;
  };

  const [topRows, setTopRows] = useState([]);
  const [bottomRows, setBottomRows] = useState([]);
  const [refetchType, setRefetchType] = useState(0);
  const [refetchAsset, setRefetchAsset] = useState(0);
  const [tableData, setTableData] = useState();

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

  // When the page renders, set the labelwidth of the select lists
  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const setRows = value => {
    if (value === 1) {
      axios
        .get(
          `https://localhost:6001/api/v1/scheduletype/${getAssetId(
            props.asset,
            { headers: { Authorization: arAuthHeader } }
          )}?asset=true`
        )
        .then(result => {
          axios
            .get(
              `https://localhost:6001/api/v1/scheduletype/${getAssetId(
                props.asset
              )}?asset=true`,
              { headers: { Authorization: arAuthHeader } }
            )
            .then(result => {
              axios.get(
                `https://localhost:6001/api/v1/scheduletype/${getTypeId(
                  result.data[0].value
                )}/value/${props.amount}`,
                { headers: { Authorization: arAuthHeader } }
              );
              setTableData(result.data);
              //alert(result.data);
            });
        });
    } else {
      axios
        .get(
          `https://localhost:6001/api/v1/scheduletype/${getTypeId(
            props.type
          )}/value/${props.amount}`,
          { headers: { Authorization: arAuthHeader } }
        )
        .then(result => {
          setTableData(result.data);
          //alert("2 - " + result.data);
        });
    }
  };

  return (
    <>
      <div className={classes.root}>
        <Card className={classes.card} variant="outlined">
          <CardContent>
            <Grid spacing={1}>
              <Grid item xs={12} sm={12}>
                <Grid container spacing={1}>
                  <Grid item xs={4} sm={4}>
                    <Typography
                      variant="h6"
                      style={{ fontWeight: "bold" }}
                      align="center"
                    >
                      Depreciation Schedule
                    </Typography>
                  </Grid>
                  <Grid item xs={8} sm={8}>
                    <FormControl
                      style={{ float: "left" }}
                      size="small"
                      className={classes.formControl}
                    >
                      <InputLabel
                        ref={inputLabel}
                        variant="outlined"
                        id="asset"
                      >
                        <Typography style={{ fontWeight: "bold" }}>
                          Asset
                        </Typography>
                      </InputLabel>
                      <Select
                        variant="outlined"
                        size="small"
                        labelId="asset"
                        id="Asset"
                        value={props.asset}
                        onChange={event => {
                          props.onAssetChange(event.target.value);

                          setRefetchType(p => p + 1);
                        }}
                        labelWidth={labelWidth}
                      >
                        <MenuItem value="">
                          <em>Select an asset</em>
                        </MenuItem>
                        {assetList.map(asset => (
                          <MenuItem
                            key={asset.scheduleAssetID}
                            value={asset.value}
                          >
                            {asset.value}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={4} sm={4}></Grid>
                  <Grid item xs={8} sm={8}>
                    <FormControl
                      style={{ float: "left" }}
                      size="small"
                      className={classes.formControl}
                    >
                      <InputLabel ref={inputLabel} variant="outlined" id="type">
                        <Typography style={{ fontWeight: "bold" }}>
                          Type
                        </Typography>
                      </InputLabel>
                      <Select
                        variant="outlined"
                        size="small"
                        labelId="type"
                        id="Type"
                        value={props.type}
                        onChange={event => {
                          props.onTypeChange(event.target.value);

                          setRefetchAsset(p => p + 1);
                        }}
                        labelWidth={labelWidth}
                      >
                        <MenuItem value="">
                          <em> Select a Type</em>
                        </MenuItem>
                        {typeList.map(type => (
                          <MenuItem
                            key={type.scheduleTypeID}
                            value={type.value}
                          >
                            {type.value}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} sm={12}>
                <Schedule data={tableData} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

// TODO: DEFINE PROPS

export default DepreciationSchedule;

/* 
import React, { useRef, useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Schedule from "./Schedule";
import axios from "axios";
import { ArContext } from "./context";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { useDidMount } from "./useDidMount";

const useStyles = makeStyles(theme => ({
  root: { paddingLeft: 20 },
  formControl: {
    margin: theme.spacing(),
    minWidth: 200
  },
  card: {
    minWidth: 275
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

function DepreciationSchedule(props) {
  const arContext = useContext(ArContext);

  const { setAsset } = arContext;

  const classes = useStyles();
  const inputLabel = useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);
  const [typeChanged, setTypeChanged] = useState(false); // used to detect a type change to refresh the table
  // When the page renders, set the labelwidth of the select lists
  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const typeList = JSON.parse(sessionStorage.getItem("typeList"));
  const assetList = JSON.parse(sessionStorage.getItem("assetList"));

  function createTopRows(y1, y2, y3, y4, y5, y6) {
    return { y1, y2, y3, y4, y5, y6 };
  }

  function createBottomRows(y7, y8, y9, y10, total) {
    return { y7, y8, y9, y10, total };
  }

  let topRows = [];
  let bottomRows = [];

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

  const setScheduleRows = () => {
    axios
      .get(
        `https://localhost:6001/api/v1/scheduletype/${getAssetId(
          props.asset
        )}/value/${props.amount}`
      )
      .then(result => {
        debugger;
        const data = result.data;
        topRows = [
          createTopRows(data[0], data[1], data[2], data[3], data[4], data[5])
        ];
        bottomRows = [
          createBottomRows(data[6], data[7], data[8], data[9], data[10])
        ];
      });
  };

  // If this is a page render or depreciation list 'Type' select list
  // has been changed, call the scheduletype values endpoint of the
  // AR api to be able to populate the depreciation schedule table
  useEffect(() => {
    setScheduleRows();
  }, [typeChanged]);

  return (
    <>
      <div className={classes.root}>
        <Card className={classes.card} variant="outlined">
          <CardContent>
            <Grid spacing={1}>
              <Grid item xs={12} sm={12}>
                <Grid container spacing={1}>
                  <Grid item xs={4} sm={4}>
                    <Typography
                      variant="h6"
                      style={{ fontWeight: "bold" }}
                      align="center"
                    >
                      Depreciation Schedule
                    </Typography>
                  </Grid>
                  <Grid item xs={8} sm={8}>
                    <FormControl
                      style={{ float: "left" }}
                      size="small"
                      className={classes.formControl}
                    >
                      <InputLabel
                        ref={inputLabel}
                        variant="outlined"
                        id="asset"
                      >
                        <Typography style={{ fontWeight: "bold" }}>
                          Asset
                        </Typography>
                      </InputLabel>
                      <Select
                        variant="outlined"
                        size="small"
                        labelId="asset"
                        id="Asset"
                        value={props.asset}
                        onChange={event => {
                          props.onAssetChange(event.target.value);
                        }}
                        labelWidth={labelWidth}
                      >
                        <MenuItem value="">
                          <em>Select an asset</em>
                        </MenuItem>
                        {assetList.map(asset => (
                          <MenuItem
                            key={asset.scheduleAssetID}
                            value={asset.value}
                          >
                            {asset.value}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={4} sm={4}></Grid>
                  <Grid item xs={8} sm={8}>
                    <FormControl
                      style={{ float: "left" }}
                      size="small"
                      className={classes.formControl}
                    >
                      <InputLabel ref={inputLabel} variant="outlined" id="type">
                        <Typography style={{ fontWeight: "bold" }}>
                          Type
                        </Typography>
                      </InputLabel>
                      <Select
                        variant="outlined"
                        size="small"
                        labelId="type"
                        id="Type"
                        value={props.type}
                        onChange={event => {
                          props.onTypeChange(event.target.value);
                          if (props.type !== "") {
                            setTypeChanged(true);
                          }
                        }}
                        labelWidth={labelWidth}
                      >
                        <MenuItem value="">
                          <em> Select a Type</em>
                        </MenuItem>
                        {typeList.map(type => (
                          <MenuItem
                            key={type.scheduleTypeID}
                            value={type.value}
                          >
                            {type.value}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} sm={12}>
                <Schedule topRows={topRows} bottomRows={bottomRows} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

// TODO: DEFINE PROPS

export default DepreciationSchedule;
 */
