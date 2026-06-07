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
  'user_management.profile.view': {
    methods: ["GET","HEAD"],
    pattern: '/user-management/profile',
    tokens: [{"old":"/user-management/profile","type":0,"val":"user-management","end":""},{"old":"/user-management/profile","type":0,"val":"profile","end":""}],
    types: placeholder as Registry['user_management.profile.view']['types'],
  },
  'user_management.profile.update': {
    methods: ["PUT"],
    pattern: '/user-management/profile',
    tokens: [{"old":"/user-management/profile","type":0,"val":"user-management","end":""},{"old":"/user-management/profile","type":0,"val":"profile","end":""}],
    types: placeholder as Registry['user_management.profile.update']['types'],
  },
  'user_management.profile.delete': {
    methods: ["DELETE"],
    pattern: '/user-management/profile',
    tokens: [{"old":"/user-management/profile","type":0,"val":"user-management","end":""},{"old":"/user-management/profile","type":0,"val":"profile","end":""}],
    types: placeholder as Registry['user_management.profile.delete']['types'],
  },
  'user_management.authentication.login': {
    methods: ["POST"],
    pattern: '/user-management/authentication/login',
    tokens: [{"old":"/user-management/authentication/login","type":0,"val":"user-management","end":""},{"old":"/user-management/authentication/login","type":0,"val":"authentication","end":""},{"old":"/user-management/authentication/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['user_management.authentication.login']['types'],
  },
  'user_management.authentication.logout': {
    methods: ["DELETE"],
    pattern: '/user-management/authentication/logout',
    tokens: [{"old":"/user-management/authentication/logout","type":0,"val":"user-management","end":""},{"old":"/user-management/authentication/logout","type":0,"val":"authentication","end":""},{"old":"/user-management/authentication/logout","type":0,"val":"logout","end":""}],
    types: placeholder as Registry['user_management.authentication.logout']['types'],
  },
  'user_management.password.forgot': {
    methods: ["POST"],
    pattern: '/user-management/password/forgot',
    tokens: [{"old":"/user-management/password/forgot","type":0,"val":"user-management","end":""},{"old":"/user-management/password/forgot","type":0,"val":"password","end":""},{"old":"/user-management/password/forgot","type":0,"val":"forgot","end":""}],
    types: placeholder as Registry['user_management.password.forgot']['types'],
  },
  'user_management.password.reset': {
    methods: ["POST"],
    pattern: '/user-management/password/reset',
    tokens: [{"old":"/user-management/password/reset","type":0,"val":"user-management","end":""},{"old":"/user-management/password/reset","type":0,"val":"password","end":""},{"old":"/user-management/password/reset","type":0,"val":"reset","end":""}],
    types: placeholder as Registry['user_management.password.reset']['types'],
  },
  'user_management.password.update': {
    methods: ["PUT"],
    pattern: '/user-management/password',
    tokens: [{"old":"/user-management/password","type":0,"val":"user-management","end":""},{"old":"/user-management/password","type":0,"val":"password","end":""}],
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
