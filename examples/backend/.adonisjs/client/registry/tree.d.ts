/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  drive: {
    fs: {
      serve: typeof routes['drive.fs.serve']
    }
  }
  core: {
    health: {
      live: typeof routes['core.health.live']
      ready: typeof routes['core.health.ready']
    }
  }
  frontend: {
    oauth: {
      redirect: typeof routes['frontend.oauth.redirect']
      callback: typeof routes['frontend.oauth.callback']
    }
    profile: {
      sessions: {
        list: typeof routes['frontend.profile.sessions.list']
        deleteOthers: typeof routes['frontend.profile.sessions.delete_others']
        delete: typeof routes['frontend.profile.sessions.delete']
      }
      view: typeof routes['frontend.profile.view']
    }
    auth: {
      login: typeof routes['frontend.auth.login']
      register: typeof routes['frontend.auth.register']
      forgotPassword: typeof routes['frontend.auth.forgot_password']
      resetPassword: typeof routes['frontend.auth.reset_password']
      logout: typeof routes['frontend.auth.logout']
    }
  }
}
