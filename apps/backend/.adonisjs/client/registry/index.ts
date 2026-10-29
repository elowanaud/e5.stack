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
