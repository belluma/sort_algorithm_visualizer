# A tool to visualize the methodical difference of several common sorting algorithms

## Preparation

- clone the repository
- go in the project root and run yarn install
- from the project root run yarn start to start the app on 'localhost:3000'

## Usage

There are two sliders to change the length of the array to be sorted and the speed of the animation as well as one
dropdown to select the algorithm to use for sorting the array on the left-hand side of the screen On the right-hand side
of the screen you will see the array visualized as a collection of beams. The height of the beams represents the value
of the entries.

### Choose the length of the array you want to see being sorted

With the topmost slider you can determine the length of the array to be sorted. When changing the values on the slider
you will see how the visualization of the array changes.

### Choose the animation speed

The second slider gives you the possibility to change the speed in which the animation is shown. Depending on the sort
algorithm you choose the amount of steps needed to sort an array may differ significantly. The length of the array
obviously has effect on the duration of the sort as well. Hence, this setting. You may change the speed while the
animation is running.

### Choose the sorting algorithm

Pretty self-explanatory, choose the sorting algorithm you want to see visualized. When changing this value, the
animation will jump back to the beginning but not generate a new array. This gives you the possibility to compare the
efficiency of different algorithms on the same array.

### Playback options

Beneath the visualization of the array you will find playback buttons. There's one button to play/pause the animation,
two buttons to go the next/previous step and one button to rewind the animation to the beginning.
