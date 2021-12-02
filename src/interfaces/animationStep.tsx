export default interface Step {
  array: number[];
  start?: number;
  end?: number;
  index?: number;
  border?: number;
  newArray?: boolean;
  indexLeft?: number;
  indexRight?: number;
  method: "quick" | "merge" | "heap" | "bubble" | "insert";
  aux?: any;
}
