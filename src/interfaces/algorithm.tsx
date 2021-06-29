export default interface algorithm {
  name: string;
  selected: boolean;
  getAnimation: (array: number[], reset: boolean, helperArray: number[]) => any;
}
