<template>
  <h3>Dimension {{ config.cellsByColumn }} by {{ config.cellsByRow }} grid.</h3>
  <Grid
    :grid="grid"
    :cellsByRow="config.cellsByRow"
    :cellsByColumn="config.cellsByColumn"
    :gridDimensions="gridDimensions"
  />
  <Configuration
    :config="config"
    @update:config="onConfigUpdate($event)"
    @play="play"
    @stop="stop"
  />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

import { CellGrid, GameOfLife } from "@/domain/GameOfLife";
import { Cell } from "@/domain/Cell";

import Grid from "./components/Grid.vue";
import Configuration from "./components/Configuration.vue";
import EventHandling from "./components/tutorial/EventHandling.vue";

type ConfigType = {
  cellsByRow: number;
  cellsByColumn: number;
};

function formatGrid(grid: CellGrid): { id: string; content: Cell }[] {
  const a: [string, Cell][] = Array.from(grid.entries());
  return a.map((value: [string, Cell]) => ({
    id: value[0],
    content: value[1]
  }));
}

const randomCellGenerator = (n: number): (() => Cell) => () =>
  Math.round(Math.random() * (n - 1) + 1) === 1 ? Cell.ALIVE : Cell.DEAD;

@Options({
  components: {
    Grid,
    EventHandling,
    Configuration
  },
  data() {
    return {
      config: {
        cellsByRow: 100,
        cellsByColumn: 100
      },
      gol: new GameOfLife(),
      running: false
    };
  },
  methods: {
    stop() {
      this.running = false;
      if (!this.running) {
        this.running = false;
        this.initGrid();
      }
    },
    play() {
      this.running = true;
    },
    onConfigUpdate(event: ConfigType) {
      if (!this.running) {
        this.config = event;
        this.initGrid();
      }
    },
    initGrid() {
      this.gol.init(
        this.config.cellsByRow,
        this.config.cellsByColumn,
        randomCellGenerator(4)
      );
    }
  },
  computed: {
    grid() {
      const grid: CellGrid = this.gol.getGrid();
      return formatGrid(grid);
    },
    gridDimensions() {
      return this.gol.getDimensions();
    }
  },
  mounted() {
    this.gol.init(
      this.config.cellsByRow,
      this.config.cellsByColumn,
      randomCellGenerator(4)
    );

    this.gol.setCell(4, 4, Cell.ALIVE);
    this.gol.setCell(4, 6, Cell.ALIVE);
    this.gol.setCell(4, 5, Cell.ALIVE);

    setInterval(() => {
      if (this.running) {
        this.gol.nextGeneration();
      }
    }, 200);
  }
})
export default class App extends Vue {}
</script>

<style>
#configuration {
  margin-left: 5%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
