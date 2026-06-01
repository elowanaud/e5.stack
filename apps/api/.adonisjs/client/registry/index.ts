/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'user_management.profile.view': {
    methods: ["GET","HEAD"],
    pattern: '/user_management/profile',
    tokens: [{"old":"/user_management/profile","type":0,"val":"user_management","end":""},{"old":"/user_management/profile","type":0,"val":"profile","end":""}],
    types: placeholder as Registry['user_management.profile.view']['types'],
  },
  'user_management.profile.update': {
    methods: ["PUT"],
    pattern: '/user_management/profile',
    tokens: [{"old":"/user_management/profile","type":0,"val":"user_management","end":""},{"old":"/user_management/profile","type":0,"val":"profile","end":""}],
    types: placeholder as Registry['user_management.profile.update']['types'],
  },
  'user_management.profile.delete': {
    methods: ["DELETE"],
    pattern: '/user_management/profile',
    tokens: [{"old":"/user_management/profile","type":0,"val":"user_management","end":""},{"old":"/user_management/profile","type":0,"val":"profile","end":""}],
    types: placeholder as Registry['user_management.profile.delete']['types'],
  },
  'user_management.authentication.login': {
    methods: ["POST"],
    pattern: '/user_management/authentication/login',
    tokens: [{"old":"/user_management/authentication/login","type":0,"val":"user_management","end":""},{"old":"/user_management/authentication/login","type":0,"val":"authentication","end":""},{"old":"/user_management/authentication/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['user_management.authentication.login']['types'],
  },
  'user_management.authentication.logout': {
    methods: ["DELETE"],
    pattern: '/user_management/authentication/logout',
    tokens: [{"old":"/user_management/authentication/logout","type":0,"val":"user_management","end":""},{"old":"/user_management/authentication/logout","type":0,"val":"authentication","end":""},{"old":"/user_management/authentication/logout","type":0,"val":"logout","end":""}],
    types: placeholder as Registry['user_management.authentication.logout']['types'],
  },
  'user_management.password.forgot': {
    methods: ["POST"],
    pattern: '/user_management/password/forgot',
    tokens: [{"old":"/user_management/password/forgot","type":0,"val":"user_management","end":""},{"old":"/user_management/password/forgot","type":0,"val":"password","end":""},{"old":"/user_management/password/forgot","type":0,"val":"forgot","end":""}],
    types: placeholder as Registry['user_management.password.forgot']['types'],
  },
  'user_management.password.reset': {
    methods: ["POST"],
    pattern: '/user_management/password/reset',
    tokens: [{"old":"/user_management/password/reset","type":0,"val":"user_management","end":""},{"old":"/user_management/password/reset","type":0,"val":"password","end":""},{"old":"/user_management/password/reset","type":0,"val":"reset","end":""}],
    types: placeholder as Registry['user_management.password.reset']['types'],
  },
  'user_management.password.update': {
    methods: ["PUT"],
    pattern: '/user_management/password',
    tokens: [{"old":"/user_management/password","type":0,"val":"user_management","end":""},{"old":"/user_management/password","type":0,"val":"password","end":""}],
    types: placeholder as Registry['user_management.password.update']['types'],
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
