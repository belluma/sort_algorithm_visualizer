const meta = (array: number[]) => {
  let sortCounter: number = 0;
  const animations = [{ array: [...array] }];
  const mergeSort = (array: number[]): number[] => {
    if (array.length <= 1) {
      sortCounter += array.length;
      return array;
    }
    const middle: number = Math.floor(array.length / 2);
    const left: number[] = array.slice(0, middle);
    const right: number[] = array.slice(middle);

    const merge = (left: number[], right: number[]) => {
      const result = [];
      let indexLeft = 0,
        indexRight = 0;

      while (indexLeft < left.length && indexRight < right.length) {
        if (left[indexLeft] < right[indexRight]) {
          result.push(left[indexLeft]);
          indexLeft++;
        } else {
          result.push(right[indexRight]);
          indexRight++;
        }
        const a = animations[animations.length - 1].array;
        animations.push({
          array: [
            ...a.slice(0, sortCounter - array.length),
            ...result,
            ...left.slice(indexLeft),
            ...right.slice(indexRight),
            ...a.slice(sortCounter),
          ],
        });
      }
      return [...result, ...left.slice(indexLeft), ...right.slice(indexRight)];
    };
    return merge(mergeSort(left), mergeSort(right));
  };
  mergeSort(array);

  return animations;
};
export default meta;
