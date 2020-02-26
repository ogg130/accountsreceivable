import React, { useState, useContext } from "react";
import ReactDataGrid from "react-data-grid";
import { Toolbar, Data } from "react-data-grid-addons";
import Grid from "@material-ui/core/Grid";
import { ArContext } from "./context";
import axios from "axios";

/* TODO: Isolate and change to hooks - warning: Attempted to do this but there were   
complications with rendering the filter row so I moved on in favor of bigger problems */
export class CustomArToolBar extends Toolbar {
  render() {
    return (
      <>
        <div className="tools">
          <Grid container xm={12}>
            <Grid style={{ paddingTop: 35 }} item xm={10} sm={10}>
              {
                <h2>
                  Showing PRs for Project: <u>{this.props.projectName}</u>
                </h2>
              }
            </Grid>

            <Grid
              style={{ paddingTop: 35, paddingLeft: 159 }}
              item
              xm={2}
              sm={2}
            >
              {this.renderToggleFilterButton()}
            </Grid>
          </Grid>
        </div>
      </>
    );
  }
}
// Column definition
const columnTemplate = [
  {
    key: "prNumber",
    name: "PR Number",
    resizable: true,
    sortable: true,
    filterable: true,
    width: 90
  },
  {
    key: "arNumber",
    name: "Ar Number",
    resizable: true,
    sortable: true,
    filterable: true,
    width: 90
  },
  {
    key: "description",
    name: "PR Description",
    resizable: true,
    sortable: true,
    filterable: true
  },

  {
    key: "amount",
    name: "PR Total",
    resizable: true,
    sortable: true,
    filterable: true,
    width: 250
  }
];

// Row sorting code
const sortRows = (initialRows, sortColumn, sortDirection) => rows => {
  const comparer = (a, b) => {
    if (sortDirection === "ASC") {
      return a[sortColumn] > b[sortColumn] ? 1 : -1;
    } else if (sortDirection === "DESC") {
      return a[sortColumn] < b[sortColumn] ? 1 : -1;
    }
  };
  return sortDirection === "NONE" ? initialRows : [...rows].sort(comparer);
};

// Filtering code
const handleFilterChange = filter => filters => {
  const newFilters = { ...filters };
  if (filter.filterTerm) {
    newFilters[filter.column.key] = filter;
  } else {
    delete newFilters[filter.column.key];
  }
  return newFilters;
};

// Empty rows view
const EmptyRowsView = () => {
  const message = "No data to show";
  return (
    <div
      style={{
        textAlign: "center",
        backgroundColor: "#ECEDEE",
        padding: "20px"
      }}
    >
      <img
        style={{ paddingBottom: 20 }}
        src="./nodata.png"
        alt={message}
        height="140px"
      />
      <h3>{message}</h3>
    </div>
  );
};

function PrDataGrid(props) {
  const arContext = useContext(ArContext);

  const {
    setPrRow,
    prRows,
    setPrRows,
    prIndex,
    setPrIndex,
    projectName,
    arNumber,
    arIndex
  } = arContext;

  // Row Filtering Code
  const selectors = Data.Selectors;
  const [filters, setFilters] = useState({});
  const filteredRows = getRows(prRows, filters);

  function getRows(rows, filters) {
    return selectors.getRows({ rows, filters });
  }

  const handleRowsSelected = rows => {
    const row = rows.map(r => r.row);
    const rowIdx = rows.map(r => r.rowIdx);
    setPrRow(row[0]);
    setPrIndex(rowIdx);
  };

  const handleRowsDeselected = () => {
    setPrRow([]);
    setPrIndex([]);
  };

  return (
    <>
      <ReactDataGrid
        style={{ overflow: "visible" }}
        columns={columnTemplate}
        rowGetter={i => filteredRows[i]}
        enableCellSelect={true}
        rowsCount={filteredRows.length}
        minHeight={260}
        onGridSort={(sortColumn, sortDirection) => {
          setPrRows(sortRows(prRows, sortColumn, sortDirection));
          handleRowsDeselected();
        }}
        rowSelection={{
          showCheckbox: true,
          enableShiftSelect: false,
          onRowsSelected: handleRowsSelected,
          onRowsDeselected: handleRowsDeselected,
          selectBy: {
            indexes: prIndex
          }
        }}
        toolbar={
          <CustomArToolBar enableFilter={true} projectName={projectName} />
        }
        onAddFilter={filter => setFilters(handleFilterChange(filter))}
        onClearFilters={() => setFilters({})}
        emptyRowsView={EmptyRowsView}
      />
    </>
  );
}

// TODO: DEFINE PROPS

export default PrDataGrid;
