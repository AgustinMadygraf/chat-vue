<!-- 
 Path:  src/components/ChatMessages.vue 
 -->
 
<script setup lang="ts">
import { defineProps } from 'vue'

type Message = {
  role: 'user' | 'assistant',
  text: string
}

defineProps<{ messages: Message[] }>();
</script>

<template>
  <ul class="list-group border-0 bg-transparent py-3">
    <li
      v-for="(msg, i) in messages"
      :key="i"
      class="list-group-item border-0 bg-transparent px-0"
    >
      <div
        class="d-flex align-items-end"
        :class="msg.role === 'user' ? 'justify-content-end' : 'justify-content-start'"
      >
        <div v-if="msg.role === 'assistant'" class="me-2">
          <i class="bi bi-robot fs-2 text-secondary"></i>
        </div>
        <div
          :class="[
            'p-3',
            'rounded-4',
            msg.role === 'user' ? 'bg-success text-white' : 'bg-light text-dark',
            'shadow-sm',
            'mb-1'
          ]"
          style="max-width: 70%;"
        >
          {{ msg.text }}
        </div>
        <div v-if="msg.role === 'user'" class="ms-2">
          <i class="bi bi-person-circle fs-2 text-secondary"></i>
        </div>
      </div>
    </li>
  </ul>
</template>
