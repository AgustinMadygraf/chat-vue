export interface UserIdentityProvider {
  getUserId(): Promise<string> | string
}
