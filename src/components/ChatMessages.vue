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
  <div class="py-3 bg-dark text-light">
    <template v-if="groupedMessages.length">
      <section v-for="group in groupedMessages" :key="group.key" class="mb-4">
        <p class="text-center text-muted text-uppercase small fw-semibold mb-3">
          {{ group.label }}
        </p>
        <ul class="list-unstyled mb-0">
          <li
            v-for="item in group.items"
            :key="item.id"
            class="mb-3"
          >
            <div class="d-flex align-items-end w-100"
              :class="item.message.role === 'user' ? 'justify-content-end' : 'justify-content-start'">
              <div v-if="item.message.role === 'assistant'" class="me-2">
                <i class="bi bi-robot fs-4 text-secondary"></i>
              </div>
              <div
                :class="[
                  'p-3',
                  'rounded-4',
                  'w-100',
                  'mx-auto',
                  item.message.role === 'user'
                    ? 'bg-dark text-light border border-secondary'
                    : 'bg-secondary text-light',
                  'mb-1',
                ]"
                style="max-width: 700px;"
              >
                {{ item.message.text }}
              </div>
              <div v-if="item.message.role === 'user'" class="ms-2">
                <i class="bi bi-person-circle fs-4 text-secondary"></i>
              </div>
            </div>
            <p
              class="small text-muted mb-0"
              :class="item.message.role === 'user' ? 'text-end' : 'text-start'"
            >
              {{ item.message.role === 'user' ? 'Tú' : 'Asistente' }} · {{ item.timeLabel }}
            </p>
          </li>
        </ul>
      </section>
    </template>
    <div
      v-else
      class="chat-hero-empty"
    >
      <i class="bi bi-chat-dots fs-1 mb-3"></i>
      <p class="chat-hero-title mb-2">¿Qué tienes en mente hoy?</p>
      <p class="chat-hero-desc small mb-0">ProfeBot está listo para ayudarte.</p>
    </div>
  </div>
</template>

<style scoped>
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
