<template>
  <div id="configuration">
    <div>Height : <custom-input v-model="height" /></div>
    <div>Width : <custom-input v-model="width" /></div>
    <button @click="handleClickPlay">start</button>
    <button>pause</button>
    <button @click="handleClickStop">stop</button>
    <button @click="this.$emit('next')">next</button>
  </div>
</template>

<script>
import CustomInput from "./CustomInput.vue";

export default {
  name: "Configuration",
  props: ["config"],
  components: {
    CustomInput
  },
  methods: {
    handleClickPlay() {
      this.$emit("play");
    },
    handleClickStop() {
      this.$emit("stop");
    }
  },
  computed: {
    width: {
      get() {
        return this.config.cellsByRow;
      },
      set(value) {
        this.$emit("update:config", { ...this.config, cellsByRow: value });
      }
    },
    height: {
      get() {
        return this.config.cellsByColumn;
      },
      set(value) {
        this.$emit("update:config", { ...this.config, cellsByColumn: value });
      }
    }
  }
};
</script>

<style scoped></style>
