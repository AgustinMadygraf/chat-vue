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
    <div
      class="d-flex align-items-center gap-2 rounded-pill border shadow-sm px-3 py-2 w-100"
      style="background: var(--bg-placeholder); border-color: var(--text-muted);"
    >
      <input
        v-model="input"
        type="text"
        class="form-control bg-transparent border-0 px-0 flex-grow-1 chat-input-placeholder"
        style="color: var(--text-primary); box-shadow: none;"
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
        style="background: var(--bg-send-btn); border-radius: 50%; width: 2.5rem; height: 2.5rem;"
      >
        <span v-if="sending" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        <i
          v-else
          class="bi bi-send"
          :style="{ color: 'var(--icon-send)' }"
        ></i>
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
.chat-input-placeholder::placeholder {
  color: var(--text-placeholder);
  opacity: 1;
}
.chat-input-bar button:hover i {
  opacity: 0.8;
  transform: translateY(-0.5px);
  transition: all 0.15s;
}
</style>
