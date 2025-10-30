<!-- 
 Path:  src/components/ChatMessages.vue 
 -->
 
<script setup lang="ts">
import { defineProps } from 'vue'

type Message = {
  role: 'user' | 'assistant',
  text: string
}

defineProps<{ messages: Message[] }>();
</script>

<template>
  <div class="chat-messages">
    <div
      v-for="(msg, i) in messages"
      :key="i"
      :class="['message-row', msg.role]"
    >
      <div v-if="msg.role === 'assistant'" class="avatar">
        <i class="bi bi-robot"></i>
      </div>
      <div :class="['message-bubble', msg.role]">
        {{ msg.text }}
      </div>
      <div v-if="msg.role === 'user'" class="avatar">
        <i class="bi bi-person-circle"></i>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chat-messages {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px 0;
  overflow-y: auto;
  height: 100%;
  font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
}

.message-row {
  display: flex;
  align-items: flex-end;
}

.message-row.assistant {
  justify-content: flex-start;
}

.message-row.user {
  justify-content: flex-end;
}

.avatar {
  font-size: 2rem;
  margin: 0 12px;
  color: #6c757d;
}

.message-bubble {
  max-width: 70%;
  padding: 16px 20px;
  border-radius: 1.2em;
  font-size: 1.08rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  animation: fadeIn 0.4s;
}

.message-bubble.assistant {
  background: #fff;
  border: 1px solid #e5e5e5;
  color: #222;
}

.message-bubble.user {
  background: #19c37d;
  color: #fff;
  border: none;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px);}
  to { opacity: 1; transform: translateY(0);}
}
</style>
