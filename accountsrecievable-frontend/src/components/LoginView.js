import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Grow from "@material-ui/core/Grow";
import AccountCircleTwoToneIcon from "@material-ui/icons/AccountCircleTwoTone";

function LoginView(props) {
  return (
    <>
      <form onSubmit={props.submitForm.bind(this)}>
        <Grid component="label" container alignItems="center" spacing={3}>
          <Grid className={props.classes.paper} item xs={5} sm={5}></Grid>
          <Grid className={props.classes.paper} item xs={2} sm={2}>
            <Card className={props.classes.card} variant="outlined">
              <CardContent>
                <div className={props.classes.root}>
                  <Paper className={props.classes.paper}>
                    <div alt="logo">
                      <AccountCircleTwoToneIcon
                        style={{ color: "#006FCF", fontSize: 250 }}
                        size
                      />
                    </div>
                    <TextField
                      autoFocus
                      id="userName"
                      label={
                        <Typography style={{ fontWeight: "bold" }}>
                          User ID
                        </Typography>
                      }
                      size="small"
                      value={props.context.userName}
                      onChange={event => {
                        props.context.setUserName(event.target.value);
                      }}
                      variant="outlined"
                    />

                    <TextField
                      id="password"
                      label={
                        <Typography style={{ fontWeight: "bold" }}>
                          Password
                        </Typography>
                      }
                      size="small"
                      defaultValue={""}
                      value={props.context.password}
                      onChange={event =>
                        props.context.setPassword(event.target.value)
                      }
                      variant="outlined"
                      type="password"
                    />
                    <div className={props.classes2.root}>
                      <span className="input-group-btn"></span>

                      <Button type="submit" variant="contained" color="primary">
                        Login
                      </Button>
                    </div>
                  </Paper>
                </div>
              </CardContent>
            </Card>
            <Grid className={props.classes.paper} item xs={5} sm={5}></Grid>
          </Grid>
        </Grid>
      </form>
    </>
  );
}

export default LoginView;
