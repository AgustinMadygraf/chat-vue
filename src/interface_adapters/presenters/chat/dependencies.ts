import { HttpChatGateway } from '../../gateways/ChatGateway'
import { ChatController } from '../../controllers/ChatController'
import { LocalStorageUserIdentityProvider } from '../../providers/LocalStorageUserIdentityProvider'
import { SendMessageUseCase } from '../../../use_cases/SendMessageUseCase'
import type { ChatStoreDependencies } from './createChatStore'

export const createChatStoreDependencies = (): ChatStoreDependencies => {
  const gateway = new HttpChatGateway()
  const userIdentityProvider = new LocalStorageUserIdentityProvider(localStorage)
  const sendMessageUseCase = new SendMessageUseCase(gateway, userIdentityProvider)
  const chatController = new ChatController(sendMessageUseCase)

  return { chatController }
}
