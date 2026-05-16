/* eslint-disable prettier/prettier */
/// <reference path="../manifest.d.ts" />

import type { ExtractBody, ExtractErrorResponse, ExtractQuery, ExtractQueryForGet, ExtractResponse } from '@tuyau/core/types'
import type { InferInput, SimpleError } from '@vinejs/vine/types'

export type ParamValue = string | number | bigint | boolean

export interface Registry {
  'auth.login_with_credentials': {
    methods: ["POST"]
    pattern: '/auth/login'
    types: {
      body: ExtractBody<InferInput<(typeof import('#src/features/user_management/authentication/controllers/login_with_credentials.controller').default)['payloadSchema']>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#src/features/user_management/authentication/controllers/login_with_credentials.controller').default)['payloadSchema']>>
      response: ExtractResponse<Awaited<ReturnType<import('#src/features/user_management/authentication/controllers/login_with_credentials.controller').default['handle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#src/features/user_management/authentication/controllers/login_with_credentials.controller').default['handle']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'auth.logout': {
    methods: ["DELETE"]
    pattern: '/auth/logout'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#src/features/user_management/authentication/controllers/logout.controller').default['handle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#src/features/user_management/authentication/controllers/logout.controller').default['handle']>>>
    }
  }
  'profile.view': {
    methods: ["GET","HEAD"]
    pattern: '/profile'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#src/features/user_management/profile/controllers/view.controller').default['handle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#src/features/user_management/profile/controllers/view.controller').default['handle']>>>
    }
  }
  'auth.forgot_password': {
    methods: ["POST"]
    pattern: '/auth/forgot-password'
    types: {
      body: ExtractBody<InferInput<(typeof import('#src/features/user_management/password/controllers/forgot_password.controller').default)['payloadSchema']>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#src/features/user_management/password/controllers/forgot_password.controller').default)['payloadSchema']>>
      response: ExtractResponse<Awaited<ReturnType<import('#src/features/user_management/password/controllers/forgot_password.controller').default['handle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#src/features/user_management/password/controllers/forgot_password.controller').default['handle']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'auth.reset_password': {
    methods: ["POST"]
    pattern: '/auth/reset-password'
    types: {
      body: ExtractBody<InferInput<(typeof import('#src/features/user_management/password/controllers/reset_password.controller').default)['payloadSchema']>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#src/features/user_management/password/controllers/reset_password.controller').default)['payloadSchema']>>
      response: ExtractResponse<Awaited<ReturnType<import('#src/features/user_management/password/controllers/reset_password.controller').default['handle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#src/features/user_management/password/controllers/reset_password.controller').default['handle']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
}
