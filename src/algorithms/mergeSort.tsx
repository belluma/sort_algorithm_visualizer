import step from "../interfaces/animationStep";

const meta = (array: number[]): step[] => {
  let sortCounter: number = 0;
  const animations: step[] = [
    { array: [...array], newArray: true, method: "merge" },
  ];
  const mergeSort = (array: number[]): number[] => {
    if (array.length <= 1) {
      sortCounter += array.length;
      return array;
    }
    const middle: number = Math.floor(array.length / 2);
    const left: number[] = array.slice(0, middle);
    const right: number[] = array.slice(middle);

    const merge = (left: number[], right: number[]) => {
      const result: number[] = [];
      let indexLeft = 0,
        indexRight = 0;
      const updateStep = (
        newArray = false,
        iLeft = sortCounter - array.length + result.length,
        iRight = sortCounter - array.length + left.length + indexRight
      ): step => {
        const a = animations[animations.length - 1].array;
        return {
          array: [
            ...a.slice(0, sortCounter - array.length),
            ...result,
            ...left.slice(indexLeft),
            ...right.slice(indexRight),
            ...a.slice(sortCounter),
          ],
          method: "merge",
          newArray: newArray,
          start: sortCounter - array.length,
          end: sortCounter - 1,
          indexLeft: iLeft,
          indexRight: iRight,
          aux: [...left, "x", ...right, "x", ...result],
        };
      };
      animations.push(updateStep(true));

      while (indexLeft < left.length && indexRight < right.length) {
        animations.push(updateStep());
        if (left[indexLeft] < right[indexRight]) {
          result.push(left[indexLeft]);

          indexLeft++;
        } else {
          result.push(right[indexRight]);
          indexRight++;
          const a = animations[animations.length - 1];
          if (a.indexLeft !== undefined)
            animations.push(updateStep(false, a.indexLeft + 1, a.indexLeft));
        }
      }
      return [...result, ...left.slice(indexLeft), ...right.slice(indexRight)];
    };
    return merge(mergeSort(left), mergeSort(right));
  };
  mergeSort(array);
  return animations;
};
export default meta;
