/*
Path: src/stores/chat.ts
*/

import { defineStore } from 'pinia'
import { Message } from '../../entities/Message'
import { HttpChatGateway } from '../gateways/ChatGateway'
import { ChatController } from '../controllers/ChatController'
import { LocalStorageUserIdentityProvider } from '../providers/LocalStorageUserIdentityProvider'
import { SendMessageUseCase } from '../../use_cases/SendMessageUseCase'

const gateway = new HttpChatGateway()
const userIdentityProvider = new LocalStorageUserIdentityProvider(localStorage)
const sendMessageUseCase = new SendMessageUseCase(gateway, userIdentityProvider)
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
