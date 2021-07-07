import step from "../interfaces/animationStep";

export default meta;

function meta(array: number[]): step[] {
  const animation: step[] = [
    {
      array: [...array],
      method: "bubble",
      newArray: true,
      start: 0,
      end: array.length,
    },
  ];
  let swap = false;
  sort();
  return animation;

  function sort() {
    for (let i = 1; i < array.length; i++) {
      compare(i);
    }
    if (!swap) return animation;
    else {
      swap = false;
      sort();
    }
  }

  function compare(index: number): void {
    animation.push({
      array: [...array],
      method: "bubble",
      newArray: false,
      indexLeft: index - 1,
      indexRight: index,
    });
    if (array[index] < array[index - 1]) {
      [array[index], array[index - 1]] = [array[index - 1], array[index]];
      animation.push({
        array: [...array],
        method: "bubble",
        newArray: false,
        indexLeft: index,
        indexRight: index - 1,
      });
      swap = true;
    }
  }
}
