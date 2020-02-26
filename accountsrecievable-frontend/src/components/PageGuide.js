import React from "react";
import Joyride from "react-joyride";

export default function PageGuide() {
  return (
    <Joyride
      run={true}
      callback={() => null}
      hideBackButton={true}
      styles={{
        options: {
          arrowColor: "#D2E7FF", //typography standards
          backgroundColor: "#D2E7FF", //typography standards
          primaryColor: "#006fcf",
          width: 375,
          zIndex: 1000
        }
      }}
      steps={[
        {
          placementBeacon: "bottom",
          content:
            "Welcome to your virtual tour of the Support Services Accounts Receivable application! To begin, right click at any spot in the grid to get a list of actions that you can take. Select 'Add Row' to add a new record and then 'Delete Row' to delete the record.",
          target: ".react-grid-Cell:nth-child(4)"
        },
        {
          content:
            "To edit data, you may start typing in (or double click) any editable cell. Try it now, with the Project Owner dropdown field.",
          target: ".react-grid-Cell:nth-child(5)"
        },
        {
          content:
            "Sorting can be achieved by clicking on any column header. Sort order is determined by the direction of the arrow that appears. Click the 'End Date' header one or two times to observe how it works.",
          target: ".react-grid-HeaderCell:nth-child(7)"
        },
        {
          content:
            "To filter records, click the filter button. Once you have done so, enter the name 'Sally' in the 'Director' filter box to see how it works for yourself.",
          target: ".tools:nth-child(1)"
        },
        {
          content:
            "Change your view from Active ARs to Closed ARs by toggling the switch.",
          target: ".MuiSwitch-root"
        },
        {
          content:
            "This concludes your virtual tour. You may access this again by ... doing things... in your user profile. Thank you!",
          target: ".react-grid-Cell:nth-child(6)"
        }
      ]}
    />
  );
}
