const quickSort = (
  array: number[],
  helperArray: number[] = [],
  lesser = true
): any => {
  if (!array.length) return array;

  const random: number = Math.floor(Math.random() * array.length);
  const pivot: number = array.splice(random, 1)[0];
  const less: number[] = [];
  const greater: number[] = [];
  let arr: number[] = [];
  console.log(
    pivot,
    array,
    helperArray,
    lesser,
    array.length + helperArray.length + 1
  );
  while (array.length) {
    const n = array.splice(0, 1)[0];
    n < pivot ? less.push(n) : greater.push(n);
    arr = lesser
      ? less.concat(pivot, array, greater, helperArray)
      : helperArray.concat(less, pivot, array, greater);
    console.log(arr);
  }
  const helper1 = [pivot].concat(greater, helperArray);
  const helper2 = less.concat(pivot, helperArray);

  return quickSort(less, helper1, true)
    .concat(pivot)
    .concat(quickSort(greater, helper2, false));
};

export default quickSort;
