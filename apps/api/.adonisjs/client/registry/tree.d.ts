/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  drive: {
    fs: {
      serve: typeof routes['drive.fs.serve']
    }
  }
  userManagement: {
    profile: {
      view: typeof routes['user_management.profile.view']
      update: typeof routes['user_management.profile.update']
      delete: typeof routes['user_management.profile.delete']
    }
    authentication: {
      login: typeof routes['user_management.authentication.login']
      logout: typeof routes['user_management.authentication.logout']
    }
    password: {
      forgot: typeof routes['user_management.password.forgot']
      reset: typeof routes['user_management.password.reset']
      update: typeof routes['user_management.password.update']
    }
  }
}
