import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'user_management.profile.view': { paramsTuple?: []; params?: {} }
    'user_management.profile.update': { paramsTuple?: []; params?: {} }
    'user_management.profile.delete': { paramsTuple?: []; params?: {} }
    'user_management.authentication.login': { paramsTuple?: []; params?: {} }
    'user_management.authentication.logout': { paramsTuple?: []; params?: {} }
    'user_management.password.forgot': { paramsTuple?: []; params?: {} }
    'user_management.password.reset': { paramsTuple?: []; params?: {} }
    'user_management.password.update': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'user_management.profile.view': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'user_management.profile.view': { paramsTuple?: []; params?: {} }
  }
  PUT: {
    'user_management.profile.update': { paramsTuple?: []; params?: {} }
    'user_management.password.update': { paramsTuple?: []; params?: {} }
  }
  DELETE: {
    'user_management.profile.delete': { paramsTuple?: []; params?: {} }
    'user_management.authentication.logout': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'user_management.authentication.login': { paramsTuple?: []; params?: {} }
    'user_management.password.forgot': { paramsTuple?: []; params?: {} }
    'user_management.password.reset': { paramsTuple?: []; params?: {} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}