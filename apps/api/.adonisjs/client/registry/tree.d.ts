/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  drive: {
    fs: {
      serve: typeof routes['drive.fs.serve']
    }
  }
  web: {
    accountManagement: {
      profile: {
        view: typeof routes['web.account_management.profile.view']
        update: typeof routes['web.account_management.profile.update']
        delete: typeof routes['web.account_management.profile.delete']
      }
      authentication: {
        login: typeof routes['web.account_management.authentication.login']
        logout: typeof routes['web.account_management.authentication.logout']
      }
      password: {
        forgot: typeof routes['web.account_management.password.forgot']
        reset: typeof routes['web.account_management.password.reset']
        update: typeof routes['web.account_management.password.update']
      }
    }
  }
}
