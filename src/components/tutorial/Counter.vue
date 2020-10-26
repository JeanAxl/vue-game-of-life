<template>
  <div id="counter">Counter: {{ counter }} / {{ stars }}</div>
  <UserInput />
</template>

<script>
import { Options, Vue } from "vue-class-component";
import UserInput from "./UserInput.vue";

@Options({
  components: {
    UserInput
  },
  data() {
    return {
      stars: 0
    };
  },
  props: {
    counter: Number
  }
})
export default class Counter extends Vue {}
</script>

<style scoped></style>
