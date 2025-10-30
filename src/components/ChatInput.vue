<!-- 
Path: src/components/ChatInput.vue
-->

<script setup lang="ts">
import { ref, defineEmits } from 'vue'

const input = ref('')
const emit = defineEmits(['send'])

function onSend() {
  if (!input.value.trim()) return
  emit('send', input.value)
  input.value = ''
}
</script>

<template>
  <form class="chat-input-bar" @submit.prevent="onSend">
    <input
      v-model="input"
      type="text"
      class="chat-input"
      placeholder="Escribe tu mensaje..."
      autocomplete="off"
    />
    <button type="submit" class="send-btn" :disabled="!input.trim()">
      <i class="bi bi-send"></i>
    </button>
  </form>
</template>

<style scoped>
.chat-input-bar {
  position: sticky;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  background: #f7f7f8;
  border-top: 1px solid #ececf1;
  padding: 16px 0 16px 0;
  box-shadow: 0 -2px 8px rgba(0,0,0,0.04);
  z-index: 10;
}

.chat-input {
  flex: 1;
  font-size: 1.15rem;
  padding: 14px 20px;
  border: none;
  border-radius: 1.5em;
  background: #ececf1;
  margin-right: 12px;
  outline: none;
  box-shadow: none;
}

.send-btn {
  background: #19c37d;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  transition: background 0.2s;
}

.send-btn:disabled {
  background: #c5c5d2;
  cursor: not-allowed;
  color: #fff;
}
</style>
