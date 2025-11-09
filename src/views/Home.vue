<!-- 
Path: src/views/Home.vue 
-->

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useChatStore } from '../interface_adapters/presenters/chat'
import ChatMessages from '../components/ChatMessages.vue'
import ChatInput from '../components/ChatInput.vue'

const chat = useChatStore()
const { messages, status, errorMessage } = storeToRefs(chat)

const isSending = computed(() => status.value === 'loading')

const statusMessage = computed(() => {
  if (status.value === 'loading') return 'Enviando mensaje...'
  if (status.value === 'error') return errorMessage.value ?? 'No se pudo enviar el mensaje.'
  if (status.value === 'success') return 'Mensaje enviado correctamente.'
  return ''
})

function sendMessage(text: string) {
  chat.sendMessage(text)
}
</script>

<template>
  <div class="d-flex flex-column h-100">
    <div class="flex-fill overflow-auto px-0 px-md-5">
      <ChatMessages :messages="messages" />
    </div>
    <div class="px-3 px-md-5 pb-3 mt-auto">
      <transition name="fade" mode="out-in">
        <div v-if="statusMessage" :key="status" class="small mb-2" :class="status === 'error' ? 'text-danger' : status === 'loading' ? 'text-info' : 'text-success'">
          <span v-if="status === 'loading'" class="spinner-border spinner-border-sm align-middle me-2" role="status" aria-hidden="true"></span>
          {{ statusMessage }}
        </div>
      </transition>
      <ChatInput :status="status" :error-message="errorMessage" :sending="isSending" @send="sendMessage" />
    </div>
  </div>
</template>