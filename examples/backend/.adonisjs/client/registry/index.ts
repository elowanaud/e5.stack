/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

export type { Route, Path } from './schema.d.ts'

const placeholder: any = {}

const routes = {
  'drive.fs.serve': {
    methods: ["GET","HEAD"],
    pattern: '/uploads/*',
    tokens: [[0,"uploads"],[2,"*"]],
    types: placeholder as Registry['drive.fs.serve']['types'],
  },
  'core.health.live': {
    methods: ["GET","HEAD"],
    pattern: '/core/health/live',
    tokens: [[0,"core"],[0,"health"],[0,"live"]],
    types: placeholder as Registry['core.health.live']['types'],
  },
  'core.health.ready': {
    methods: ["GET","HEAD"],
    pattern: '/core/health/ready',
    tokens: [[0,"core"],[0,"health"],[0,"ready"]],
    types: placeholder as Registry['core.health.ready']['types'],
  },
  'frontend.auth.login_with_credentials': {
    methods: ["POST"],
    pattern: '/frontend/auth/login',
    tokens: [[0,"frontend"],[0,"auth"],[0,"login"]],
    types: placeholder as Registry['frontend.auth.login_with_credentials']['types'],
  },
  'frontend.auth.logout': {
    methods: ["DELETE"],
    pattern: '/frontend/auth/logout',
    tokens: [[0,"frontend"],[0,"auth"],[0,"logout"]],
    types: placeholder as Registry['frontend.auth.logout']['types'],
  },
  'frontend.oauth.redirect': {
    methods: ["GET","HEAD"],
    pattern: '/frontend/oauth/:provider/redirect',
    tokens: [[0,"frontend"],[0,"oauth"],[1,"provider"],[0,"redirect"]],
    types: placeholder as Registry['frontend.oauth.redirect']['types'],
  },
  'frontend.oauth.callback': {
    methods: ["GET","HEAD"],
    pattern: '/frontend/oauth/:provider/callback',
    tokens: [[0,"frontend"],[0,"oauth"],[1,"provider"],[0,"callback"]],
    types: placeholder as Registry['frontend.oauth.callback']['types'],
  },
  'frontend.profile.view': {
    methods: ["GET","HEAD"],
    pattern: '/frontend/profile',
    tokens: [[0,"frontend"],[0,"profile"]],
    types: placeholder as Registry['frontend.profile.view']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
