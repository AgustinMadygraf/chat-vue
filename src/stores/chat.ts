import { defineStore } from 'pinia'

type Message = {
  role: 'user' | 'assistant'
  text: string
}

export const useChatStore = defineStore('chat', {
  state: () => ({
    messages: [] as Message[],
  }),
  actions: {
    async sendMessage(text: string) {
      console.info('Enviando mensaje:', text)
      this.messages.push({ role: 'user', text })

      // Obtener o generar user_id único y persistirlo en localStorage
      let user_id = localStorage.getItem('user_id')
      if (!user_id) {
        user_id = crypto.randomUUID()
        localStorage.setItem('user_id', user_id)
      }

      try {
        const res = await fetch('http://localhost:8443/webchat/webhook', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user_id, text }),
        })
        console.info('Respuesta recibida:', res)
        const data = await res.json()
        console.info('Datos del backend:', data)
        if (data && data.text) {
          this.messages.push({ role: 'assistant', text: data.text })
        } else {
          console.warn('Respuesta inesperada del backend:', data)
        }
      } catch (e) {
        console.error('Error al conectar con el backend:', e)
        this.messages.push({ role: 'assistant', text: 'Error de conexión con el servidor.' })
      }
    },
  },
})