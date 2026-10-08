/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  drive: {
    fs: {
      serve: typeof routes['drive.fs.serve']
    }
  }
  frontend: {
    accountManagement: {
      profile: {
        view: typeof routes['frontend.account_management.profile.view']
        update: typeof routes['frontend.account_management.profile.update']
        delete: typeof routes['frontend.account_management.profile.delete']
      }
      authentication: {
        login: typeof routes['frontend.account_management.authentication.login']
        logout: typeof routes['frontend.account_management.authentication.logout']
      }
      password: {
        forgot: typeof routes['frontend.account_management.password.forgot']
        reset: typeof routes['frontend.account_management.password.reset']
        update: typeof routes['frontend.account_management.password.update']
      }
    }
  }
}
