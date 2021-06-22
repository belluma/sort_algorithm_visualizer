import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import "bulma/css/bulma.min.css";
import Toolbar from "./components/Toolbar/Toolbar";
import Animation from "./components/Animation/Animation";
import { ChangeEvent } from "react";
const algorithms = ["quicksort"];

function App() {
  const createRandomArray = (length: number): number[] => {
    return [...Array(length)].map(
      (a) => (a = Math.ceil(Math.random() * length))
    );
  };

  const [state, setState] = useState({
    array: createRandomArray(50),
    speed: 1,
    algorithm: algorithms[0],
  });

  const changeArray = (
    event: ChangeEvent<{}>,
    length: number | number[]
  ): void => {
    if (typeof length === "number")
      setState({ ...state, array: createRandomArray(length) });
  };
  const changeSpeed = (
    event: ChangeEvent<{}>,
    value: number | number[]
  ): void => {
    if (typeof value === "number") setState({ ...state, speed: value });
  };

  const startAnimation = (): void => {};
  const chooseAlgorithm = (): void => {};

  return (
    <div className="columns is-mobile">
      <div className="column is-narrow">
        <Toolbar
          changeArray={changeArray}
          changeSpeed={changeSpeed}
          chooseAlgorithm={chooseAlgorithm}
          arrayLength={state.array.length}
          speed={state.speed}
          algorithm={state.algorithm}
          algorithms={algorithms}
        />
      </div>
      <div className="column">
        <Animation startAnimation={startAnimation} array={state.array} />
      </div>
    </div>
  );
}

export default App;
