/*
Path: store/providers.ts
*/

import { createChatStore } from './chatStore';
import { apiClient } from '../services/apiClient';
import { logger } from '../services/logger';

export const chatStore = createChatStore({ apiClient, logger });
