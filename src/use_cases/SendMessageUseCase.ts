/*
Path: src/use_cases/SendMessageUseCase.ts
*/

import { Message } from '../entities/Message'
import type { ChatGateway } from '../interface_adapters/gateways/ChatGateway'
import type { UserIdentityProvider } from './ports/UserIdentityProvider'

export type SendMessageStatus = 'success' | 'error'

export type SendMessageResponse = {
  messages: Message[]
  status: SendMessageStatus
  errorMessage?: string
}

export class SendMessageUseCase {
  constructor(
    private gateway: ChatGateway,
    private userIdentityProvider: UserIdentityProvider,
  ) {}

  async execute(messages: Message[], text: string): Promise<SendMessageResponse> {
    const history = [...messages, new Message('user', text)]

    const userId = await this.userIdentityProvider.getUserId()

    try {
      const data = await this.gateway.sendMessage(userId, text)
      const assistantTimestamp = data.timestamp ?? new Date().toISOString()
      history.push(new Message('assistant', data.text ?? '', assistantTimestamp))
      return { messages: history, status: 'success' }
    } catch (error) {
      const fallback = 'Error de conexión con el servidor.'
      history.push(new Message('assistant', fallback))
      const message = error instanceof Error ? error.message : fallback
      return {
        messages: history,
        status: 'error',
        errorMessage: message,
      }
    }
  }
}
