import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'drive.fs.serve': { paramsTuple: [...ParamValue[]]; params: {'*': ParamValue[]} }
    'core.health.live': { paramsTuple?: []; params?: {} }
    'core.health.ready': { paramsTuple?: []; params?: {} }
    'frontend.oauth.redirect': { paramsTuple: [ParamValue]; params: {'provider': ParamValue} }
    'frontend.oauth.callback': { paramsTuple: [ParamValue]; params: {'provider': ParamValue} }
    'frontend.profile.sessions.list': { paramsTuple?: []; params?: {} }
    'frontend.profile.sessions.delete_others': { paramsTuple?: []; params?: {} }
    'frontend.profile.sessions.delete': { paramsTuple: [ParamValue]; params: {'sessionId': ParamValue} }
    'frontend.profile.view': { paramsTuple?: []; params?: {} }
    'frontend.auth.login': { paramsTuple?: []; params?: {} }
    'frontend.auth.register': { paramsTuple?: []; params?: {} }
    'frontend.auth.forgot_password': { paramsTuple?: []; params?: {} }
    'frontend.auth.reset_password': { paramsTuple?: []; params?: {} }
    'frontend.auth.logout': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'drive.fs.serve': { paramsTuple: [...ParamValue[]]; params: {'*': ParamValue[]} }
    'core.health.live': { paramsTuple?: []; params?: {} }
    'core.health.ready': { paramsTuple?: []; params?: {} }
    'frontend.oauth.redirect': { paramsTuple: [ParamValue]; params: {'provider': ParamValue} }
    'frontend.oauth.callback': { paramsTuple: [ParamValue]; params: {'provider': ParamValue} }
    'frontend.profile.sessions.list': { paramsTuple?: []; params?: {} }
    'frontend.profile.view': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'drive.fs.serve': { paramsTuple: [...ParamValue[]]; params: {'*': ParamValue[]} }
    'core.health.live': { paramsTuple?: []; params?: {} }
    'core.health.ready': { paramsTuple?: []; params?: {} }
    'frontend.oauth.redirect': { paramsTuple: [ParamValue]; params: {'provider': ParamValue} }
    'frontend.oauth.callback': { paramsTuple: [ParamValue]; params: {'provider': ParamValue} }
    'frontend.profile.sessions.list': { paramsTuple?: []; params?: {} }
    'frontend.profile.view': { paramsTuple?: []; params?: {} }
  }
  DELETE: {
    'frontend.profile.sessions.delete_others': { paramsTuple?: []; params?: {} }
    'frontend.profile.sessions.delete': { paramsTuple: [ParamValue]; params: {'sessionId': ParamValue} }
    'frontend.auth.logout': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'frontend.auth.login': { paramsTuple?: []; params?: {} }
    'frontend.auth.register': { paramsTuple?: []; params?: {} }
    'frontend.auth.forgot_password': { paramsTuple?: []; params?: {} }
    'frontend.auth.reset_password': { paramsTuple?: []; params?: {} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}