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
  'web.account_management.profile.view': {
    methods: ["GET","HEAD"],
    pattern: '/web/account-management/profile',
    tokens: [{"old":"/web/account-management/profile","type":0,"val":"web","end":""},{"old":"/web/account-management/profile","type":0,"val":"account-management","end":""},{"old":"/web/account-management/profile","type":0,"val":"profile","end":""}],
    types: placeholder as Registry['web.account_management.profile.view']['types'],
  },
  'web.account_management.profile.update': {
    methods: ["PUT"],
    pattern: '/web/account-management/profile',
    tokens: [{"old":"/web/account-management/profile","type":0,"val":"web","end":""},{"old":"/web/account-management/profile","type":0,"val":"account-management","end":""},{"old":"/web/account-management/profile","type":0,"val":"profile","end":""}],
    types: placeholder as Registry['web.account_management.profile.update']['types'],
  },
  'web.account_management.profile.delete': {
    methods: ["DELETE"],
    pattern: '/web/account-management/profile',
    tokens: [{"old":"/web/account-management/profile","type":0,"val":"web","end":""},{"old":"/web/account-management/profile","type":0,"val":"account-management","end":""},{"old":"/web/account-management/profile","type":0,"val":"profile","end":""}],
    types: placeholder as Registry['web.account_management.profile.delete']['types'],
  },
  'web.account_management.authentication.login': {
    methods: ["POST"],
    pattern: '/web/account-management/authentication/login',
    tokens: [{"old":"/web/account-management/authentication/login","type":0,"val":"web","end":""},{"old":"/web/account-management/authentication/login","type":0,"val":"account-management","end":""},{"old":"/web/account-management/authentication/login","type":0,"val":"authentication","end":""},{"old":"/web/account-management/authentication/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['web.account_management.authentication.login']['types'],
  },
  'web.account_management.authentication.logout': {
    methods: ["DELETE"],
    pattern: '/web/account-management/authentication/logout',
    tokens: [{"old":"/web/account-management/authentication/logout","type":0,"val":"web","end":""},{"old":"/web/account-management/authentication/logout","type":0,"val":"account-management","end":""},{"old":"/web/account-management/authentication/logout","type":0,"val":"authentication","end":""},{"old":"/web/account-management/authentication/logout","type":0,"val":"logout","end":""}],
    types: placeholder as Registry['web.account_management.authentication.logout']['types'],
  },
  'web.account_management.password.forgot': {
    methods: ["POST"],
    pattern: '/web/account-management/password/forgot',
    tokens: [{"old":"/web/account-management/password/forgot","type":0,"val":"web","end":""},{"old":"/web/account-management/password/forgot","type":0,"val":"account-management","end":""},{"old":"/web/account-management/password/forgot","type":0,"val":"password","end":""},{"old":"/web/account-management/password/forgot","type":0,"val":"forgot","end":""}],
    types: placeholder as Registry['web.account_management.password.forgot']['types'],
  },
  'web.account_management.password.reset': {
    methods: ["POST"],
    pattern: '/web/account-management/password/reset',
    tokens: [{"old":"/web/account-management/password/reset","type":0,"val":"web","end":""},{"old":"/web/account-management/password/reset","type":0,"val":"account-management","end":""},{"old":"/web/account-management/password/reset","type":0,"val":"password","end":""},{"old":"/web/account-management/password/reset","type":0,"val":"reset","end":""}],
    types: placeholder as Registry['web.account_management.password.reset']['types'],
  },
  'web.account_management.password.update': {
    methods: ["PUT"],
    pattern: '/web/account-management/password',
    tokens: [{"old":"/web/account-management/password","type":0,"val":"web","end":""},{"old":"/web/account-management/password","type":0,"val":"account-management","end":""},{"old":"/web/account-management/password","type":0,"val":"password","end":""}],
    types: placeholder as Registry['web.account_management.password.update']['types'],
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
