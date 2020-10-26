<template>
  <div id="computed-basics">
    <div>
      <p>First: {{ first }}</p>
      <p>Last: {{ last }}</p>
    </div>
    <span>{{ fullName }}</span>
    <div>{{ now() }}</div>
    <input v-model="fullName" />
  </div>
</template>

<script>
export default {
  name: "ComputedBasics",
  data() {
    return {
      first: "Jean",
      last: "Mi"
    };
  },
  methods: {
    now() {
      return Date.now();
    }
  },
  computed: {
    fullName: {
      get() {
        return this.first + this.last;
      },
      set(fullName) {
        const split = fullName.split(" ");
        this.first = split[0];
        this.last = split[1] || "no last";
      }
    }
  }
};
</script>

<style scoped></style>
