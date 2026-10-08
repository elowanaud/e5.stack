import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'drive.fs.serve': { paramsTuple: [...ParamValue[]]; params: {'*': ParamValue[]} }
    'frontend.account_management.profile.view': { paramsTuple?: []; params?: {} }
    'frontend.account_management.profile.update': { paramsTuple?: []; params?: {} }
    'frontend.account_management.profile.delete': { paramsTuple?: []; params?: {} }
    'frontend.account_management.authentication.login': { paramsTuple?: []; params?: {} }
    'frontend.account_management.authentication.logout': { paramsTuple?: []; params?: {} }
    'frontend.account_management.password.forgot': { paramsTuple?: []; params?: {} }
    'frontend.account_management.password.reset': { paramsTuple?: []; params?: {} }
    'frontend.account_management.password.update': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'drive.fs.serve': { paramsTuple: [...ParamValue[]]; params: {'*': ParamValue[]} }
    'frontend.account_management.profile.view': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'drive.fs.serve': { paramsTuple: [...ParamValue[]]; params: {'*': ParamValue[]} }
    'frontend.account_management.profile.view': { paramsTuple?: []; params?: {} }
  }
  PUT: {
    'frontend.account_management.profile.update': { paramsTuple?: []; params?: {} }
    'frontend.account_management.password.update': { paramsTuple?: []; params?: {} }
  }
  DELETE: {
    'frontend.account_management.profile.delete': { paramsTuple?: []; params?: {} }
    'frontend.account_management.authentication.logout': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'frontend.account_management.authentication.login': { paramsTuple?: []; params?: {} }
    'frontend.account_management.password.forgot': { paramsTuple?: []; params?: {} }
    'frontend.account_management.password.reset': { paramsTuple?: []; params?: {} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}