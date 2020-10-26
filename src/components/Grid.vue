<template>
  <h2>Game of life</h2>
  <div id="grid" class="grid" :style="styleObject">
    <template v-for="a in grid" v-bind:key="a.id">
      <div class="cell" :class="{ alive: a.content === 0 }" />
    </template>
  </div>
</template>

<script>
import { CELL_SIZE } from "../constants";

export default {
  name: "Grid",
  props: ["cellsByRow", "cellsByColumn", "grid", "gridDimensions"],
  computed: {
    styleObject() {
      return {
        gridTemplateColumns: `repeat(${this.gridDimensions.height}, ${CELL_SIZE}px)`,
        gridTemplateRows: `repeat(${this.gridDimensions.width}, ${CELL_SIZE}px)`
      };
    }
  },
  watch: {
    grid() {
      console.log("Received new Grid : ", Date.now());
    }
  }
};
</script>

<style scoped>
.grid {
  display: grid;
  grid-gap: 1px;
}
.cell {
  background-color: white;
  border-radius: 1px;
}
.alive {
  background-color: black;
}
</style>
