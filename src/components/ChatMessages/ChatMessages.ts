import { computed } from 'vue'
import type { Message } from '../../entities/Message'

export interface ChatMessagesProps {
  messages: Message[]
}

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

export const useChatMessages = (props: ChatMessagesProps) => {
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

  return {
    groupedMessages,
  }
}
