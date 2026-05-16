/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  auth: {
    loginWithCredentials: typeof routes['auth.login_with_credentials']
    logout: typeof routes['auth.logout']
    forgotPassword: typeof routes['auth.forgot_password']
    resetPassword: typeof routes['auth.reset_password']
  }
  profile: {
    view: typeof routes['profile.view']
  }
}
