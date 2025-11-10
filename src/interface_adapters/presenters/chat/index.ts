/*
Path: src/interface_adapters/presenters/chat/index.ts
*/

import { createChatStore } from './createChatStore'
import { createChatStoreDependencies } from './dependencies'

const defaultDependencies = createChatStoreDependencies()

export const useChatStore = createChatStore(defaultDependencies)

export { createChatStore } from './createChatStore'
export type { ChatStoreDependencies, ChatStatus } from './createChatStore'
export { createChatStoreDependencies } from './dependencies'
