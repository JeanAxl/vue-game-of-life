<template>
  <div class="cell" :style="styleObject" :class="classObject"></div>
</template>

<script>
import { CELL_SIZE } from "../constants";
import { Cell } from "@/domain/Cell.ts";
export default {
  name: "Cell",
  props: ["cell"],
  unmounted() {
    console.log("UNMOUNTER");
  },
  computed: {
    classObject() {
      return {
        alive: this.cell.content === Cell.ALIVE
      };
    },
    styleObject() {
      return {
        height: `${CELL_SIZE}px`,
        width: `${CELL_SIZE}px`
      };
    }
  }
};
</script>

<style scoped>
.cell {
  background-color: white;
  border-radius: 1px;
}
.alive {
  background-color: black;
}
</style>
