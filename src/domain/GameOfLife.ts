import { Cell } from "@/domain/Cell";

type CellGrid = Map<string, Cell>;

class GameOfLife {
  private grid: CellGrid;
  public height: number;
  public width: number;

  constructor() {
    this.height = 0;
    this.width = 0;
    this.grid = new Map();
  }

  init(
    width: number,
    height: number,
    generateCell: () => Cell = () => Cell.DEAD
  ): void {
    this.width = width;
    this.height = height;
    const grid = new Map();
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        grid.set(x + ":" + y, generateCell());
      }
    }

    this.grid = grid;
  }

  getDimensions(): { width: number; height: number } {
    return { width: this.width, height: this.height };
  }

  getGridSize(): number {
    return this.grid.size;
  }

  getGrid(): CellGrid {
    return this.grid;
  }

  setCell(x: number, y: number, cell: Cell): void {
    this.grid.set(x + ":" + y, cell);
  }

  getCell(x: number, y: number): Cell | undefined {
    return this.grid.get(x + ":" + y);
  }

  isAlive(x: number, y: number): boolean {
    const cell = this.getCell(x, y);
    return cell !== undefined && cell === Cell.ALIVE;
  }

  getAliveNeighbors(x: number, y: number): number {
    return [
      { x: x - 1, y: y - 1 },
      { x: x, y: y - 1 },
      { x: x + 1, y: y - 1 },
      { x: x - 1, y: y },
      { x: x + 1, y: y },
      { x: x - 1, y: y + 1 },
      { x: x, y: y + 1 },
      { x: x + 1, y: y + 1 }
    ].reduce((acc, current) => {
      if (this.isAlive(current.x, current.y)) {
        acc++;
      }
      return acc;
    }, 0);
  }

  nextGeneration(): void {
    const newCellGrid = new Map();
    let aliveNeighbors = 0;
    let currentCell;

    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        aliveNeighbors = this.getAliveNeighbors(x, y);
        currentCell = this.getCell(x, y);
        if (currentCell === Cell.DEAD) {
          if (aliveNeighbors === 3) {
            newCellGrid.set(x + ":" + y, Cell.ALIVE);
          } else {
            newCellGrid.set(x + ":" + y, Cell.DEAD);
          }
        }
        if (currentCell === Cell.ALIVE) {
          if (aliveNeighbors > 1 && aliveNeighbors < 4) {
            newCellGrid.set(x + ":" + y, Cell.ALIVE);
          } else {
            newCellGrid.set(x + ":" + y, Cell.DEAD);
          }
        }
      }
    }
    this.grid = newCellGrid;
  }
}
type ArrayGrid = Cell[][];
class GameOfLifeArray {
  private grid: ArrayGrid;

  constructor() {
    this.grid = [[]];
  }

  init(height: number, width: number) {
    const newGrid: ArrayGrid = [];
    for (let row = 0; row < height; row++) {
      newGrid[row] = [];
      for (let column = 0; column < width; column++) {
        newGrid[row][column] = Cell.DEAD;
      }
    }

    this.grid = newGrid;
  }

  getGrid(): ArrayGrid {
    return this.grid;
  }
}

export { GameOfLife, GameOfLifeArray, CellGrid };
