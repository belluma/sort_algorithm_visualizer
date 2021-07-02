import step from "../interfaces/animationStep";

export default heapSort;

function heapSort(array: number[]): step[] {
  let sorted: number[] = [];
  const animation: step[] = [updateStep()];

  function updateStep(parent: number = -1, child: number = -1): step {
    return {
      array: [...array, ...sorted],
      method: "heap",
      end: array.length,
      index: parent,
      start: child,
    };
  }
  function heapify() {
    const getParentIndex = (childIndex: number) =>
      Math.floor((childIndex - 1) / 2);
    function swapWithParent(childIndex: number) {
      const parentIndex = getParentIndex(childIndex);
      if (childIndex == 0 || array[parentIndex] >= array[childIndex]) return;
      [array[parentIndex], array[childIndex]] = [
        array[childIndex],
        array[parentIndex],
      ];
      animation.push(updateStep(parentIndex, childIndex));
      swapWithParent(parentIndex);
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
