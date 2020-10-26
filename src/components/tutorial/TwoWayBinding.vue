<template>
  <div id="two-way-binding" :title="toLower(message)">
    <p>
      {{ message }}
    </p>
    <input v-model="message" />
  </div>
</template>

<script>
export default {
  name: "TwoWayBinding",
  data() {
    return {
      message: "Hello JeanMi"
    };
  },
  methods: {
    toLower(str) {
      return str.toLowerCase();
    }
  }
};
</script>

<style scoped></style>
