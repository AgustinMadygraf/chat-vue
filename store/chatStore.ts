/*
Path: store/chatStore.ts
*/

export interface ChatStoreDeps {
  apiClient: { send: (msg: string) => Promise<void> };
  logger: { error: (err: unknown) => void };
}

export interface ChatState {
  messages: string[];
  status: 'idle' | 'loading' | 'success' | 'error';
  errorMessage: string | null;
}

export function createChatStore({ apiClient, logger }: ChatStoreDeps) {
  const state: ChatState = {
    messages: [],
    status: 'idle',
    errorMessage: null,
  };

  async function sendMessage(message: string) {
    state.status = 'loading';
    state.errorMessage = null;
    try {
      await apiClient.send(message);
      state.messages.push(message);
      state.status = 'success';
    } catch (e) {
      logger.error(e);
      state.status = 'error';
      state.errorMessage = 'No se pudo enviar el mensaje.';
    }
  }

  return {
    state,
    sendMessage,
    // ...agrega aquí otros métodos si es necesario...
  };
}
