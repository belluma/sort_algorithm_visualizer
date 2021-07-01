import React, { ReactElement } from "react";
import styles from "./Animation.module.css";
import Bar from "../Bar/Bar";
import { IconButton } from "@material-ui/core";
import PlayIcon from "@material-ui/icons/PlayArrow";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import step from "../../interfaces/animationStep";
// import { quickSortStep } from "../../interfaces/animationStep";
// import { mergeSortStep } from "../../interfaces/animationStep";

type Props = {
  step: step;
  startAnimation: () => void;
  next: () => void;
  previous: () => void;
  start: boolean;
  end: boolean;
};

const Animation = (props: Props) => {
  const bars: ReactElement[] = [];
  const array = props.step.array;
  const isNew = (index: number) =>
    props.step.start === undefined || props.step.end === undefined
      ? false
      : props.step.newArray &&
        index >= props.step.start &&
        index <= props.step.end;

  const colorizeQuick = (index: number) => {
    const isPivot = (index: number) => index === props.step.end;
    const isLesser = (index: number) =>
      props.step.start === undefined || props.step.border === undefined
        ? false
        : index >= props.step.start && index < props.step.border;
    const isGreater = (index: number) =>
      props.step.border === undefined || props.step.index === undefined
        ? false
        : index >= props.step.border && index <= props.step.index;
    return isNew(index)
      ? "red"
      : isPivot(index)
      ? "blue"
      : isLesser(index)
      ? "darkcyan"
      : isGreater(index)
      ? "navajowhite"
      : "black";
  };
  const colorizeMerge = (index: number) => {
    const isLeft = (index: number) => index === props.step.indexLeft;
    const isRight = (index: number) => index === props.step.indexRight;
    return isNew(index)
      ? "red"
      : isLeft(index)
      ? "darkcyan"
      : isRight(index)
      ? "navajowhite"
      : "black";
  };
  console.log(props.step);
  const colorize = (index: number): string => {
    if (props.step.method === "quick") return colorizeQuick(index);
    else return colorizeMerge(index);
  };
  array.forEach((a, i) =>
    bars.push(
      <Bar value={a} arrayLength={array.length} key={i} color={colorize(i)} />
    )
  );
  return (
    <div className={styles.Animation}>
      <div style={{ height: "95%", marginTop: "5%" }}>{bars}</div>
      <div style={{ textAlign: "center" }}>
        <IconButton
          onClick={props.previous}
          aria-label="play"
          disabled={props.start}
        >
          <SkipPreviousIcon />
        </IconButton>
        <IconButton onClick={props.startAnimation} aria-label="play">
          <PlayIcon />
        </IconButton>
        <IconButton onClick={props.next} aria-label="play" disabled={props.end}>
          <SkipNextIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default Animation;
