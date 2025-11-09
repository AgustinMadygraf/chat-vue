/*
Path: src/interface_adapters/controllers/ChatController.ts
*/

import { SendMessageUseCase } from '../../use_cases/SendMessageUseCase'
import { Message } from '../../entities/Message'
import type { SendMessageResponse } from '../../use_cases/SendMessageUseCase'

export class ChatController {
  constructor(private sendMessageUseCase: SendMessageUseCase) {}

  async sendMessage(messages: Message[], text: string): Promise<SendMessageResponse> {
    return await this.sendMessageUseCase.execute(messages, text)
  }
}
