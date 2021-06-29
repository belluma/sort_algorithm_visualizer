const meta = (array: any[]) => {
  const animations: any[][] = [];

  const quickSort = (start: number, end: number) => {
    if (end - start > 0) {
      const pivot: number = array[end];
      let border: number = start;
      animations.push([...array]);
      for (let i = start; i < end; i++) {
        if (array[i] < pivot) {
          [array[i], array[border]] = [array[border], array[i]];
          border++;
        }
        animations.push([...array]);
      }
      [array[end], array[border]] = [array[border], array[end]];
      quickSort(start, border - 1);
      quickSort(border + 1, end);
    }
  };
  quickSort(0, array.length - 1);
  return animations;
};
export default meta;
