import React, { useState, useRef, useEffect } from "react";
import Slider from "@material-ui/core/Slider";
import { denumerateStatus, isRole } from "./common/functions";

const ThreshHoldSlider = props => {
  const determineColor = value => {
    if (value < 30) {
      return "#008767";
    } else if (value < 60) {
      return "#FDB92D";
    } else {
      return "#B42C01";
    }
  };

  const [value, setValue] = React.useState(0);

  useEffect(() => {
    setValue(props.value);
  }, []);

  const slider = useRef(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    slider.current.color = determineColor(newValue);
    props.onChange(newValue);
  };
  return (
    <>
      <Slider
        defaultValue={props.value}
        ref={slider}
        style={{ color: determineColor(props.value), height: 20 }}
        value={props.value}
        min={0}
        step={1}
        max={100}
        //valueLabelFormat={props.value}
        onChange={handleChange}
        onCommitted={props.onCommitted && props.onCommitted}
        onChangeCommitted={props.onBlur && props.onBlur}
        valueLabelDisplay="auto"
        aria-labelledby="non-linear-slider"
      />
    </>
  );
};
export default ThreshHoldSlider;
