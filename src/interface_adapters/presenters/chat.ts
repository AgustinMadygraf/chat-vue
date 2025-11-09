/*
Path: src/stores/chat.ts
*/

import { defineStore } from 'pinia'
import { Message } from '../../entities/Message'
import { HttpChatGateway } from '../gateways/ChatGateway'
import { ChatController } from '../controllers/ChatController'
import { LocalStorageUserIdentityProvider } from '../providers/LocalStorageUserIdentityProvider'
import { SendMessageUseCase } from '../../use_cases/SendMessageUseCase'
import type { SendMessageStatus } from '../../use_cases/SendMessageUseCase'

type ChatStatus = SendMessageStatus | 'idle' | 'loading'

const gateway = new HttpChatGateway()
const userIdentityProvider = new LocalStorageUserIdentityProvider(localStorage)
const sendMessageUseCase = new SendMessageUseCase(gateway, userIdentityProvider)
const chatController = new ChatController(sendMessageUseCase)

export const useChatStore = defineStore('chat', {
  state: () => ({
    messages: [] as Message[],
    status: 'idle' as ChatStatus,
    errorMessage: null as string | null,
  }),
  actions: {
    async sendMessage(text: string) {
      this.status = 'loading'
      this.errorMessage = null

      try {
        const response = await chatController.sendMessage(this.messages, text)
        this.messages = response.messages
        this.status = response.status
        if (response.status === 'error') {
          this.errorMessage = response.errorMessage ?? 'No se pudo enviar el mensaje.'
        }
      } catch (error) {
        this.status = 'error'
        this.errorMessage =
          error instanceof Error ? error.message : 'No se pudo enviar el mensaje.'
      } finally {
        if (this.status === 'success') {
          // Regresa a estado neutro tras reportar éxito
          setTimeout(() => {
            if (this.status === 'success') {
              this.status = 'idle'
            }
          }, 500)
        }
      }
    },
  },
})
