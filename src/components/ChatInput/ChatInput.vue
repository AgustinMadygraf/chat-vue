<template>
  <form class="chat-input-bar" @submit.prevent="onSend">
    <div class="chat-input-pill">
      <button type="button" class="chat-options-btn" aria-label="Más opciones">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M10 6v8M6 10h8"
            stroke="var(--icon-neutral)"
            stroke-width="1.5"
            stroke-linecap="round"
          />
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

<script setup lang="ts">
import { toRefs } from 'vue'
import { useChatInput } from './ChatInput'

const props = defineProps<{
  status: 'idle' | 'loading' | 'success' | 'error'
  errorMessage: string | null
  sending: boolean
}>()
const emit = defineEmits<{
  (event: 'send', value: string): void
}>()

const { input, canSubmit, onSend } = useChatInput(props, emit)
const { status, errorMessage, sending } = toRefs(props)
</script>

<style scoped src="./ChatInput.css"></style>
