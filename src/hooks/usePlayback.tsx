import {useState} from "react";

const usePlayback = () => {
    const [play, setPlay] = useState(false);
    const [step, setStep] = useState(0);
    const startPause = (): void => {
        setPlay(!play);
    };
    const next = () => {
        setStep(step + 1);
    };
    const previous = () => {
        setStep(step - 1);
    };
    const reset = () => {
        setStep(0);
    };
    return {setPlay, play, step, startPause, next, previous, reset};
}

export default usePlayback
