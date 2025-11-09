/*
Path: src/entities/Message.ts
*/

export type Role = 'user' | 'assistant'

export class Message {
  constructor(
    public role: Role,
    public text: string,
    public timestamp: string = new Date().toISOString(),
  ) {}
}
