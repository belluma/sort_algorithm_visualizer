export default interface iStep {
  array: number[];
  start?: number;
  end?: number;
  index?: number;
  border?: number;
  newArray?: boolean;
  indexLeft?: number;
  indexRight?: number;
  method: "quick" | "merge";
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

// export interface mergeSortStep {
//   array: number[];
// }
