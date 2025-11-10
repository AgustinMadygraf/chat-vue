import { defineStore } from 'pinia'
import type { Message } from '../../../entities/Message'
import type { ChatController } from '../../controllers/ChatController'
import type { SendMessageStatus } from '../../../use_cases/SendMessageUseCase'

export type ChatStatus = SendMessageStatus | 'idle' | 'loading'

export interface ChatStoreDependencies {
  chatController: ChatController
}

export const createChatStore = ({ chatController }: ChatStoreDependencies) =>
  defineStore('chat', {
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
