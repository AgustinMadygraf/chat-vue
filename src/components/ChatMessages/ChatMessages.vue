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
          <transition-group name="chat-fade-slide" tag="ul" class="chat-list">
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
                  <span class="chat-meta-time">{{ item.timeLabel }}</span>
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
                  <span class="chat-meta-time">{{ item.timeLabel }}</span>
                </div>
                <div class="chat-actions-row chat-actions-row-user">
                  <button class="chat-action-btn" title="Editar"><svg width="16" height="16" viewBox="0 0 16 16"><rect x="3" y="3" width="10" height="10" rx="2" fill="currentColor" opacity="0.18"/></svg></button>
                  <button class="chat-action-btn" title="Copiar"><svg width="16" height="16" viewBox="0 0 16 16"><rect x="3" y="3" width="10" height="10" rx="2" fill="currentColor" opacity="0.18"/></svg></button>
                </div>
              </div>
            </li>
          </transition-group>
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

<script setup lang="ts">
import { useChatMessages } from './ChatMessages'
import type { Message } from '../../entities/Message'

const props = defineProps<{ messages: Message[] }>()
const { groupedMessages } = useChatMessages(props)
</script>

<style scoped src="./ChatMessages.css"></style>
