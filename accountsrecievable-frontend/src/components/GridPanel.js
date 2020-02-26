import React from "react";
import Grid from "@material-ui/core/Grid";
import PrDataGrid from "./PrDataGrid";
import ArDataGrid from "./ArGridController";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Box from "@material-ui/core/Box";
import "./styles.css";
import Fade from "@material-ui/core/Fade";

export default function GridPanel(props) {
  return (
    <>
      <Fade timeout={2400} in={true}>
        <div>
          <Box
            style={{ width: "92%", paddingTop: 80, paddingLeft: "8%" }}
            p={2}
            zIndex="100"
          >
            <Card className={props.classes.card} variant="outlined">
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <ArDataGrid minHeight={360} />
                    <PrDataGrid
                      ownerList={props.context.ownerList}
                      minHeight={400}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Box>
        </div>
      </Fade>
    </>
  );
}
