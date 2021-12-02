import React, {useEffect, useState} from "react";
import "./App.css";
import "bulma/css/bulma.min.css";
import Toolbar from "./components/Toolbar/Toolbar";
import Animation from "./components/Animation/Animation";
import {ChangeEvent} from "react";
import {createRandomArray} from "./helper";
import algorithms from "./algorithms/algorithms";
import Step from "./interfaces/animationStep";
import usePlayback from "./hooks/usePlayback";

function App() {

    const [toBeSorted, setToBeSorted] = useState<number[]>(createRandomArray(10));
    const [algorithmOptions, setAlgorithmOptions] = useState(algorithms);
    const [animation, setAnimation] = useState<Step[]>([])
    const [speed, setSpeed] = useState(1);
    const {setPlay, play, step, startPause, next, previous, reset} = usePlayback();
    useEffect(() => {
        const selectedAlgorithm = algorithmOptions.find(o => o.selected)
        if (selectedAlgorithm) {
            setAnimation(selectedAlgorithm.getAnimation([...toBeSorted]))
        } else throw new Error()
    }, [algorithmOptions, toBeSorted]);

    useEffect(() => {
        const animate = () => {
            next()
        };
        if (play) {
            const timer = setTimeout(
                () => animate(),
                500 - (2 * speed ** 2 + 20 * speed + 95)
            );
            return () => clearTimeout(timer);
        }
    }, [step, play, speed, next]);
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
        if (typeof value === "number") setSpeed(value);
    };

    const chooseAlgorithm = (event: ChangeEvent<HTMLInputElement>): void => {
        const options = [...algorithmOptions.map(a => a.name === event.target.value ? {...a, selected: true} : {
            ...a,
            selected: false
        })]
        setAlgorithmOptions(options)
    };
    if (animation && step >= animation.length - 1 && play)
        setPlay(false);

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
                                speed={speed}
                                algorithms={algorithmOptions}
                            />
                        </div>
                        <div className="column">{animation.length ? <Animation
                            startAnimation={startPause}
                            next={next}
                            previous={previous}
                            reset={reset}
                            play={play}
                            step={animation[step]}
                            start={step === 0}
                            end={step === animation.length - 1}
                        /> : <></>}</div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default App;
