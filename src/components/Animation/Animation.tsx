import React, { ReactElement } from "react";
import styles from "./Animation.module.css";
import Bar from "../Bar/Bar";
import { IconButton } from "@material-ui/core";
import PlayIcon from "@material-ui/icons/PlayArrow";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import step from "../../interfaces/animationStep";

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
  const isPivot = (index: number) => index === props.step.end;
  const isLesser = (index: number) =>
    index >= props.step.start && index < props.step.border;
  const isGreater = (index: number) =>
    index >= props.step.border && index <= props.step.index;
  const isNew = (index: number) =>
    props.step.newArray && index >= props.step.start && index <= props.step.end;
  // const isUnsorted = (index: number) =>
  //   index >= props.step.index && index < props.step.end;
  const colorize = (index: number): string => {
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
