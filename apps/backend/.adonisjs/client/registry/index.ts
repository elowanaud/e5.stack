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
