export const swapPos = (array: unknown[], sourceIdx: number, targetIdx: number) => {
  [array[sourceIdx], array[targetIdx]] = [array[targetIdx], array[sourceIdx]];
};
