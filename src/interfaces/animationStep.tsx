export default interface iStep {
  array: number[];
  start?: number;
  end?: number;
  index?: number;
  border?: number;
  newArray?: boolean;
  indexLeft?: number;
  indexRight?: number;
  method: "quick" | "merge" | "heap" | "bubble";
  aux?: any;
}

export interface quickSortStep {
  array: number[];
  start: number;
  end: number;
  index: number;
  border: number;
  newArray: boolean;
}
