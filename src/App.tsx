import React, { useState } from "react";
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
  // console.log(qSort(createRandomArray(500)));
  const [state, setState] = useState({
    array: createRandomArray(10),
    speed: 1,
    step: 1,
    algorithms: [
      { name: "quicksort", selected: true, getAnimation: qSort },
      { name: "mergesort", selected: false, getAnimation: () => {} },
    ],
    selectedAlgorithm: qSort,
    animation: [[]],
    play: false,
  });

  const changeArrayLength = (
    event: ChangeEvent<{}>,
    length: number | number[]
  ): void => {
    if (typeof length === "number") {
      const arr = createRandomArray(length);
      console.log(state.selectedAlgorithm);
      // console.log(qSort(arr));
      setState({
        ...state,
        array: arr,
        // animation: state.selectedAlgorithm(array),
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
    setState({
      ...state,
      array: state.animation[state.step],
      step: state.step + 1,
    });
    // setTimeout(() => startAnimation(), 100);
    console.log(state.step, state.animation[state.step]);
  };
  const chooseAlgorithm = (event: any): void => {
    const algorithms = [...state.algorithms];
    console.log(algorithms);
    algorithms.map((a) => (a.selected = false));

    const selected = algorithms.filter((a) => a.name === event.target.value)[0];
    selected.selected = true;
    console.log(selected.getAnimation);

    setState({
      ...state,
      algorithms: algorithms,
      selectedAlgorithm: selected.getAnimation,
      animation: selected.getAnimation(state.array),
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
