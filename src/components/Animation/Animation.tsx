import React, { ReactElement } from "react";
import styles from "./Animation.module.css";
import Bar from "../Bar/Bar";
import { IconButton } from "@material-ui/core";
import PlayIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import step from "../../interfaces/animationStep";
// import { quickSortStep } from "../../interfaces/animationStep";
// import { mergeSortStep } from "../../interfaces/animationStep";

type Props = {
  step: step;
  startAnimation: () => void;
  next: () => void;
  previous: () => void;
  reset: () => void;
  play: boolean;
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
  const isLeft = (index: number) => index === props.step.indexLeft;
  const isRight = (index: number) => index === props.step.indexRight;
  function colorizeQuick(index: number) {
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
  }
  function colorizeMerge(index: number) {
    return isNew(index)
      ? "red"
      : isLeft(index)
      ? "darkcyan"
      : isRight(index)
      ? "navajowhite"
      : "black";
  }
  function colorizeHeap(index: number) {
    const isSorted = (index: number) =>
      props.step.end ? index >= props.step.end : false;
    const getsMovedForwardInHeap = (index: number) =>
      index === props.step.index;
    const getsMovedBackwardInHeap = (index: number) =>
      index === props.step.start;
    return isSorted(index)
      ? "blue"
      : getsMovedForwardInHeap(index)
      ? "navajowhite"
      : getsMovedBackwardInHeap(index)
      ? "darkcyan"
      : "gold";
  }
  function colorizeBubble(index: number) {
    return isNew(index)
      ? "red"
      : isLeft(index)
      ? "navajowhite"
      : isRight(index)
      ? "darkcyan"
      : "gold";
  }
  function colorize(index: number): string {
    if (props.step.method === "quick") return colorizeQuick(index);
    else if (props.step.method === "merge") return colorizeMerge(index);
    else if (props.step.method === "bubble") return colorizeBubble(index);
    else return colorizeHeap(index);
  }

  const playPause = props.play ? <PauseIcon /> : <PlayIcon />;
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
          {playPause}
        </IconButton>
        <IconButton onClick={props.next} aria-label="play" disabled={props.end}>
          <SkipNextIcon />
        </IconButton>
        <IconButton onClick={props.reset} aria-label="play">
          <RotateLeftIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default Animation;
