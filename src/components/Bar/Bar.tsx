import React from "react";
import styles from "./Bar.module.css";

type Props = {
  value: number;
  arrayLength: number;
};

const Bar = (props: Props) => {
  const height = (props.value / props.arrayLength) * 100 + "%";
  const padding = (1 / props.arrayLength) * 20 + "%";
  const width = (1 / props.arrayLength) * 80 + "%";
  const styleObj = { height: height, width: width, marginRight: padding };

  return <div className={styles.Bar} style={styleObj}></div>;
};

export default Bar;
