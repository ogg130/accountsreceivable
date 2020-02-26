import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

export default function SimpleTable(props) {
  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="simple table">
        <TableHead style={{ backgroundColor: "#C8C9C7", fontWeight: "bold" }}>
          <TableRow>
            <TableCell style={{ width: 30 }}>Year 1</TableCell>
            <TableCell style={{ width: 30 }}>Year 2</TableCell>
            <TableCell style={{ width: 30 }}>Year 3</TableCell>
            <TableCell style={{ width: 30 }}>Year 4</TableCell>
            <TableCell style={{ width: 30 }}>Year 5</TableCell>
            <TableCell style={{ width: 30 }}>Year 6</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.topRows.map(row => (
            <TableRow key={row}>
              <TableCell component="th" scope="row">
                {row.y1}
              </TableCell>
              <TableCell style={{ width: 30 }}>{row.y2}</TableCell>
              <TableCell style={{ width: 30 }}>{row.y3}</TableCell>
              <TableCell style={{ width: 30 }}>{row.y4}</TableCell>
              <TableCell style={{ width: 30 }}>{row.y5}</TableCell>
              <TableCell style={{ width: 30 }}>{row.y6}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Table size="small" aria-label="simple table">
        <TableHead style={{ backgroundColor: "#C8C9C7", fontWeight: "bold" }}>
          <TableRow>
            <TableCell style={{ width: 30, paddingLeft: 50 }}></TableCell>
            <TableCell style={{ width: 30 }}>Year 7</TableCell>
            <TableCell style={{ width: 30 }}>Year 8</TableCell>
            <TableCell style={{ width: 30 }}>Year 9</TableCell>
            <TableCell style={{ width: 30 }}>Year 10</TableCell>
            <TableCell style={{ width: 30 }}>Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.bottomRows.map(row => (
            <TableRow key={row}>
              <TableCell
                style={{ width: 30 }}
                component="th"
                scope="row"
              ></TableCell>
              <TableCell style={{ width: 30 }}>{row.y7}</TableCell>
              <TableCell style={{ width: 30 }}>{row.y8}</TableCell>
              <TableCell style={{ width: 30 }}>{row.y9}</TableCell>
              <TableCell style={{ width: 30 }}>{row.y10}</TableCell>
              <TableCell style={{ width: 30 }}>{row.total}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
