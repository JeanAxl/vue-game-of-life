<template>
  <div id="event-handling">
    <button @click="handleClick">Don't click</button>
    <p>The above button has been clicked {{ counter }} times</p>
  </div>
</template>

<script>
export default {
  name: "EventHandling",
  data() {
    return { counter: 0 };
  },
  methods: {
    handleClick() {
      this.counter++;
    }
  }
};
</script>

<style scoped></style>
