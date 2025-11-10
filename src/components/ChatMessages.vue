<!-- 
 Path:  src/components/ChatMessages.vue 
 -->
 
<script setup lang="ts">
import { computed } from 'vue'
import type { Message } from '../entities/Message'

const props = defineProps<{ messages: Message[] }>()

type MessageWithMeta = {
  id: string
  message: Message
  timeLabel: string
}

type MessageGroup = {
  key: string
  label: string
  items: MessageWithMeta[]
}

const dayFormatter = new Intl.DateTimeFormat('es-ES', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
})

const timeFormatter = new Intl.DateTimeFormat('es-ES', {
  hour: '2-digit',
  minute: '2-digit',
})

function toStartOfDayKey(date: Date) {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

function formatDayLabel(date: Date) {
  const today = new Date()
  const yesterday = new Date()
  yesterday.setDate(today.getDate() - 1)

  if (isSameDay(date, today)) {
    return 'Hoy'
  }

  if (isSameDay(date, yesterday)) {
    return 'Ayer'
  }

  return dayFormatter.format(date)
}

function parseTimestamp(timestamp: string) {
  const parsed = new Date(timestamp)
  if (Number.isNaN(parsed.getTime())) {
    return new Date()
  }
  return parsed
}

const groupedMessages = computed<MessageGroup[]>(() => {
  if (!props.messages.length) {
    return []
  }

  const sorted = [...props.messages].sort((a, b) => {
    const aTime = parseTimestamp(a.timestamp).getTime()
    const bTime = parseTimestamp(b.timestamp).getTime()
    return aTime - bTime
  })

  const groups = new Map<string, MessageGroup>()

  sorted.forEach((message, index) => {
    const timestamp = parseTimestamp(message.timestamp)
    const key = toStartOfDayKey(timestamp)
    const existing = groups.get(key)

    const nextItem: MessageWithMeta = {
      id: `${key}-${index}`,
      message,
      timeLabel: timeFormatter.format(timestamp),
    }

    if (existing) {
      existing.items.push(nextItem)
      return
    }

    groups.set(key, {
      key,
      label: formatDayLabel(timestamp),
      items: [nextItem],
    })
  })

  return Array.from(groups.values())
})
</script>

<template>
  <div class="chat-messages-root">
    <div class="chat-messages-column">
      <template v-if="groupedMessages.length">
        <section v-for="group in groupedMessages" :key="group.key" class="chat-group">
          <div class="chat-group-label-row">
            <span class="chat-group-label">{{ group.label }}</span>
          </div>
          <ul class="chat-list">
            <li
              v-for="item in group.items"
              :key="item.id"
              class="chat-list-item"
            >
              <div
                v-if="item.message.role === 'assistant'"
                class="chat-row chat-row-assistant"
              >
                <div class="chat-bubble chat-bubble-assistant">
                  {{ item.message.text }}
                </div>
                <!-- Acciones del mensaje (futuro) -->
                <div class="chat-actions"></div>
              </div>
              <div
                v-else
                class="chat-row chat-row-user"
              >
                <div class="chat-user-message">
                  {{ item.message.text }}
                </div>
              </div>
              <!-- Metadatos muy sutiles, sólo si quieres mantenerlos -->
              <!--
              <p
                class="chat-meta"
                :class="item.message.role === 'user' ? 'chat-meta-user' : 'chat-meta-assistant'"
              >
                {{ item.message.role === 'user' ? 'Tú' : 'Asistente' }} · {{ item.timeLabel }}
              </p>
              -->
            </li>
          </ul>
        </section>
      </template>
      <div v-else class="chat-hero-empty">
        <!-- Ícono SVG estilo OpenAI -->
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" class="mb-3" aria-hidden="true">
          <rect x="8" y="16" width="32" height="4" rx="2" fill="currentColor" opacity="0.15"/>
          <rect x="8" y="24" width="24" height="4" rx="2" fill="currentColor" opacity="0.15"/>
        </svg>
        <p class="chat-hero-title mb-2">¿Qué tienes en mente hoy?</p>
        <p class="chat-hero-desc">ProfeBot está listo para ayudarte.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chat-messages-root {
  background: var(--bg-main);
  color: var(--text-primary);
  padding: 2.5rem 0 1.5rem 0;
  min-height: 100%;
  display: flex;
  justify-content: center;
}

.chat-messages-column {
  width: 100%;
  max-width: 680px;
  margin: 0 auto;
  padding-left: 1rem;
  padding-right: 1rem;
  box-sizing: border-box;
}

@media (min-width: 600px) {
  .chat-messages-column {
    padding-left: 2rem;
    padding-right: 2rem;
  }
}

.chat-group {
  margin-bottom: 2.5rem;
}

.chat-group-label-row {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  position: relative;
}

.chat-group-label {
  font-size: 0.72rem;
  font-weight: 500;
  color: var(--text-muted);
  background: var(--bg-main);
  padding: 0 0.75em;
  border-radius: 1em;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  z-index: 1;
  position: relative;
  box-shadow: 0 0 0 2px var(--bg-main);
}

.chat-group-label-row::before {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  height: 1px;
  background: var(--bg-placeholder);
  opacity: 0.12;
  z-index: 0;
}

.chat-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.chat-list-item {
  margin-bottom: 2.2rem;
}

.chat-row {
  display: flex;
  width: 100%;
}

.chat-row-assistant {
  justify-content: flex-start;
}

.chat-row-user {
  justify-content: flex-start;
}

.chat-bubble-assistant {
  background: #26272b;
  color: var(--text-primary);
  border-radius: 0.7rem;
  padding: 1.05rem 1.15rem;
  font-size: 1.05rem;
  line-height: 1.7;
  box-shadow: 0 1px 4px #0001;
  border: 1px solid transparent;
  max-width: 100%;
  margin-right: auto;
  margin-left: 0;
  transition: background 0.2s;
  word-break: break-word;
}

@media (min-width: 600px) {
  .chat-bubble-assistant {
    font-size: 1.08rem;
    padding: 1.15rem 1.35rem;
  }
}

/* Usuario: texto plano, sin burbuja */
.chat-user-message {
  color: #e6e6e6;
  background: transparent;
  font-size: 1.05rem;
  line-height: 1.7;
  padding: 0.25rem 0.1rem 0.25rem 0.1rem;
  margin-left: 0;
  margin-right: auto;
  border-radius: 0.3rem;
  max-width: 100%;
  word-break: break-word;
}

/* Metadatos: ocultos por defecto, sólo para referencia */
.chat-meta {
  font-size: 0.7rem;
  color: var(--text-muted);
  margin-top: 0.25rem;
  margin-bottom: 0;
  padding: 0 0.25rem;
  opacity: 0.4;
  text-align: left;
  display: none;
}

.chat-hero-empty {
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: var(--text-muted);
  padding: 2rem 0;
}
.chat-hero-title {
  font-size: 2rem;
  font-weight: 600;
  color: var(--text-primary);
  letter-spacing: -0.01em;
}
.chat-hero-desc {
  color: var(--text-muted);
  font-size: 1rem;
}

/* Acciones del mensaje (futuro) */
.chat-actions {
  min-height: 1.5em;
  margin-top: 0.25em;
  /* Aquí irán los iconos en el futuro */
}
</style>
