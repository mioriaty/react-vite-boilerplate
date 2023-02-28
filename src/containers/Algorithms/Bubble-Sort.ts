import Algorithm from './types/algorithm';
import Complexities from './types/complexity';

// https://github.com/MartinDevillers/omicron/blob/master/src/algorithms/bubble-sort.ts
export default class BubbleSort extends Algorithm {
  name = 'Bubble Sort';
  timeComplexityBest = Complexities.linear;
  timeComplexityAverage = Complexities.quadratic;
  timeComplexityWorst = Complexities.quadratic;

  execute(array: number[]): void {
    const len = array.length;
    let swapped;

    do {
      this.incrementOpCounter();
      swapped = false;
      for (let index = 0; index < len; index++) {
        this.incrementOpCounter();
        if (array[index] > array[index + 1]) {
          const tmp = array[index];
          array[index] = array[index + 1];
          array[index + 1] = tmp;
          swapped = true;
        }
      }
    } while (swapped);
  }
}
