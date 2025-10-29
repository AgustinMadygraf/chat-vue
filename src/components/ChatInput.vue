<!-- ChatInput.vue: Input y envío de mensajes -->
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
  <form class="d-flex align-items-center bg-white border-top px-3 py-3" @submit.prevent="onSend">
    <input
      v-model="input"
      type="text"
      class="form-control me-2 rounded-pill"
      placeholder="Escribe tu mensaje..."
      style="height: 48px;"
      autocomplete="off"
    />
    <button type="submit" class="btn btn-primary rounded-pill px-4">
      <i class="bi bi-send"></i>
    </button>
  </form>
</template>
