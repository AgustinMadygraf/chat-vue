import { computed, ref, watch } from 'vue'

export type ChatStatus = 'idle' | 'loading' | 'success' | 'error'

export interface ChatInputProps {
  status: ChatStatus
  errorMessage: string | null
  sending: boolean
}

export type ChatInputEmit = (event: 'send', value: string) => void

export const useChatInput = (props: ChatInputProps, emit: ChatInputEmit) => {
  const input = ref('')

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

  return {
    input,
    canSubmit,
    onSend,
  }
}
