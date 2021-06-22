import React, { ReactElement } from "react";
import styles from "./Animation.module.css";
import Bar from "../Bar/Bar";
import { IconButton } from "@material-ui/core";
import PlayIcon from "@material-ui/icons/PlayArrow";

type Props = {
  array: number[];
  startAnimation: () => void;
};

const Animation = (props: Props) => {
  const bars: ReactElement[] = [];
  props.array.forEach((a, i) =>
    bars.push(<Bar value={a} arrayLength={props.array.length} key={i} />)
  );

  return (
    <div className={styles.Animation}>
      <div style={{ height: "95%", marginTop: "5%" }}>{bars}</div>
      <div style={{ textAlign: "center" }}>
        <IconButton aria-label="play">
          <PlayIcon onClick={props.startAnimation} />
        </IconButton>
      </div>
    </div>
  );
};

export default Animation;
