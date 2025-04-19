<template>
  <div>
    <input v-model="question" placeholder="Hỏi AI" />
    <button @click="askAi">Gửi</button>
    <p>{{ answer }}</p>
  </div>
</template>
<script>
import API from "@/utils/axios";

export default {
  name: "AISuggestion",
  data() {
    return {
      question: "",
      answer: "",
    };
  },
  methods: {
    async askAi() {
      try {
        const res = await API.post(
          "/ai/ask",
          "Answer in English: " + this.question,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        this.answer = res.data.choices[0].message.content;
      } catch (err) {
        console.error("AI Error:", err);
        return "AI hiện tại không phản hồi.";
      }
    },
  },
};
</script>
