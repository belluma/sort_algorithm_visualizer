import React, { ChangeEvent } from "react";
import styles from "./Toolbar.module.css";
import Dropdown from "../Dropdown/Dropdown";
import Slider from "../Slider/Slider";
import algorithm from "../../interfaces/algorithm";

type Props = {
  changeArrayLength: (
    event: ChangeEvent<{}>,
    newValue: number | number[]
  ) => void;
  changeSpeed: (event: ChangeEvent<{}>, newValue: number | number[]) => void;
  chooseAlgorithm: (e: any) => void;
  arrayLength: number;
  speed: number;
  algorithms: algorithm[];
};

const Toolbar = (props: Props) => (
  <div className={styles.Toolbar}>
    <section className="p-6 m-6">
      <section className="py-6" id="size">
        <Slider
          min={10}
          max={200}
          label={"size of array"}
          value={props.arrayLength}
          handleChange={props.changeArrayLength}
        />
      </section>
      <section className="py-6" id="speed">
        <Slider
          min={1}
          max={10}
          label={"speed of animation"}
          value={props.speed}
          handleChange={props.changeSpeed}
        />
      </section>
      <section className="py-6" id="algorithm">
        <Dropdown
          algorithms={props.algorithms}
          handleChange={props.chooseAlgorithm}
        />
      </section>
    </section>
  </div>
);

export default Toolbar;
