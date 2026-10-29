import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'drive.fs.serve': { paramsTuple: [...ParamValue[]]; params: {'*': ParamValue[]} }
    'core.health.live': { paramsTuple?: []; params?: {} }
    'core.health.ready': { paramsTuple?: []; params?: {} }
    'frontend.auth.login_with_credentials': { paramsTuple?: []; params?: {} }
    'frontend.auth.logout': { paramsTuple?: []; params?: {} }
    'frontend.oauth.redirect': { paramsTuple: [ParamValue]; params: {'provider': ParamValue} }
    'frontend.oauth.callback': { paramsTuple: [ParamValue]; params: {'provider': ParamValue} }
    'frontend.profile.view': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'drive.fs.serve': { paramsTuple: [...ParamValue[]]; params: {'*': ParamValue[]} }
    'core.health.live': { paramsTuple?: []; params?: {} }
    'core.health.ready': { paramsTuple?: []; params?: {} }
    'frontend.oauth.redirect': { paramsTuple: [ParamValue]; params: {'provider': ParamValue} }
    'frontend.oauth.callback': { paramsTuple: [ParamValue]; params: {'provider': ParamValue} }
    'frontend.profile.view': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'drive.fs.serve': { paramsTuple: [...ParamValue[]]; params: {'*': ParamValue[]} }
    'core.health.live': { paramsTuple?: []; params?: {} }
    'core.health.ready': { paramsTuple?: []; params?: {} }
    'frontend.oauth.redirect': { paramsTuple: [ParamValue]; params: {'provider': ParamValue} }
    'frontend.oauth.callback': { paramsTuple: [ParamValue]; params: {'provider': ParamValue} }
    'frontend.profile.view': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'frontend.auth.login_with_credentials': { paramsTuple?: []; params?: {} }
  }
  DELETE: {
    'frontend.auth.logout': { paramsTuple?: []; params?: {} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}