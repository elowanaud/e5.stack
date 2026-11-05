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
  'frontend.profile.sessions.list': {
    methods: ["GET","HEAD"],
    pattern: '/frontend/profile/sessions',
    tokens: [[0,"frontend"],[0,"profile"],[0,"sessions"]],
    types: placeholder as Registry['frontend.profile.sessions.list']['types'],
  },
  'frontend.profile.sessions.delete_others': {
    methods: ["DELETE"],
    pattern: '/frontend/profile/sessions/others',
    tokens: [[0,"frontend"],[0,"profile"],[0,"sessions"],[0,"others"]],
    types: placeholder as Registry['frontend.profile.sessions.delete_others']['types'],
  },
  'frontend.profile.sessions.delete': {
    methods: ["DELETE"],
    pattern: '/frontend/profile/sessions/:sessionId',
    tokens: [[0,"frontend"],[0,"profile"],[0,"sessions"],[1,"sessionId"]],
    types: placeholder as Registry['frontend.profile.sessions.delete']['types'],
  },
  'frontend.profile.view': {
    methods: ["GET","HEAD"],
    pattern: '/frontend/profile',
    tokens: [[0,"frontend"],[0,"profile"]],
    types: placeholder as Registry['frontend.profile.view']['types'],
  },
  'frontend.auth.login': {
    methods: ["POST"],
    pattern: '/frontend/auth/login',
    tokens: [[0,"frontend"],[0,"auth"],[0,"login"]],
    types: placeholder as Registry['frontend.auth.login']['types'],
  },
  'frontend.auth.register': {
    methods: ["POST"],
    pattern: '/frontend/auth/register',
    tokens: [[0,"frontend"],[0,"auth"],[0,"register"]],
    types: placeholder as Registry['frontend.auth.register']['types'],
  },
  'frontend.auth.forgot_password': {
    methods: ["POST"],
    pattern: '/frontend/auth/forgot-password',
    tokens: [[0,"frontend"],[0,"auth"],[0,"forgot-password"]],
    types: placeholder as Registry['frontend.auth.forgot_password']['types'],
  },
  'frontend.auth.reset_password': {
    methods: ["POST"],
    pattern: '/frontend/auth/reset-password',
    tokens: [[0,"frontend"],[0,"auth"],[0,"reset-password"]],
    types: placeholder as Registry['frontend.auth.reset_password']['types'],
  },
  'frontend.auth.logout': {
    methods: ["DELETE"],
    pattern: '/frontend/auth/logout',
    tokens: [[0,"frontend"],[0,"auth"],[0,"logout"]],
    types: placeholder as Registry['frontend.auth.logout']['types'],
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
