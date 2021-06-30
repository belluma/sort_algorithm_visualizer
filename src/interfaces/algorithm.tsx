import step from "../interfaces/animationStep";

export default interface algorithm {
  name: string;
  selected: boolean;
  getAnimation: (array: number[]) => step[];
}
