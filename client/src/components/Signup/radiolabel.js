import React from "react";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import { withStyles } from "@material-ui/core/styles";

import {
  ironRed,
  lightRed,
} from "../../styles/global.js";

const CssRadio = withStyles({
  root: {
    color: "white",
  },
  checked: {
    color: "white",
  },
  colorSecondary: {
    "&$checked": {
      color: ironRed,
      "&:hover": {
        backgroundColor: lightRed,
        "@media (hover: none)": {
          backgroundColor: "transparent",
        },
      },
    },
  },
})(Radio);

const CssFormControlLabel = withStyles({
  root: {
    color: "white",
    fontFamily: `'Poppins', sans-serif`,
    padding: "0 5px",
  },
  label: {
    fontFamily: `'Poppins', sans-serif`,
    fontSize: '14px',
    color: "white",
  },
})(FormControlLabel);

const CssSyncRadioLabel = withStyles({
  checked: {
    "&, & + $label": {
      color: ironRed,
      transition: "all 0.5s ease-in",
    },
  },
  label: {},
})(SyncRadioLabel);

function SyncRadioLabel(props) {
  const { classes } = props;

  return (
    <>
      <CssFormControlLabel
        checked={props.role === "Student"}
        onChange={props.handleChange}
        type="radio"
        value="Student"
        name="role"
        inputProps={{ "aria-label": "A" }}
        control={
          <CssRadio
            classes={{
              checked: classes.checked,
            }}
          />
        }
        label="Student"
        classes={{
          label: classes.label,
        }}
      />
      <CssFormControlLabel
        checked={props.role === "Teacher"}
        onChange={props.handleChange}
        type="radio"
        value="Teacher"
        name="role"
        inputProps={{ "aria-label": "A" }}
        control={
          <CssRadio
            classes={{
              checked: classes.checked,
            }}
          />
        }
        label="Teacher"
        style={{ "label.color": "white" }}
        classes={{
          label: classes.label,
        }}
      />
    </>
  );
}

export default CssSyncRadioLabel;
