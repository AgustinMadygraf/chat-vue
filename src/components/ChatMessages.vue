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
            <span class="chat-group-label">
              <span class="chat-group-hairline"></span>
              {{ group.label }}
              <span class="chat-group-hairline"></span>
            </span>
          </div>
          <ul class="chat-list">
            <li
              v-for="(item, idx) in group.items"
              :key="item.id"
              class="chat-list-item"
              :class="[
                'role-' + item.message.role,
                idx > 0 && item.message.role === group.items[idx-1].message.role ? 'consecutive' : ''
              ]"
            >
              <div v-if="item.message.role === 'assistant'" class="chat-row chat-row-assistant">
                <div class="chat-block-assistant">
                  {{ item.message.text }}
                </div>
                <div class="chat-actions-row">
                  <!-- Acciones: copiar, like, dislike, regenerar, más -->
                  <button class="chat-action-btn" title="Copiar"><svg width="16" height="16" viewBox="0 0 16 16"><rect x="3" y="3" width="10" height="10" rx="2" fill="currentColor" opacity="0.18"/></svg></button>
                  <button class="chat-action-btn" title="Me gusta"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M8 13l-5-5 1.41-1.41L8 10.17l3.59-3.58L13 8z" fill="currentColor" opacity="0.18"/></svg></button>
                  <button class="chat-action-btn" title="No me gusta"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M8 3l5 5-1.41 1.41L8 5.83l-3.59 3.58L3 8z" fill="currentColor" opacity="0.18"/></svg></button>
                  <button class="chat-action-btn" title="Regenerar"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M8 2v2a4 4 0 1 1-4 4H2a6 6 0 1 0 6-6z" fill="currentColor" opacity="0.18"/></svg></button>
                  <button class="chat-action-btn" title="Más"><svg width="16" height="16" viewBox="0 0 16 16"><circle cx="8" cy="8" r="1.5" fill="currentColor" opacity="0.18"/><circle cx="3.5" cy="8" r="1.5" fill="currentColor" opacity="0.18"/><circle cx="12.5" cy="8" r="1.5" fill="currentColor" opacity="0.18"/></svg></button>
                </div>
              </div>
              <div v-else class="chat-row chat-row-user">
                <div class="chat-bubble-user">
                  {{ item.message.text }}
                </div>
                <div class="chat-actions-row chat-actions-row-user">
                  <button class="chat-action-btn" title="Editar"><svg width="16" height="16" viewBox="0 0 16 16"><rect x="3" y="3" width="10" height="10" rx="2" fill="currentColor" opacity="0.18"/></svg></button>
                  <button class="chat-action-btn" title="Copiar"><svg width="16" height="16" viewBox="0 0 16 16"><rect x="3" y="3" width="10" height="10" rx="2" fill="currentColor" opacity="0.18"/></svg></button>
                </div>
              </div>
            </li>
          </ul>
        </section>
      </template>
      <div v-else class="chat-hero-empty">
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

/* --- Layout y columna editorial --- */
.chat-messages-root {
  background: var(--bg-main);
  color: var(--text-primary);
  min-height: 100%;
  display: flex;
  justify-content: center;
  padding: 0;
}
.chat-messages-column {
  width: 100%;
  max-width: 720px;
  margin: 0 auto;
  padding: 32px 0 24px 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
}
@media (max-width: 700px) {
  .chat-messages-column {
    max-width: 100vw;
    padding: 16px 0 16px 0;
  }
}

/* --- Separador de fecha minimal --- */
.chat-group-label-row {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 24px 0 16px 0;
  position: relative;
}
.chat-group-label {
  display: flex;
  align-items: center;
  font-size: 0.68rem;
  font-weight: 500;
  color: var(--text-muted);
  background: none;
  padding: 0 0.7em;
  border-radius: 1em;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  z-index: 1;
  position: relative;
  gap: 0.7em;
}
.chat-group-hairline {
  display: inline-block;
  height: 1px;
  width: 32px;
  background: var(--text-muted);
  opacity: 0.10;
  border-radius: 1px;
}

/* --- Lista de mensajes --- */
.chat-list {
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
}
.chat-list-item {
  margin-bottom: 14px;
  transition: margin 0.2s;
}
.chat-list-item.consecutive {
  margin-top: -6px;
  margin-bottom: 10px;
}

/* --- Mensaje del asistente (bloque plano) --- */
.chat-row-assistant {
  width: 100%;
  display: flex;
  align-items: flex-start;
}
.chat-block-assistant {
  background: rgba(255,255,255,0.02);
  color: var(--text-primary);
  border-radius: 0.6rem;
  border: 1px solid rgba(255,255,255,0.06);
  box-shadow: 0 1px 4px #0001;
  padding: 1.1rem 1.3rem 1.1rem 1.3rem;
  font-size: 1.07rem;
  line-height: 1.6;
  width: 100%;
  word-break: break-word;
  transition: background 0.2s, border 0.2s;
}
.chat-list-item.consecutive .chat-block-assistant {
  border-top-left-radius: 0.25rem;
  margin-top: -2px;
}

/* --- Mensaje del usuario (cápsula) --- */
.chat-row-user {
  width: 100%;
  display: flex;
  align-items: flex-start;
}
.chat-bubble-user {
  background: rgba(255,255,255,0.06);
  color: #e6e6e6;
  border-radius: 1.2em;
  padding: 0.85em 1.25em;
  font-size: 1.07rem;
  line-height: 1.6;
  margin-left: 0;
  margin-right: auto;
  max-width: 100%;
  word-break: break-word;
  border: 1px solid rgba(255,255,255,0.08);
  box-shadow: 0 1px 2px #0001;
  transition: background 0.2s, border 0.2s;
}
.chat-list-item.consecutive .chat-bubble-user {
  border-top-left-radius: 0.5em;
  margin-top: -2px;
}

/* --- Fila de acciones contextual --- */
.chat-actions-row {
  display: flex;
  gap: 0.25em;
  margin-top: 8px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.18s;
}
.chat-list-item:hover .chat-actions-row,
.chat-list-item:focus-within .chat-actions-row {
  opacity: 1;
  pointer-events: auto;
}
.chat-actions-row-user {
  justify-content: flex-end;
}
.chat-action-btn {
  background: none;
  border: none;
  color: var(--text-muted);
  padding: 0.2em;
  border-radius: 0.3em;
  cursor: pointer;
  opacity: 0.7;
  transition: background 0.15s, opacity 0.15s;
  font-size: 1em;
}
.chat-action-btn:hover,
.chat-action-btn:focus {
  background: rgba(255,255,255,0.07);
  opacity: 1;
}

/* --- Empty state --- */
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
</style>
