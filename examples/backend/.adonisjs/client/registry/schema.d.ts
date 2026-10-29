/* eslint-disable prettier/prettier */
/// <reference path="../manifest.d.ts" />

import type { ExtractBody, ExtractErrorResponse, ExtractQuery, ExtractQueryForGet, ExtractRawResponse, ExtractResponse, Method, PathWithRegistry, PatternsByMethod, RouteWithRegistry } from '@tuyau/core/types'
import type { InferInput, SimpleError } from '@vinejs/vine/types'
import type { routes } from './index.ts'

export type ParamValue = string | number | bigint | boolean

export interface Registry {
  'drive.fs.serve': {
    methods: ["GET","HEAD"]
    pattern: '/uploads/*'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { '*': ParamValue[] }
      query: {}
      response: unknown
      errorResponse: unknown
      rawResponse: ExtractRawResponse<unknown>
    }
  }
  'core.health.live': {
    methods: ["GET","HEAD"]
    pattern: '/core/health/live'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#src/features/core/health_checks/controllers/live.controller').default['handle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#src/features/core/health_checks/controllers/live.controller').default['handle']>>>
      rawResponse: ExtractRawResponse<Awaited<ReturnType<import('#src/features/core/health_checks/controllers/live.controller').default['handle']>>>
    }
  }
  'core.health.ready': {
    methods: ["GET","HEAD"]
    pattern: '/core/health/ready'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#src/features/core/health_checks/controllers/ready.controller').default['handle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#src/features/core/health_checks/controllers/ready.controller').default['handle']>>>
      rawResponse: ExtractRawResponse<Awaited<ReturnType<import('#src/features/core/health_checks/controllers/ready.controller').default['handle']>>>
    }
  }
  'frontend.auth.login_with_credentials': {
    methods: ["POST"]
    pattern: '/frontend/auth/login'
    types: {
      body: ExtractBody<InferInput<(typeof import('#src/features/frontend/auth/controllers/login_with_credentials.controller').default)['payloadSchema']>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#src/features/frontend/auth/controllers/login_with_credentials.controller').default)['payloadSchema']>>
      response: ExtractResponse<Awaited<ReturnType<import('#src/features/frontend/auth/controllers/login_with_credentials.controller').default['handle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#src/features/frontend/auth/controllers/login_with_credentials.controller').default['handle']>>> | { status: 422; response: { errors: SimpleError[] } }
      rawResponse: ExtractRawResponse<Awaited<ReturnType<import('#src/features/frontend/auth/controllers/login_with_credentials.controller').default['handle']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'frontend.auth.logout': {
    methods: ["DELETE"]
    pattern: '/frontend/auth/logout'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#src/features/frontend/auth/controllers/logout.controller').default['handle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#src/features/frontend/auth/controllers/logout.controller').default['handle']>>>
      rawResponse: ExtractRawResponse<Awaited<ReturnType<import('#src/features/frontend/auth/controllers/logout.controller').default['handle']>>>
    }
  }
  'frontend.oauth.redirect': {
    methods: ["GET","HEAD"]
    pattern: '/frontend/oauth/:provider/redirect'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { provider: ParamValue }
      query: ExtractQueryForGet<InferInput<(typeof import('@vinejs/vine').default)['create']>|InferInput<(typeof import('@vinejs/vine').default)['object']>|InferInput<(typeof import('@vinejs/vine').default)['enum']>>
      response: ExtractResponse<Awaited<ReturnType<import('#src/features/frontend/oauth/controllers/redirect.controller').default['handle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#src/features/frontend/oauth/controllers/redirect.controller').default['handle']>>> | { status: 422; response: { errors: SimpleError[] } }
      rawResponse: ExtractRawResponse<Awaited<ReturnType<import('#src/features/frontend/oauth/controllers/redirect.controller').default['handle']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'frontend.oauth.callback': {
    methods: ["GET","HEAD"]
    pattern: '/frontend/oauth/:provider/callback'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { provider: ParamValue }
      query: ExtractQueryForGet<InferInput<(typeof import('@vinejs/vine').default)['create']>|InferInput<(typeof import('@vinejs/vine').default)['object']>|InferInput<(typeof import('@vinejs/vine').default)['enum']>>
      response: ExtractResponse<Awaited<ReturnType<import('#src/features/frontend/oauth/controllers/callback.controller').default['handle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#src/features/frontend/oauth/controllers/callback.controller').default['handle']>>> | { status: 422; response: { errors: SimpleError[] } }
      rawResponse: ExtractRawResponse<Awaited<ReturnType<import('#src/features/frontend/oauth/controllers/callback.controller').default['handle']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'frontend.profile.view': {
    methods: ["GET","HEAD"]
    pattern: '/frontend/profile'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#src/features/frontend/profile/controllers/view.controller').default['handle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#src/features/frontend/profile/controllers/view.controller').default['handle']>>>
      rawResponse: ExtractRawResponse<Awaited<ReturnType<import('#src/features/frontend/profile/controllers/view.controller').default['handle']>>>
    }
  }
}

export namespace Route {
  export type Request<Name extends keyof typeof routes> = RouteWithRegistry.Request<typeof routes, Name>
  export type Response<Name extends keyof typeof routes> = RouteWithRegistry.Response<typeof routes, Name>
  export type Params<Name extends keyof typeof routes> = RouteWithRegistry.Params<typeof routes, Name>
  export type Body<Name extends keyof typeof routes> = RouteWithRegistry.Body<typeof routes, Name>
  export type Query<Name extends keyof typeof routes> = RouteWithRegistry.Query<typeof routes, Name>
  export type Error<Name extends keyof typeof routes> = RouteWithRegistry.Error<typeof routes, Name>
}

export namespace Path {
  export type Request<M extends Method, P extends PatternsByMethod<typeof routes, M>> =
    PathWithRegistry.Request<typeof routes, M, P>
  export type Response<M extends Method, P extends PatternsByMethod<typeof routes, M>> =
    PathWithRegistry.Response<typeof routes, M, P>
  export type Params<M extends Method, P extends PatternsByMethod<typeof routes, M>> =
    PathWithRegistry.Params<typeof routes, M, P>
  export type Body<M extends Method, P extends PatternsByMethod<typeof routes, M>> =
    PathWithRegistry.Body<typeof routes, M, P>
  export type Query<M extends Method, P extends PatternsByMethod<typeof routes, M>> =
    PathWithRegistry.Query<typeof routes, M, P>
  export type Error<M extends Method, P extends PatternsByMethod<typeof routes, M>> =
    PathWithRegistry.Error<typeof routes, M, P>
}
