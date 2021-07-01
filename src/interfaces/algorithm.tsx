// import { quickSortStep } from "../interfaces/animationStep";
// import { mergeSortStep } from "../interfaces/animationStep";
import step from "../interfaces/animationStep";

export default interface algorithm {
  name: string;
  selected: boolean;
  getAnimation: (array: number[]) => step[];
}
