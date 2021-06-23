export default interface algorithm {
  name: string;
  selected: boolean;
  getAnimation: (array: number[], helperArray: number[]) => any;
}
