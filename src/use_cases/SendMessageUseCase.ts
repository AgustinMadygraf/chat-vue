/*
Path: src/use_cases/SendMessageUseCase.ts
*/

import { Message } from '../entities/Message'
import type { ChatGateway } from '../interface_adapters/gateways/ChatGateway'
import type { UserIdentityProvider } from './ports/UserIdentityProvider'

export class SendMessageUseCase {
  constructor(
    private gateway: ChatGateway,
    private userIdentityProvider: UserIdentityProvider,
  ) {}

  async execute(messages: Message[], text: string): Promise<Message[]> {
    messages.push(new Message('user', text))

    const userId = await this.userIdentityProvider.getUserId()

    try {
      const data = await this.gateway.sendMessage(userId, text)
      messages.push(new Message('assistant', data.text ?? ''))
    } catch {
      messages.push(new Message('assistant', 'Error de conexión con el servidor.'))
    }
    return messages
  }
}
