import type { UserIdentityProvider } from '../../use_cases/ports/UserIdentityProvider'

type IdGenerator = () => string

const defaultGenerateId: IdGenerator = () => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  return Math.random().toString(36).slice(2)
}

export class LocalStorageUserIdentityProvider implements UserIdentityProvider {
  constructor(
    private storage: Storage,
    private generateId: IdGenerator = defaultGenerateId,
  ) {}

  async getUserId(): Promise<string> {
    const stored = this.storage.getItem('user_id')
    if (stored) {
      return stored
    }

    const newId = this.generateId()
    this.storage.setItem('user_id', newId)
    return newId
  }
}
