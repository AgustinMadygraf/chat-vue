/*
Path: src/stores/chat.ts
*/

import { defineStore } from 'pinia'
import { Message } from '../../entities/Message'
import { HttpChatGateway } from '../gateways/ChatGateway'
import { SendMessageUseCase } from '../../use_cases/SendMessageUseCase'
import { ChatController } from '../controllers/ChatController'

const gateway = new HttpChatGateway()
const sendMessageUseCase = new SendMessageUseCase(gateway)
const chatController = new ChatController(sendMessageUseCase)

export const useChatStore = defineStore('chat', {
  state: () => ({
    messages: [] as Message[],
  }),
  actions: {
    async sendMessage(text: string) {
      this.messages = await chatController.sendMessage(this.messages, text)
    },
  },
})
