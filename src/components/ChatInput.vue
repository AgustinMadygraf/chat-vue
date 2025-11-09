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
  <form class="chat-input-bar" @submit.prevent="onSend">
    <div class="chat-input-pill">
      <button type="button" class="chat-options-btn" aria-label="Más opciones">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="10" r="9" stroke="var(--accent)" stroke-width="2" fill="none" />
          <path d="M10 6v8M6 10h8" stroke="var(--accent)" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>
      <input
        v-model="input"
        type="text"
        class="chat-input"
        placeholder="Preguntá lo que quieras"
        autocomplete="off"
        :disabled="sending"
        aria-describedby="chat-input-status"
        @keydown.enter.exact.prevent="onSend"
      />
      <button
        type="submit"
        class="chat-send-btn"
        :disabled="!canSubmit"
        aria-label="Enviar mensaje"
      >
        <span v-if="sending" class="chat-spinner" aria-hidden="true">
          <!-- Spinner SVG estilo OpenAI -->
          <svg width="20" height="20" viewBox="0 0 20 20">
            <circle
              class="spinner-path"
              cx="10"
              cy="10"
              r="8"
              fill="none"
              stroke="currentColor"
              stroke-width="3"
              stroke-linecap="round"
              opacity="0.2"
            />
            <path
              class="spinner-arc"
              d="M18 10a8 8 0 1 1-8-8"
              fill="none"
              stroke="currentColor"
              stroke-width="3"
              stroke-linecap="round"
            />
          </svg>
        </span>
        <span v-else class="chat-send-icon" aria-hidden="true">
          <!-- Ícono enviar SVG estilo OpenAI -->
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M4 18L18 11L4 4V10L14 11L4 12V18Z" fill="var(--icon-send)" />
          </svg>
        </span>
      </button>
    </div>
    <p
      v-if="status === 'error' && errorMessage"
      id="chat-input-status"
      class="chat-input-error"
      role="alert"
    >
      {{ errorMessage }}
    </p>
    <p
      v-else-if="status === 'loading'"
      id="chat-input-status"
      class="chat-input-loading"
    >
      Enviando...
    </p>
  </form>
</template>

<style scoped>
.chat-input-bar {
  width: 100%;
  padding: 0 0 1.5rem 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.chat-input-pill {
  display: flex;
  align-items: center;
  background: var(--bg-placeholder);
  border-radius: 2rem;
  /* border: 1px solid var(--text-muted); */
  box-shadow: 0 2px 8px #0002;
  padding: 0.5rem 1.25rem;
  width: 100%;
  gap: 0.5rem;
}

.chat-input {
  flex: 1 1 auto;
  background: transparent;
  border: none;
  color: var(--text-primary);
  font-size: 1rem;
  padding: 0.5rem 0;
  outline: none;
  min-width: 0;
}
.chat-input:focus {
  outline: none;
}
.chat-input::placeholder {
  color: var(--text-placeholder);
  opacity: 1;
}

.chat-send-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-send-btn);
  border: none;
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  cursor: pointer;
  transition: opacity 0.15s, background 0.15s;
  margin-left: 0.25rem;
  padding: 0;
}
.chat-send-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.chat-send-btn:focus,
.chat-send-btn:hover:not(:disabled) {
  opacity: 0.8;
  background: var(--accent);
}
.chat-send-icon svg {
  display: block;
  width: 1.4rem;
  height: 1.4rem;
}

.chat-spinner {
  display: flex;
  align-items: center;
  justify-content: center;
}
.spinner-path {
  stroke: var(--icon-send);
}
.spinner-arc {
  stroke: var(--accent);
  animation: spinner-rotate 0.8s linear infinite;
}
@keyframes spinner-rotate {
  100% {
    transform: rotate(360deg);
    transform-origin: 10px 10px;
  }
}

.chat-input-error {
  color: #ff5c5c;
  font-size: 0.85rem;
  margin-top: 0.5rem;
  margin-bottom: 0;
  text-align: left;
}
.chat-input-loading {
  color: var(--accent);
  font-size: 0.85rem;
  margin-top: 0.5rem;
  margin-bottom: 0;
  text-align: left;
}

/* Botón de opciones a la izquierda */
.chat-options-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-send-btn);
  border: none;
  border-radius: 50%;
  width: 2.2rem;
  height: 2.2rem;
  margin-right: 0.5rem;
  cursor: pointer;
  transition: opacity 0.15s, background 0.15s;
  padding: 0;
}
.chat-options-btn:focus,
.chat-options-btn:hover {
  opacity: 0.8;
  background: var(--accent);
}
.chat-options-btn svg {
  display: block;
  width: 1.2rem;
  height: 1.2rem;
}

/* Mobile safe-area y responsividad */
@media (max-width: 600px) {
  .chat-input-bar {
    padding-bottom: env(safe-area-inset-bottom, 1.25rem);
  }
  .chat-input-pill {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
  }
  .chat-options-btn {
    width: 2rem;
    height: 2rem;
    margin-right: 0.3rem;
  }
}
</style>
