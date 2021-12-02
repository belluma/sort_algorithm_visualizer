import React, {useEffect, useState} from "react";
import "./App.css";
import "bulma/css/bulma.min.css";
import Toolbar from "./components/Toolbar/Toolbar";
import Animation from "./components/Animation/Animation";

import {ChangeEvent} from "react";
import quickSort from "./algorithms/qSort";

import iState, {TAlgorithm} from "./interfaces/state";
import {createRandomArray} from "./helper";
import algorithms from "./algorithms/algorithms";
import Step from "./interfaces/animationStep";

function App() {

    const [toBeSorted, setToBeSorted] = useState<number[]>(createRandomArray(10));
    const [algorithmOptions, setAlgorithmOptions] = useState(algorithms);
    // const [sortWith, setSortWith] = useState(algorithms[0].getAnimation);
    const [animation, setAnimation] = useState<Step[]>([])

    const [state, setState] = useState<iState>({
        speed: 1,
        step: 0,
        play: false,
    });
    useEffect(() => {
        setState({
            ...state,
            // animation: state.selectedAlgorithm([...toBeSorted]),
            step: 0,
            play: false,
        });
    }, [state.selectedAlgorithm, toBeSorted]);

    useEffect(() => {
        const animate = () => {
            setState({...state, step: state.step + 1});
        };
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
            setToBeSorted(createRandomArray(length));
        }
    };
    const changeSpeed = (
        event: ChangeEvent<{}>,
        value: number | number[]
    ): void => {
        if (typeof value === "number") setState({...state, speed: value});
    };

    const chooseAlgorithm = (event: any): void => {
        const options = [...algorithmOptions.map(a => a.name === event.target.value ? {...a, selected: true} : {
            ...a,
            selected: false
        })]
        setAlgorithmOptions(options)
        const selectedAlgorithm = options.find(o => o.name === event.target.value)
        if (selectedAlgorithm) {
            setAnimation(selectedAlgorithm.getAnimation(toBeSorted))
        } else throw new Error()
    };
    if (state.animation && state.step >= state.animation.length - 1 && state.play)
        setState({...state, play: false});
    const startPause = (): void => {
        setState({...state, play: !state.play});
    };
    const next = () => {
        setState({...state, step: state.step + 1});
    };
    const previous = () => {
        setState({...state, step: state.step - 1});
    };
    const reset = () => {
        setState({...state, step: 0, play: false});
    };
    const animation2 = () => {
        if (animation.length)
            return (
                <Animation
                    startAnimation={startPause}
                    next={next}
                    previous={previous}
                    reset={reset}
                    play={state.play}
                    step={animation[state.step]}
                    start={state.step === 0}
                    // end={state.step === animation.length - 1}
                    end={false}
                />
            );
    };
    return (
        <section className="hero is-fullheight has-background-link-light">
            <div className="hero-head">
                <div className="container pt-6">
                    <p className="title">Sorting Algorithm Visualizer</p>
                </div>
            </div>
            <div className="hero-body">
                <div className="container is-fluid">
                    <div className="columns is-mobile m-0 p-0">
                        <div className="column is-narrow">
                            <Toolbar
                                changeArrayLength={changeArrayLength}
                                changeSpeed={changeSpeed}
                                chooseAlgorithm={chooseAlgorithm}
                                arrayLength={toBeSorted.length}
                                speed={state.speed}
                                algorithms={algorithmOptions}
                            />
                        </div>
                        <div className="column">{animation2()}</div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default App;
