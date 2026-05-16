import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'auth.login_with_credentials': { paramsTuple?: []; params?: {} }
    'auth.logout': { paramsTuple?: []; params?: {} }
    'profile.view': { paramsTuple?: []; params?: {} }
    'auth.forgot_password': { paramsTuple?: []; params?: {} }
    'auth.reset_password': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'auth.login_with_credentials': { paramsTuple?: []; params?: {} }
    'auth.forgot_password': { paramsTuple?: []; params?: {} }
    'auth.reset_password': { paramsTuple?: []; params?: {} }
  }
  DELETE: {
    'auth.logout': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'profile.view': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'profile.view': { paramsTuple?: []; params?: {} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}