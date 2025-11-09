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
  <form class="chat-input-bar px-3 mb-3" @submit.prevent="onSend">
    <div class="d-flex align-items-center gap-2 rounded-pill border border-secondary shadow-sm px-3 py-2 bg-dark w-100">
      <input
        v-model="input"
        type="text"
        class="form-control bg-transparent border-0 text-light px-0 flex-grow-1 chat-input-placeholder"
        style="box-shadow: none;"
        placeholder="Preguntá lo que quieras"
        autocomplete="off"
        :disabled="sending"
        aria-describedby="chat-input-status"
      />
      <button
        type="submit"
        class="btn p-0 d-flex align-items-center justify-content-center"
        :disabled="!canSubmit"
        aria-label="Enviar mensaje"
      >
        <span v-if="sending" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        <i v-else class="bi bi-send text-light"></i>
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

<style scoped>
.chat-input-bar {
  position: static;
}
.chat-input-bar .form-control:focus {
  box-shadow: none;
}
.chat-input-bar .border-secondary {
  border-color: rgba(255, 255, 255, 0.15) !important;
}
.chat-input-placeholder::placeholder {
  color: #bfc4c9;
  opacity: 1;
}
.chat-input-bar button:hover i {
  opacity: 0.8;
  transform: translateY(-0.5px);
  transition: all 0.15s;
}
</style>
