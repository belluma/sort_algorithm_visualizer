import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import styles from "./Slider.module.css";
import { ChangeEvent } from "react";

const useStyles = makeStyles({
  root: {
    width: 200,
  },
});
type Props = {
  min: number;
  max: number;
  label: string;
  value: number;
  handleChange: (event: ChangeEvent<{}>, newValue: number | number[]) => void;
};

const MySlider = (props: Props) => {
  // const classes = useStyles();
  // const [value, setValue] = React.useState(
  //   Math.floor((props.min + props.max) / 2)
  // );
  // const handleChange = (
  //   event: ChangeEvent<{}>,
  //   newValue: number | number[]
  // ) => {
  //   if (typeof newValue === "number") {
  //     setValue(newValue);
  //     props.handleChange(newValue);
  //   }
  // };
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
