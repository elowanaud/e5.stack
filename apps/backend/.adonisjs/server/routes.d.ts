import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'drive.fs.serve': { paramsTuple: [...ParamValue[]]; params: {'*': ParamValue[]} }
    'core.health.live': { paramsTuple?: []; params?: {} }
    'core.health.ready': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'drive.fs.serve': { paramsTuple: [...ParamValue[]]; params: {'*': ParamValue[]} }
    'core.health.live': { paramsTuple?: []; params?: {} }
    'core.health.ready': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'drive.fs.serve': { paramsTuple: [...ParamValue[]]; params: {'*': ParamValue[]} }
    'core.health.live': { paramsTuple?: []; params?: {} }
    'core.health.ready': { paramsTuple?: []; params?: {} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}