/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  drive: {
    fs: {
      serve: typeof routes['drive.fs.serve']
    }
  }
  frontend: {
    auth: {
      loginWithCredentials: typeof routes['frontend.auth.login_with_credentials']
      logout: typeof routes['frontend.auth.logout']
    }
    oauth: {
      redirect: typeof routes['frontend.oauth.redirect']
      callback: typeof routes['frontend.oauth.callback']
    }
    profile: {
      view: typeof routes['frontend.profile.view']
    }
  }
}
