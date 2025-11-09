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
    <template v-if="groupedMessages.length">
      <section v-for="group in groupedMessages" :key="group.key" class="chat-group">
        <p class="chat-group-label">
          {{ group.label }}
        </p>
        <ul class="chat-list">
          <li
            v-for="item in group.items"
            :key="item.id"
            class="chat-list-item"
          >
            <div
              class="chat-row"
              :class="item.message.role === 'user' ? 'chat-row-user' : 'chat-row-assistant'"
            >
              <div
                class="chat-bubble"
                :class="item.message.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-assistant'"
              >
                {{ item.message.text }}
              </div>
            </div>
            <p
              class="chat-meta"
              :class="item.message.role === 'user' ? 'chat-meta-user' : 'chat-meta-assistant'"
            >
              {{ item.message.role === 'user' ? 'Tú' : 'Asistente' }} · {{ item.timeLabel }}
            </p>
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
</template>

<style scoped>
.chat-messages-root {
  background: var(--bg-main);
  color: var(--text-primary);
  padding: 2.5rem 0 1.5rem 0;
  min-height: 100%;
}

.chat-group {
  margin-bottom: 2.5rem;
}

.chat-group-label {
  text-align: center;
  color: var(--text-muted);
  text-transform: uppercase;
  font-size: 0.75rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  letter-spacing: 0.08em;
}

.chat-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.chat-list-item {
  margin-bottom: 1.5rem;
}

.chat-row {
  display: flex;
  width: 100%;
}

.chat-row-user {
  justify-content: flex-end;
}

.chat-row-assistant {
  justify-content: flex-start;
}

.chat-bubble {
  padding: 1.15rem 1.25rem;
  border-radius: 1.25rem;
  font-size: 1rem;
  line-height: 1.6;
  max-width: 700px;
  width: 100%;
  box-shadow: 0 2px 8px #0002;
  word-break: break-word;
  transition: background 0.2s;
}

.chat-bubble-user {
  background: var(--bg-main);
  color: var(--text-primary);
  border: 1px solid var(--bg-placeholder);
  margin-left: auto;
}

.chat-bubble-assistant {
  background: var(--bg-placeholder);
  color: var(--text-primary);
  border: 1px solid transparent;
  margin-right: auto;
}

.chat-meta {
  font-size: 0.75rem;
  color: var(--text-muted);
  margin-top: 0.5rem;
  margin-bottom: 0;
  padding: 0 0.25rem;
}

.chat-meta-user {
  text-align: right;
}

.chat-meta-assistant {
  text-align: left;
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
</style>
