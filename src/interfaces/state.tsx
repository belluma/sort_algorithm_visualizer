import algorithm from "./algorithm";
import step from "./animationStep";

export default interface state {
  animation?: step[];
  array: number[];
  speed: number;
  step: number;
  algorithms: algorithm[];
  selectedAlgorithm: (array: number[]) => step[];
  play: boolean;
}
