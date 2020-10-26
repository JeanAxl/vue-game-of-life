<template>
  <div id="ComputedVSWatch">
    <p>
      Ask yourself why:
      <input v-model="question" />
    </p>
    <p>{{ answer }}</p>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ComputedVSWatch",
  data() {
    return {
      question: "",
      answer: "Go answer something Yo !"
    };
  },
  watch: {
    question(newQuestion, oldQuestion) {
      if (newQuestion.includes("?")) {
        this.getAnswer();
      }
    }
  },
  methods: {
    getAnswer() {
      this.answer = "Thinking...";
      axios
        .get("https://yesno.wtf/api")
        .then(response => {
          this.answer = response.data.answer;
        })
        .catch(error => {
          this.answer = "You dumb idiot : " + error;
        });
    }
  }
};
</script>

<style scoped></style>
