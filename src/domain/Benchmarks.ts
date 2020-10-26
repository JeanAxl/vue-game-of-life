import { CellGrid, GameOfLife } from "./GameOfLife";
import { Cell } from "./Cell";

export const copyGrid = (grid: CellGrid, width: number) => {
  const newGrid = [];
  for (let column = 0; column < width; column++) {
    newGrid[column] = [...grid[column]];
  }
  return newGrid;
};

const randomCellGenerator = (n: number): (() => Cell) => () =>
  Math.round(Math.random() * (n - 1) + 1) === 1 ? Cell.ALIVE : Cell.DEAD;

export const run = (golFromVue: GameOfLife) => {
  const gol = new GameOfLife();
  const start = Date.now();
  const { width, height } = golFromVue.getDimensions();
  const ng = copyGrid(golFromVue.getGrid(), width);
  gol.setGrid(golFromVue.getGrid(), width, height);

  gol.nextGeneration();

  const end = Date.now();
  console.log("New : ", end - start);

  return gol;
};
