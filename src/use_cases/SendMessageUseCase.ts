/*
Path: src/use_cases/SendMessageUseCase.ts
*/

import { Message } from '../entities/Message'
import type { ChatGateway } from '../interface_adapters/gateways/ChatGateway'

export class SendMessageUseCase {
  constructor(private gateway: ChatGateway) {}

  async execute(messages: Message[], text: string): Promise<Message[]> {
    messages.push(new Message('user', text))

    let userId = localStorage.getItem('user_id')
    if (!userId) {
      userId = crypto.randomUUID?.() ?? Math.random().toString(36).slice(2)
      localStorage.setItem('user_id', userId)
    }

    try {
      const data = await this.gateway.sendMessage(userId, text)
      messages.push(new Message('assistant', data.text ?? ''))
    } catch {
      messages.push(new Message('assistant', 'Error de conexión con el servidor.'))
    }
    return messages
  }
}
