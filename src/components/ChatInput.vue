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
  <form class="sticky-bottom w-100 bg-light border-top py-3" @submit.prevent="onSend">
    <div class="input-group">
      <input
        v-model="input"
        type="text"
        class="form-control"
        placeholder="Escribe tu mensaje..."
        autocomplete="off"
      />
      <button type="submit" class="btn btn-success" :disabled="!input.trim()">
        <i class="bi bi-send"></i>
      </button>
    </div>
  </form>
</template>
