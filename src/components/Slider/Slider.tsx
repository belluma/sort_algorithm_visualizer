import React from "react";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import styles from "./Slider.module.css";
import { ChangeEvent } from "react";

type Props = {
  min: number;
  max: number;
  label: string;
  value: number;
  handleChange: (event: ChangeEvent<{}>, newValue: number | number[]) => void;
};

const MySlider = (props: Props) => {
  return (
    <div className={styles.Slider}>
      <Typography id="continuous-slider" gutterBottom>
        {props.label}
      </Typography>
      <Slider
        min={props.min}
        max={props.max}
        value={props.value}
        onChange={props.handleChange}
        aria-labelledby="continuous-slider"
      />
    </div>
  );
};

export default MySlider;
