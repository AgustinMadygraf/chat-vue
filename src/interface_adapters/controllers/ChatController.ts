/*
Path: src/interface_adapters/controllers/ChatController.ts
*/

import { SendMessageUseCase } from '../../use_cases/SendMessageUseCase'
import { Message } from '../../entities/Message'

export class ChatController {
  constructor(private sendMessageUseCase: SendMessageUseCase) {}

  async sendMessage(messages: Message[], text: string): Promise<Message[]> {
    return await this.sendMessageUseCase.execute(messages, text)
  }
}
