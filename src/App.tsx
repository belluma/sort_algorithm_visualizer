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
    const [animation, setAnimation] = useState<Step[]>([])
    const [playback, setPlayback] = useState<iState>({
        speed: 1,
        step: 0,
        play: false,
    });
    useEffect(() => {
        getAnimation();
    }, []);

    useEffect(() => {
        setPlayback({
            ...playback,
            step: 0,
            play: false,
        });
    }, [algorithmOptions, animation, toBeSorted]);

    useEffect(() => {
        const animate = () => {
            setPlayback({...playback, step: playback.step + 1});
        };
        if (playback.play) {
            const timer = setTimeout(
                () => animate(),
                500 - (2 * playback.speed ** 2 + 20 * playback.speed + 95)
            );
            return () => clearTimeout(timer);
        }
    }, [playback.step, playback.play, playback.speed]);

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
        if (typeof value === "number") setPlayback({...playback, speed: value});
    };
    const getAnimation = (options = algorithmOptions) => {
        const selectedAlgorithm = options.find(o => o.selected)
        if (selectedAlgorithm) {
            setAnimation(selectedAlgorithm.getAnimation(toBeSorted))
        } else throw new Error()
    }

    const chooseAlgorithm = (event: any): void => {
        const options = [...algorithmOptions.map(a => a.name === event.target.value ? {...a, selected: true} : {
            ...a,
            selected: false
        })]
        setAlgorithmOptions(options)
        getAnimation(options)
    };
    if (playback.animation && playback.step >= playback.animation.length - 1 && playback.play)
        setPlayback({...playback, play: false});
    const startPause = (): void => {
        setPlayback({...playback, play: !playback.play});
    };
    const next = () => {
        setPlayback({...playback, step: playback.step + 1});
    };
    const previous = () => {
        setPlayback({...playback, step: playback.step - 1});
    };
    const reset = () => {
        setPlayback({...playback, step: 0, play: false});
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
                                speed={playback.speed}
                                algorithms={algorithmOptions}
                            />
                        </div>
                        <div className="column">{animation.length ? <Animation
                            startAnimation={startPause}
                            next={next}
                            previous={previous}
                            reset={reset}
                            play={playback.play}
                            step={animation[playback.step]}
                            start={playback.step === 0}
                            end={playback.step === animation.length - 1}
                        /> : <></>}</div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default App;
