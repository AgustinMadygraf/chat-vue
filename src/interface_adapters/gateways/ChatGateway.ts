/*
Path: src/interface_adapters/gateways/ChatGateway.ts
*/

export interface ChatGateway {
  sendMessage(userId: string, text: string): Promise<{ text: string }>
}

export class HttpChatGateway implements ChatGateway {
  async sendMessage(userId: string, text: string): Promise<{ text: string }> {
    const response = await fetch('https://unhued-tashia-beforehand.ngrok-free.app/webchat/webhook', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, text }),
    })
    return await response.json()
  }
}
