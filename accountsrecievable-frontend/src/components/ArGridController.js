import React, { useState, useContext } from "react";
import ReactDataGrid from "react-data-grid";
import { Toolbar, Data } from "react-data-grid-addons";
import Grid from "@material-ui/core/Grid";
import { ArContext } from "./context";
import EndDatePopOver from "./EndDatePopOver";
import FundsUsedPopOver from "./FundsUsedPopOver";
import CurrencyFormatter from "./CurrencyFormatter";
import moment from "moment";
import { enumerateStatus, fundsUsedPercentage } from "./common/functions";

/* TODO: Isolate and change to hooks - warning: Attempted to do this but there were   
complications with rendering the filter row so I moved on in favor of bigger problems */
export class CustomArToolBar extends Toolbar {
  render() {
    return (
      <>
        <div className="tools">
          <Grid container xm={12}>
            <Grid style={{ paddingTop: 35 }} item xm={2} sm={2}>
              {<h2>Projects:</h2>}
            </Grid>
            <Grid style={{ paddingTop: 35 }} item xm={8} sm={8}></Grid>
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
    key: "warnings",
    name: "Warnings",
    resizable: false,
    sorable: true,
    filterable: false,
    width: 80
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
    key: "site",
    name: "Site",
    resizable: true,
    sortable: true,
    filterable: true,
    width: 60
  },
  {
    key: "status",
    name: "Status",
    resizable: true,
    sortable: true,
    filterable: true,
    width: 115
  },
  {
    key: "projectName",
    name: "Project Name",
    resizable: true,
    sortable: true,
    filterable: true
  },
  {
    key: "director",
    name: "Director",
    resizable: true,
    sortable: true,
    filterable: true,
    width: 220
  },
  {
    key: "owner",
    name: "Owner",
    resizable: true,
    sortable: true,
    filterable: true,
    width: 220
  },
  {
    key: "startDate",
    name: "Start Date",
    resizable: true,
    sortable: true,
    filterable: true,
    width: 90
  },
  {
    key: "endDate",
    name: "End Date",
    resizable: true,
    sortable: true,
    filterable: true,
    width: 90
  },
  {
    key: "amount",
    name: "AR Amount",
    resizable: true,
    sortable: true,
    filterable: true,
    width: 100,
    formatter: <CurrencyFormatter />
  },
  {
    key: "committed",
    name: "Total Committed",
    resizable: true,
    sortable: true,
    filterable: true,
    width: 125,
    formatter: <CurrencyFormatter />
  },
  {
    key: "costCenter",
    name: "",
    width: -1,
    hidden: true
  },
  {
    key: "actualPercent",
    name: "",
    width: -1,
    hidden: true
  },
  {
    key: "comments",
    name: "",
    width: -1,
    hidden: true
  },
  {
    key: "purpose",
    name: "",
    width: -1,
    hidden: true
  },
  {
    key: "benefits",
    name: "",
    width: -1,
    hidden: true
  },
  {
    key: "risks",
    name: "",
    width: -1,
    hidden: true
  },
  {
    key: "asset",
    name: "",
    width: -1,
    hidden: true
  },
  {
    key: "type",
    name: "",
    width: -1,
    hidden: true
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

function ArDataGrid(props) {
  const arContext = useContext(ArContext);

  const {
    setArRow,
    arRows,
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
    setPurpose,
    setBenefits,
    setRisks,
    setAsset,
    setType,

    setCommitted,
    setComments,
    setFundsUsed,
    setActualCompletion,

    setArId
  } = arContext;

  const endDateAction = [
    {
      icon: <EndDatePopOver />
    }
  ];
  const fundsUsedAction = [
    {
      icon: <FundsUsedPopOver />
    }
  ];
  const bothActions = [
    {
      icon: <EndDatePopOver />
    },
    {
      icon: <FundsUsedPopOver />
    }
  ];

  function getCellActions(column, row) {
    let fundsUsedCondition = false;
    const used = (row.committed / row.amount) * 100;
    if (used > 60) {
      fundsUsedCondition = true;
    }

    const start = moment(new Date(row.endDate));
    const end = moment(new Date());

    const endDiff = start.diff(end);
    // If the difference in seconds is less than 30 days, render the warning
    const endDateCondition = endDiff < 2.592e9;

    let cellActions = {
      warnings: null
    };

    if (fundsUsedCondition && endDateCondition) {
      cellActions = {
        warnings: bothActions
      };
    }

    if (fundsUsedCondition && !endDateCondition) {
      cellActions = {
        warnings: endDateAction
      };
    }

    if (!fundsUsedCondition && endDateCondition) {
      cellActions = {
        warnings: fundsUsedAction
      };
    }

    return cellActions[column.key];
  }

  // Row Filtering Code
  const selectors = Data.Selectors;
  const [filters, setFilters] = useState({});
  const filteredRows = getRows(arRows, filters);

  function getRows(rows, filters) {
    return selectors.getRows({ rows, filters });
  }

  const handleRowsDeselected = () => {
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
  };

  const handleRowsSelected = rows => {
    const rowIdx = rows.map(r => r.rowIdx);
    if (rowIdx.length === 1) {
      const row = rows.map(r => r.row);
      setPrRows([]);
      setPrIndex([]);
      setArId(row[0].arID);
      setArRow(row[0]);
      setArIndex(rowIdx);
      setArNumber(row[0].arNumber);
      setArStatus(row[0].status);
      setArStatusId(enumerateStatus(row[0].status));

      setProjectName(row[0].projectName);
      setCostCenter(row[0].costCenter);

      setSite(row[0].site);
      setOwner(row[0].owner);
      setDirector(row[0].director);
      setStartDate(row[0].startDate);
      setEndDate(row[0].endDate);
      setAmount(row[0].amount);
      setCommitted(row[0].committed);
      setComments(row[0].comments);
      setPurpose(row[0].purpose);
      setRisks(row[0].risks);
      setBenefits(row[0].benefits);
      setAsset(row[0].asset);
      setType(row[0].type);
      setActualCompletion(row[0].actualPercent);
      setFundsUsed(fundsUsedPercentage(row[0].committed, row[0].amount));
    }
  };

  return (
    <>
      <ReactDataGrid
        style={{ overflow: "visible" }}
        columns={columnTemplate}
        rowGetter={i => filteredRows[i]}
        enableCellSelect={true}
        rowsCount={filteredRows.length}
        minHeight={290}
        onGridSort={(sortColumn, sortDirection) => {
          setArRows(sortRows(arRows, sortColumn, sortDirection));
          handleRowsDeselected();
        }}
        rowSelection={{
          showCheckbox: true,
          enableShiftSelect: false,
          onRowsSelected: handleRowsSelected,
          onRowsDeSelected: handleRowsDeselected,
          selectBy: {
            indexes: arIndex
          }
        }}
        toolbar={<CustomArToolBar enableFilter={true} arNumber={arNumber} />}
        onAddFilter={filter => {
          setFilters(handleFilterChange(filter));
          handleRowsDeselected();
        }}
        onClearFilters={() => {
          setFilters({});
        }}
        emptyRowsView={EmptyRowsView}
        getCellActions={getCellActions}
      />
    </>
  );
}

// TODO: DEFINE PROPS

export default ArDataGrid;
