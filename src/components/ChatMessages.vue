<!-- ChatMessages.vue: Muestra la lista de mensajes -->
<script setup lang="ts">
import { defineProps } from 'vue'

type Message = {
  role: 'user' | 'assistant',
  text: string
}

defineProps<{ messages: Message[] }>()
</script>

<template>
  <div>
    <div v-for="(msg, i) in messages" :key="i" class="my-3">
      <div :class="['d-flex', msg.role === 'user' ? 'justify-content-end' : 'justify-content-start']">
        <div :class="['p-3 rounded', msg.role === 'user' ? 'bg-primary text-white' : 'bg-light border']" style="max-width: 70%;">
          <span v-if="msg.role === 'user'">
            <i class="bi bi-person-circle me-2"></i>
          </span>
          <span v-else>
            <i class="bi bi-robot me-2"></i>
          </span>
          {{ msg.text }}
        </div>
      </div>
    </div>
  </div>
</template>
