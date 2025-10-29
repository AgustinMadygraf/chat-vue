<!-- 
Path: src/views/Home.vue 
-->

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useChatStore } from '../stores/chat'
import ChatMessages from '../components/ChatMessages.vue'
import ChatInput from '../components/ChatInput.vue'

const chat = useChatStore()
const { messages } = storeToRefs(chat)

function sendMessage(text: string) {
  chat.sendMessage(text)
}

console.log('Home.vue montado', messages.value)
</script>

<template>
  <div class="d-flex flex-column h-100">
    <div class="flex-fill overflow-auto px-0 px-md-5">
      <ChatMessages :messages="messages" />
    </div>
    <ChatInput @send="sendMessage" />
  </div>
</template>