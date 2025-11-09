/*
Path: src/interface_adapters/gateways/ChatGateway.ts
*/

export interface ChatGateway {
  sendMessage(userId: string, text: string): Promise<{ text: string; timestamp?: string }>
}

function normalizeEndpoint(endpoint: string): string {
  return endpoint.replace(/\/+$/, '')
}

export class HttpChatGateway implements ChatGateway {
  private endpoint = normalizeEndpoint(import.meta.env.VITE_API_ENDPOINT)

  constructor() {
  }

  async sendMessage(
    userId: string,
    text: string,
  ): Promise<{ text: string; timestamp?: string }> {
    const response = await fetch(this.endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, text }),
    })
    return await response.json()
  }
}
