import step from "../interfaces/animationStep";

const meta = (array: number[]) => {
  const animations: step[] = [];
  const updateStep = (
    start: number,
    end: number,
    index: number,
    border: number,
    newArray: boolean = false
  ) => {
    return {
      array: [...array],
      start: start,
      end: end,
      index: index,
      border: border,
      newArray: newArray,
    };
  };
  const quickSort = (start: number, end: number) => {
    if (end - start > 0) {
      const pivot: number = array[end];
      let border: number = start;

      const step: step = {
        array: [...array],
        start: start,
        end: end,
        index: -1,
        border: start,
        newArray: true,
      };
      animations.push(step);
      for (let i = start; i < end; i++) {
        if (array[i] < pivot) {
          [array[i], array[border]] = [array[border], array[i]];
          border++;
        }
        animations.push(updateStep(start, end, i, border));
      }
      [array[end], array[border]] = [array[border], array[end]];
      animations.push(updateStep(start, border, end, border));

      quickSort(start, border - 1);
      quickSort(border + 1, end);
    }
  };
  quickSort(0, array.length - 1);
  animations.push(updateStep(0, array.length - 1, 0, 0, true));
  return animations;
};
export default meta;
