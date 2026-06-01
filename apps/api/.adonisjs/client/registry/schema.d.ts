/* eslint-disable prettier/prettier */
/// <reference path="../manifest.d.ts" />

import type { ExtractBody, ExtractErrorResponse, ExtractQuery, ExtractQueryForGet, ExtractResponse } from '@tuyau/core/types'
import type { InferInput, SimpleError } from '@vinejs/vine/types'

export type ParamValue = string | number | bigint | boolean

export interface Registry {
  'user_management.profile.view': {
    methods: ["GET","HEAD"]
    pattern: '/user_management/profile'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#src/features/user_management/profile/controllers/view.controller').default['handle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#src/features/user_management/profile/controllers/view.controller').default['handle']>>>
    }
  }
  'user_management.profile.update': {
    methods: ["PUT"]
    pattern: '/user_management/profile'
    types: {
      body: ExtractBody<InferInput<(typeof import('#src/features/user_management/profile/controllers/update.controller').default)['payloadSchema']>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#src/features/user_management/profile/controllers/update.controller').default)['payloadSchema']>>
      response: ExtractResponse<Awaited<ReturnType<import('#src/features/user_management/profile/controllers/update.controller').default['handle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#src/features/user_management/profile/controllers/update.controller').default['handle']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'user_management.profile.delete': {
    methods: ["DELETE"]
    pattern: '/user_management/profile'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#src/features/user_management/profile/controllers/delete.controller').default['handle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#src/features/user_management/profile/controllers/delete.controller').default['handle']>>>
    }
  }
  'user_management.authentication.login': {
    methods: ["POST"]
    pattern: '/user_management/authentication/login'
    types: {
      body: ExtractBody<InferInput<(typeof import('#src/features/user_management/authentication/controllers/login.controller').default)['payloadSchema']>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#src/features/user_management/authentication/controllers/login.controller').default)['payloadSchema']>>
      response: ExtractResponse<Awaited<ReturnType<import('#src/features/user_management/authentication/controllers/login.controller').default['handle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#src/features/user_management/authentication/controllers/login.controller').default['handle']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'user_management.authentication.logout': {
    methods: ["DELETE"]
    pattern: '/user_management/authentication/logout'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#src/features/user_management/authentication/controllers/logout.controller').default['handle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#src/features/user_management/authentication/controllers/logout.controller').default['handle']>>>
    }
  }
  'user_management.password.forgot': {
    methods: ["POST"]
    pattern: '/user_management/password/forgot'
    types: {
      body: ExtractBody<InferInput<(typeof import('#src/features/user_management/password/controllers/forgot.controller').default)['payloadSchema']>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#src/features/user_management/password/controllers/forgot.controller').default)['payloadSchema']>>
      response: ExtractResponse<Awaited<ReturnType<import('#src/features/user_management/password/controllers/forgot.controller').default['handle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#src/features/user_management/password/controllers/forgot.controller').default['handle']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'user_management.password.reset': {
    methods: ["POST"]
    pattern: '/user_management/password/reset'
    types: {
      body: ExtractBody<InferInput<(typeof import('#src/features/user_management/password/controllers/reset.controller').default)['payloadSchema']>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#src/features/user_management/password/controllers/reset.controller').default)['payloadSchema']>>
      response: ExtractResponse<Awaited<ReturnType<import('#src/features/user_management/password/controllers/reset.controller').default['handle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#src/features/user_management/password/controllers/reset.controller').default['handle']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'user_management.password.update': {
    methods: ["PUT"]
    pattern: '/user_management/password'
    types: {
      body: ExtractBody<InferInput<(typeof import('#src/features/user_management/password/controllers/update.controller').default)['payloadSchema']>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#src/features/user_management/password/controllers/update.controller').default)['payloadSchema']>>
      response: ExtractResponse<Awaited<ReturnType<import('#src/features/user_management/password/controllers/update.controller').default['handle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#src/features/user_management/password/controllers/update.controller').default['handle']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
}
