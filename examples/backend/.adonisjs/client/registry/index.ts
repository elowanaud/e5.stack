/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'drive.fs.serve': {
    methods: ["GET","HEAD"],
    pattern: '/uploads/*',
    tokens: [{"old":"/uploads/*","type":0,"val":"uploads","end":""},{"old":"/uploads/*","type":2,"val":"*","end":""}],
    types: placeholder as Registry['drive.fs.serve']['types'],
  },
  'core.health.live': {
    methods: ["GET","HEAD"],
    pattern: '/core/health/live',
    tokens: [{"old":"/core/health/live","type":0,"val":"core","end":""},{"old":"/core/health/live","type":0,"val":"health","end":""},{"old":"/core/health/live","type":0,"val":"live","end":""}],
    types: placeholder as Registry['core.health.live']['types'],
  },
  'core.health.ready': {
    methods: ["GET","HEAD"],
    pattern: '/core/health/ready',
    tokens: [{"old":"/core/health/ready","type":0,"val":"core","end":""},{"old":"/core/health/ready","type":0,"val":"health","end":""},{"old":"/core/health/ready","type":0,"val":"ready","end":""}],
    types: placeholder as Registry['core.health.ready']['types'],
  },
  'frontend.auth.login_with_credentials': {
    methods: ["POST"],
    pattern: '/frontend/auth/login',
    tokens: [{"old":"/frontend/auth/login","type":0,"val":"frontend","end":""},{"old":"/frontend/auth/login","type":0,"val":"auth","end":""},{"old":"/frontend/auth/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['frontend.auth.login_with_credentials']['types'],
  },
  'frontend.auth.logout': {
    methods: ["DELETE"],
    pattern: '/frontend/auth/logout',
    tokens: [{"old":"/frontend/auth/logout","type":0,"val":"frontend","end":""},{"old":"/frontend/auth/logout","type":0,"val":"auth","end":""},{"old":"/frontend/auth/logout","type":0,"val":"logout","end":""}],
    types: placeholder as Registry['frontend.auth.logout']['types'],
  },
  'frontend.oauth.redirect': {
    methods: ["GET","HEAD"],
    pattern: '/frontend/oauth/:provider/redirect',
    tokens: [{"old":"/frontend/oauth/:provider/redirect","type":0,"val":"frontend","end":""},{"old":"/frontend/oauth/:provider/redirect","type":0,"val":"oauth","end":""},{"old":"/frontend/oauth/:provider/redirect","type":1,"val":"provider","end":""},{"old":"/frontend/oauth/:provider/redirect","type":0,"val":"redirect","end":""}],
    types: placeholder as Registry['frontend.oauth.redirect']['types'],
  },
  'frontend.oauth.callback': {
    methods: ["GET","HEAD"],
    pattern: '/frontend/oauth/:provider/callback',
    tokens: [{"old":"/frontend/oauth/:provider/callback","type":0,"val":"frontend","end":""},{"old":"/frontend/oauth/:provider/callback","type":0,"val":"oauth","end":""},{"old":"/frontend/oauth/:provider/callback","type":1,"val":"provider","end":""},{"old":"/frontend/oauth/:provider/callback","type":0,"val":"callback","end":""}],
    types: placeholder as Registry['frontend.oauth.callback']['types'],
  },
  'frontend.profile.view': {
    methods: ["GET","HEAD"],
    pattern: '/frontend/profile',
    tokens: [{"old":"/frontend/profile","type":0,"val":"frontend","end":""},{"old":"/frontend/profile","type":0,"val":"profile","end":""}],
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
