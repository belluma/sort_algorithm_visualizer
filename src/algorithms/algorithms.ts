import quickSort from "./qSort";
import mergeSort from "./mergeSort";
import heapSort from "./heapsort";
import bubbleSort from "./bubbleSort";
import insertionSort from "./insertionSort";

const algorithms = [
    { name: "quicksort", selected: true, getAnimation: quickSort },
    {
        name: "mergesort",
        selected: false,
        getAnimation: mergeSort,
    },
    { name: "heapsort", selected: false, getAnimation: heapSort },
    { name: "bubblesort", selected: false, getAnimation: bubbleSort },
    { name: "insertionsort", selected: false, getAnimation: insertionSort },
]

export default algorithms;
