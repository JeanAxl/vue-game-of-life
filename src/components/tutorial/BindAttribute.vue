<template>
  <div id="bind-attribute">
    <span v-bind:title="message">
      Hover your mouse over me for a few seconds to see my dynamically bound
      title!
    </span>
  </div>
</template>

<script>
import { Options, Vue } from "vue-class-component";

@Options({
  data() {
    return {
      message: "You loaded this page on " + new Date().toLocaleString()
    };
  }
})
export default class BindAttribute extends Vue {}
</script>

<style scoped></style>
