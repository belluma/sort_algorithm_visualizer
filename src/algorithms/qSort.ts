import step from "../interfaces/animationStep";

const meta = (array: number[]) => {
  const animations: step[] = [];

  const quickSort = (start: number, end: number) => {
    // const step:step = {
    //   array:[...array], notYet:[],lesser:[],greater:[],pivot:array[array.length-1]
    // }
    const updateStep = (
      step: step,
      start: number,
      end: number,
      index: number,
      border: number
    ) => {
      return {
        ...step,
        start: start,
        end: end,
        index: index,
        border: border,
      };
    };
    if (end - start > 0) {
      const pivot: number = array[end];
      let border: number = start;

      const step: step = {
        array: [...array],
        start: start,
        end: end,
        index: start,
        border: start,
      };
      animations.push(step);
      for (let i = start; i < end; i++) {
        if (array[i] < pivot) {
          [array[i], array[border]] = [array[border], array[i]];
          border++;
        }
        animations.push(updateStep(step, start, end, i, border));
      }
      [array[end], array[border]] = [array[border], array[end]];
      animations.push({ ...step, array: [...array] });

      quickSort(start, border - 1);
      quickSort(border + 1, end);
    }
  };
  quickSort(0, array.length - 1);
  return animations;
};
export default meta;
