import step from "../interfaces/animationStep";

export default meta;

function meta(array: number[]): step[] {
  const animation: step[] = [];
  for (let i = 1; i < array.length; i++) sort(i);
  return animation;

  function sort(index: number): void {
    const n = [...array].slice(index, index + 1)[0];
    for (let i = index - 1; i >= 0; i--) {
      if (array[i] <= n) {
        animation.push({
          array: [...array],
          method: "insert",
          indexRight: i + 1,
          indexLeft: i,
        });
        break;
      } else {
        animation.push({
          array: [...array],
          method: "insert",
          indexLeft: i + 1,
          indexRight: i,
        });
        insert(i + 1, i);
        animation.push({
          array: [...array],
          method: "insert",
          indexLeft: i,
          indexRight: i + 1,
        });
      }
    }
  }

  function insert(fromIndex: number, toIndex: number): void {
    array.splice(toIndex, 0, array.splice(fromIndex, 1)[0]);
  }
}
