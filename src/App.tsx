import React, { useEffect, useState } from "react";
import "./App.css";
import "bulma/css/bulma.min.css";
import Toolbar from "./components/Toolbar/Toolbar";
import Animation from "./components/Animation/Animation";
import { ChangeEvent } from "react";
import qSort from "./algorithms/qSort";
import iState from "./interfaces/state";
import iStep from "./interfaces/animationStep";

function App() {
  const createRandomArray = (length: number): number[] => {
    return [...Array(length)].map(
      (a) => (a = Math.ceil(Math.random() * length))
    );
  };
  const [state, setState] = useState<iState>({
    array: createRandomArray(10),
    speed: 1,
    step: 0,
    algorithms: [
      { name: "quicksort", selected: true, getAnimation: qSort },
      {
        name: "mergesort",
        selected: false,
        getAnimation: qSort,
      },
    ],
    selectedAlgorithm: qSort,
    play: false,
  });
  useEffect(() => {
    setState({
      ...state,
      animation: state.selectedAlgorithm([...state.array]),
      step: 0,
      play: false,
    });
  }, [state.selectedAlgorithm, state.array]);

  useEffect(() => {
    console.log("step", state.step);
    if (state.play) {
      const timer = setTimeout(
        () => animate(),
        500 - (2 * state.speed ** 2 + 20 * state.speed + 95)
      );
      return () => clearTimeout(timer);
    }
  }, [state.step, state.play, state.speed]);

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

  const startPause = (): void => {
    setState({ ...state, play: !state.play });
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
    });
  };
  if (state.animation && state.step >= state.animation.length - 1 && state.play)
    setState({ ...state, play: false });

  const animate = () => {
    setState({ ...state, step: state.step + 1 });
  };
  const next = () => {
    setState({ ...state, step: state.step + 1 });
  };
  const previous = () => {
    setState({ ...state, step: state.step - 1 });
  };
  const animation = () => {
    if (state.animation)
      return (
        <Animation
          startAnimation={startPause}
          next={next}
          previous={previous}
          step={state.animation[state.step]}
          start={state.step === 0}
          end={state.step === state.animation.length - 1}
        />
      );
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
          algorithms={state.algorithms}
        />
      </div>
      <div className="column">{animation()}</div>
    </div>
  );
}

export default App;
