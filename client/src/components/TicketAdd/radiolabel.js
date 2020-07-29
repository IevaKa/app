import React from "react";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import { withStyles } from "@material-ui/core/styles";

import {
  ironBlue,
  ironRed,
  lightRed,
} from "../../styles/global.js";

const CssRadio = withStyles({
  root: {
    color: ironBlue,
    // backgroundColor: 'red'
  },
  checked: {
    color: ironBlue,
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
    color: ironBlue,
    fontFamily: `'Poppins', sans-serif`,
    padding: "0 5px",
  },
  label: {
    fontFamily: `'Poppins', sans-serif`,
    fontSize: '14px',
    color: ironBlue,
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
        checked={props.category === "Lab"}
        onChange={props.handleChange}
        type="radio"
        value="Lab"
        name="category"
        inputProps={{ "aria-label": "A" }}
        control={
          <CssRadio
            classes={{
              checked: classes.checked,
            }}
          />
        }
        label="Lab"
        classes={{
          label: classes.label,
        }}
      />
      <CssFormControlLabel
        checked={props.category === "Question"}
        onChange={props.handleChange}
        type="radio"
        value="Question"
        name="category"
        inputProps={{ "aria-label": "A" }}
        control={
          <CssRadio
            classes={{
              checked: classes.checked,
            }}
          />
        }
        label="Question"
        classes={{
          label: classes.label,
        }}
      />
      <CssFormControlLabel
        checked={props.category === "Error"}
        onChange={props.handleChange}
        type="radio"
        value="Error"
        name="category"
        inputProps={{ "aria-label": "A" }}
        control={
          <CssRadio
            classes={{
              checked: classes.checked,
            }}
          />
        }
        label="Error"
        style={{ "label.color": "white" }}
        classes={{
          label: classes.label,
        }}
      />
    </>
  );
}

export default CssSyncRadioLabel;
