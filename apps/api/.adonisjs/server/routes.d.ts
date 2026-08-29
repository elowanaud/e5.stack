import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'drive.fs.serve': { paramsTuple: [...ParamValue[]]; params: {'*': ParamValue[]} }
    'web.account_management.profile.view': { paramsTuple?: []; params?: {} }
    'web.account_management.profile.update': { paramsTuple?: []; params?: {} }
    'web.account_management.profile.delete': { paramsTuple?: []; params?: {} }
    'web.account_management.authentication.login': { paramsTuple?: []; params?: {} }
    'web.account_management.authentication.logout': { paramsTuple?: []; params?: {} }
    'web.account_management.password.forgot': { paramsTuple?: []; params?: {} }
    'web.account_management.password.reset': { paramsTuple?: []; params?: {} }
    'web.account_management.password.update': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'drive.fs.serve': { paramsTuple: [...ParamValue[]]; params: {'*': ParamValue[]} }
    'web.account_management.profile.view': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'drive.fs.serve': { paramsTuple: [...ParamValue[]]; params: {'*': ParamValue[]} }
    'web.account_management.profile.view': { paramsTuple?: []; params?: {} }
  }
  PUT: {
    'web.account_management.profile.update': { paramsTuple?: []; params?: {} }
    'web.account_management.password.update': { paramsTuple?: []; params?: {} }
  }
  DELETE: {
    'web.account_management.profile.delete': { paramsTuple?: []; params?: {} }
    'web.account_management.authentication.logout': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'web.account_management.authentication.login': { paramsTuple?: []; params?: {} }
    'web.account_management.password.forgot': { paramsTuple?: []; params?: {} }
    'web.account_management.password.reset': { paramsTuple?: []; params?: {} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}