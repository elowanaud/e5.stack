/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  auth: {
    loginWithCredentials: typeof routes['auth.login_with_credentials']
    logout: typeof routes['auth.logout']
    password: {
      forgot: typeof routes['auth.password.forgot']
      reset: typeof routes['auth.password.reset']
    }
  }
  profile: {
    view: typeof routes['profile.view']
    update: typeof routes['profile.update']
    delete: typeof routes['profile.delete']
    password: typeof routes['profile.password']
  }
}
