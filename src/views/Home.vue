<!-- 
Path: src/views/Home.vue 
-->

<script setup lang="ts">
import { ref } from 'vue'
import ChatMessages from '../components/ChatMessages.vue'
import ChatInput from '../components/ChatInput.vue'

const messages = ref([
  { role: 'user' as const, text: 'Hola, ¿quién eres?' },
  { role: 'assistant' as const, text: '¡Hola! Soy un asistente virtual listo para ayudarte.' },
  { role: 'user' as const, text: '¿Puedes explicarme cómo funciona este chat?' },
  { role: 'assistant' as const, text: 'Por supuesto. Escribe tu pregunta y te responderé aquí mismo.' }
])

function sendMessage(text: string) {
  if (!text.trim()) return
  messages.value.push({ role: 'user' as const, text })
  // Aquí podrías agregar la lógica para la respuesta del asistente
}
</script>

<template>
  <div class="d-flex flex-column h-100">
    <div class="flex-fill overflow-auto px-0 px-md-5">
      <ChatMessages :messages="messages" />
    </div>
    <ChatInput @send="sendMessage" />
  </div>
</template>