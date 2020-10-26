import { Cell } from "./Cell";
import { copyGrid } from "@/domain/Benchmarks";

type CellGrid = Cell[][];

class GameOfLife {
  private grid: CellGrid;
  private height: number;
  private width: number;

  constructor() {
    this.height = 0;
    this.width = 0;
    this.grid = [];
  }

  init(
    height: number,
    width: number,
    cellGeneration: () => Cell = () => Cell.DEAD
  ) {
    this.height = height;
    this.width = width;
    const newGrid: CellGrid = [];
    for (let column = 0; column < width; column++) {
      newGrid[column] = [];
      for (let row = 0; row < height; row++) {
        newGrid[column][row] = cellGeneration();
      }
    }

    this.grid = newGrid;
  }

  nextGeneration() {
    const start = Date.now();

    // Works 10 time faster when copying the grid
    const currentGrid = copyGrid(this.grid, this.width);

    const { width, height } = this.getDimensions();
    let aliveNeighbors: number;
    let column: number;
    let row: number;
    let currentCell: Cell;
    const newGrid: CellGrid = [];

    for (column = 0; column < this.width; column++) {
      newGrid[column] = [];
      for (row = 0; row < this.height; row++) {
        aliveNeighbors = this.getAliveNeighbors(
          column,
          row,
          currentGrid,
          width,
          height
        );
        currentCell = currentGrid[column][row];

        if (currentCell === Cell.DEAD) {
          if (aliveNeighbors === 3) {
            newGrid[column][row] = Cell.ALIVE;
          } else {
            newGrid[column][row] = Cell.DEAD;
          }
        } else {
          if (aliveNeighbors === 2 || aliveNeighbors === 3) {
            newGrid[column][row] = Cell.ALIVE;
          } else {
            newGrid[column][row] = Cell.DEAD;
          }
        }
      }
    }
    const end = Date.now();
    console.log("Next gen : ", end - start);
    this.grid = newGrid;
  }

  getDimensions(): { width: number; height: number } {
    return { width: this.width, height: this.height };
  }

  setGrid(grid: CellGrid, width: number, height: number) {
    this.height = height;
    this.width = width;
    this.grid = grid;
  }

  getAliveNeighbors(
    column: number,
    row: number,
    currentGrid: CellGrid,
    width: number,
    height: number
  ): number {
    let aliveNeighbors = 0;
    [
      { column: column - 1, row: row - 1 },
      { column: column, row: row - 1 },
      { column: column + 1, row: row - 1 },
      { column: column - 1, row: row },
      { column: column + 1, row: row },
      { column: column - 1, row: row + 1 },
      { column: column, row: row + 1 },
      { column: column + 1, row: row + 1 }
    ].forEach(neighbor => {
      if (
        !(
          neighbor.column < 0 ||
          neighbor.row < 0 ||
          neighbor.column >= width ||
          neighbor.row >= height
        )
      ) {
        aliveNeighbors += currentGrid[neighbor.column][neighbor.row];
        if (aliveNeighbors > 3) {
          return aliveNeighbors;
        }
      }
    });

    return aliveNeighbors;
  }

  setCell(column: number, row: number, cell: Cell) {
    this.grid[column][row] = cell;
  }

  getCell(column: number, row: number): Cell {
    return this.grid[column][row];
  }

  getGrid(): CellGrid {
    return this.grid;
  }
}

export { GameOfLife, CellGrid };
