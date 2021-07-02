import step from "../interfaces/animationStep";

export default heapSort;

function heapSort(array: number[]): step[] {
  let sorted: number[] = [];
  const animation: step[] = [updateStep()];

  function updateStep(): step {
    return {
      array: [...array, ...sorted],
      method: "heap",
      index: array.length,
    };
  }
  function heapify() {
    const getParentIndex = (childIndex: number) =>
      Math.floor((childIndex - 1) / 2);
    function swapWithParent(childIndex: number) {
      if (
        childIndex == 0 ||
        array[getParentIndex(childIndex)] >= array[childIndex]
      )
        return;
      [array[getParentIndex(childIndex)], array[childIndex]] = [
        array[childIndex],
        array[getParentIndex(childIndex)],
      ];
      animation.push(updateStep());
      swapWithParent(getParentIndex(childIndex));
    }
    for (let i in array) swapWithParent(parseInt(i));
  }

  while (array.length) {
    heapify();
    const x = array.shift();
    if (x) sorted.unshift(x);
    animation.push(updateStep());
  }
  return animation;
}
