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
    auth: {
      login: typeof routes['frontend.auth.login']
      register: typeof routes['frontend.auth.register']
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
