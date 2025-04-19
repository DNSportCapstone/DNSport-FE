<template>
  <div>
    <!-- Icon bật chat -->
    <div class="chat-icon" @click="toggleChat">
      <font-awesome-icon :icon="['far', 'message']" />
    </div>

    <!-- Chat box -->
    <div v-if="showChat" class="chat-box">
      <div class="chat-header">
        <span><font-awesome-icon :icon="['fas', 'robot']" /> AI Chat</span>
        <button class="lang-switch" @click="toggleLanguage">
          {{ language === "vi" ? "🇻🇳 VI" : "🇺🇸 EN"}}
        </button>
      </div>

      <div class="chat-messages" ref="messageContainer">
        <div
          v-for="(msg, index) in messages"
          :key="index"
          :class="['chat-message', msg.role]"
        >
          <font-awesome-icon
            v-show="msg.role === 'user'"
            :icon="['far', 'user']"
          />
          {{ msg.content }}
        </div>
      </div>

      <div class="chat-input">
        <input
          v-model="question"
          @keyup.enter="askAi"
          placeholder="Nhập câu hỏi..."
        />
        <button @click="askAi">Gửi</button>
      </div>
    </div>
  </div>
</template>

<script>
import API from "@/utils/axios";

export default {
  data() {
    return {
      showChat: false,
      question: "",
      language: "vi",
      messages: [],
    };
  },
  methods: {
    toggleChat() {
      this.showChat = !this.showChat;
      this.$nextTick(() => this.scrollToBottom());
    },
    toggleLanguage() {
      this.language = this.language === "vi" ? "en" : "vi";
    },
    async askAi() {
      if (!this.question.trim()) return;

      const userMessage = { role: "user", content: this.question };
      this.messages.push(userMessage);

      const prefix =
        this.language === "en"
          ? "Answer in English: "
          : "Trả lời bằng tiếng Việt: ";

      try {
        const res = await API.post("/ai/ask", prefix + this.question, {
          headers: { "Content-Type": "application/json" },
        });
        const botMessage = {
          role: "assistant",
          content: res.data.choices[0].message.content,
        };
        this.messages.push(botMessage);
      } catch (err) {
        this.messages.push({
          role: "assistant",
          content: "AI hiện tại không phản hồi.",
        });
      }

      this.question = "";
      this.$nextTick(() => this.scrollToBottom());
    },
    scrollToBottom() {
      const container = this.$refs.messageContainer;
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    },
  },
};
</script>

<style scoped>
.chat-icon {
  position: fixed;
  bottom: 20px;
  left: 20px;
  background: #006400;
  color: white;
  padding: 12px 15px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 20px;
  z-index: 1000;
}

.chat-box {
  position: fixed;
  bottom: 80px;
  left: 20px;
  width: 300px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  max-height: 500px;
}

.chat-header {
  background: #006400;
  color: white;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.lang-switch {
  background: transparent;
  border: none;
  color: white;
  font-size: 14px;
  cursor: pointer;
}

.chat-messages {
  padding: 10px;
  overflow-y: auto;
  flex-grow: 1;
  max-height: 300px;
}

.chat-message {
  margin-bottom: 8px;
}

.chat-message.user {
  text-align: right;
  color: #333;
}

.chat-message.assistant {
  text-align: left;
  color: #007bff;
}

.chat-input {
  display: flex;
  padding: 10px;
  border-top: 1px solid #eee;
}

.chat-input input {
  flex: 1;
  padding: 6px 8px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.chat-input button {
  margin-left: 8px;
  background: #006400;
  border: none;
  color: white;
  padding: 6px 12px;
  border-radius: 6px;
}
</style>
