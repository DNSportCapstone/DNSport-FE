<template>
  <div class="comment-section">
    <textarea
      v-model="newComment"
      placeholder="Write a comment..."
      @input="updateComment"
    />
    <ul>
      <li v-for="comment in comments" :key="comment.id">
        <strong>{{ comment.user }}</strong
        >: {{ comment.text }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    comments: Array,
  },
  data() {
    return {
      newComment: "",
    };
  },
  methods: {
    updateComment() {
      this.$emit("update-comment", this.newComment);
    },
  },
};
</script>

<style scoped>
.comment-section {
  max-width: 600px;
  margin-top: 20px;
}

textarea {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}
</style>
