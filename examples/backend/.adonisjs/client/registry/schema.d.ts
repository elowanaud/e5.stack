/* eslint-disable prettier/prettier */
/// <reference path="../manifest.d.ts" />

import type { ExtractBody, ExtractErrorResponse, ExtractQuery, ExtractQueryForGet, ExtractResponse } from '@tuyau/core/types'
import type { InferInput, SimpleError } from '@vinejs/vine/types'

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
    }
  }
}
