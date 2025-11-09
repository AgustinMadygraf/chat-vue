<!-- 
Path: src/components/ChatInput.vue
-->

<script setup lang="ts">
import { ref, defineEmits, defineProps, computed, watch } from 'vue'

type ChatStatus = 'idle' | 'loading' | 'success' | 'error'

const props = defineProps<{ status: ChatStatus; errorMessage: string | null; sending: boolean }>()

const input = ref('')
const emit = defineEmits(['send'])

const canSubmit = computed(() => Boolean(input.value.trim()) && !props.sending)

function onSend() {
  if (!canSubmit.value) return
  emit('send', input.value)
  input.value = ''
}

watch(
  () => props.status,
  (next) => {
    if (next === 'success') {
      input.value = ''
    }
  },
)
</script>

<template>
  <form class="w-100 bg-light border rounded-4 p-3 shadow-sm" @submit.prevent="onSend">
    <div class="input-group">
      <input
        v-model="input"
        type="text"
        class="form-control"
        placeholder="Escribe tu mensaje..."
        autocomplete="off"
        :disabled="sending"
        aria-describedby="chat-input-status"
      />
      <button type="submit" class="btn btn-success" :disabled="!canSubmit">
        <span v-if="sending" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        <i v-else class="bi bi-send"></i>
        </button>
    </div>
    <p
      v-if="status === 'error' && errorMessage"
      id="chat-input-status"
      class="text-danger small mt-2 mb-0"
      role="alert"
    >
      {{ errorMessage }}
    </p>
    <p
      v-else-if="status === 'loading'"
      id="chat-input-status"
      class="text-info small mt-2 mb-0"
    >
      Enviando...
    </p>
  </form>
</template>
