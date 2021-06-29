import React, { useEffect, useState } from "react";
import "./App.css";
import "bulma/css/bulma.min.css";
import Toolbar from "./components/Toolbar/Toolbar";
import Animation from "./components/Animation/Animation";
import { ChangeEvent } from "react";
import qSort from "./algorithms/qSort";
import algorithm from "./interfaces/algorithm";

function App() {
  const createRandomArray = (length: number): number[] => {
    return [...Array(length)].map(
      (a) => (a = Math.ceil(Math.random() * length))
    );
  };
  const [state, setState] = useState({
    array: createRandomArray(10),
    speed: 1,
    step: 0,
    algorithms: [
      { name: "quicksort", selected: true, getAnimation: qSort },
      {
        name: "mergesort",
        selected: false,
        getAnimation: () => {
          return [[1, 2]];
        },
      },
    ],
    selectedAlgorithm: qSort,
    animation: [[1]],
    play: false,
  });
  useEffect(() => {
    console.log(123);
    setState({
      ...state,
      animation: state.selectedAlgorithm([...state.array]),
    });
  }, [state.selectedAlgorithm, state.array]);

  const changeArrayLength = (
    event: ChangeEvent<{}>,
    length: number | number[]
  ): void => {
    if (typeof length === "number") {
      setState({
        ...state,
        array: createRandomArray(length),
      });
    }
  };
  const changeSpeed = (
    event: ChangeEvent<{}>,
    value: number | number[]
  ): void => {
    if (typeof value === "number") setState({ ...state, speed: value });
  };

  const startAnimation = (): void => {
    console.log(state.animation);
    // console.log(state.step);
    // setState({
    //   ...state,
    //   array: state.animation[state.step],
    //   step:
    //     state.step < state.animation.length - 1 ? state.step + 1 : state.step,
    // });
    // setTimeout(() => startAnimation(), 100);
  };
  const chooseAlgorithm = (event: any): void => {
    const algorithms = [...state.algorithms];
    algorithms.forEach((a) => (a.selected = false));
    const selected = algorithms.filter((a) => a.name === event.target.value)[0];
    selected.selected = true;

    setState({
      ...state,
      algorithms: algorithms,
      selectedAlgorithm: selected.getAnimation,
      // animation: selected.getAnimation(state.array),
    });

    console.log(event.target.value);
    // console.log(algorithmNames);
  };

  return (
    <div className="columns is-mobile">
      <div className="column is-narrow">
        <Toolbar
          changeArrayLength={changeArrayLength}
          changeSpeed={changeSpeed}
          chooseAlgorithm={chooseAlgorithm}
          arrayLength={state.array.length}
          speed={state.speed}
          // selectedAlgorithm={getSelectedAlgorithm()}
          algorithms={state.algorithms}
        />
      </div>
      <div className="column">
        <Animation startAnimation={startAnimation} array={state.array} />
      </div>
    </div>
  );
}

export default App;
