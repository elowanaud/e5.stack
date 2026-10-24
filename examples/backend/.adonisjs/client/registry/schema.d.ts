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
  'frontend.account_management.profile.view': {
    methods: ["GET","HEAD"]
    pattern: '/frontend/account-management/profile'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#src/features/frontend/account_management/profile/controllers/view.controller').default['handle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#src/features/frontend/account_management/profile/controllers/view.controller').default['handle']>>>
    }
  }
  'frontend.account_management.profile.update': {
    methods: ["PUT"]
    pattern: '/frontend/account-management/profile'
    types: {
      body: ExtractBody<InferInput<(typeof import('#src/features/frontend/account_management/profile/controllers/update.controller').default)['payloadSchema']>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#src/features/frontend/account_management/profile/controllers/update.controller').default)['payloadSchema']>>
      response: ExtractResponse<Awaited<ReturnType<import('#src/features/frontend/account_management/profile/controllers/update.controller').default['handle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#src/features/frontend/account_management/profile/controllers/update.controller').default['handle']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'frontend.account_management.profile.delete': {
    methods: ["DELETE"]
    pattern: '/frontend/account-management/profile'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#src/features/frontend/account_management/profile/controllers/delete.controller').default['handle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#src/features/frontend/account_management/profile/controllers/delete.controller').default['handle']>>>
    }
  }
  'frontend.account_management.authentication.login': {
    methods: ["POST"]
    pattern: '/frontend/account-management/authentication/login'
    types: {
      body: ExtractBody<InferInput<(typeof import('#src/features/frontend/account_management/authentication/controllers/login.controller').default)['payloadSchema']>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#src/features/frontend/account_management/authentication/controllers/login.controller').default)['payloadSchema']>>
      response: ExtractResponse<Awaited<ReturnType<import('#src/features/frontend/account_management/authentication/controllers/login.controller').default['handle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#src/features/frontend/account_management/authentication/controllers/login.controller').default['handle']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'frontend.account_management.authentication.logout': {
    methods: ["DELETE"]
    pattern: '/frontend/account-management/authentication/logout'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#src/features/frontend/account_management/authentication/controllers/logout.controller').default['handle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#src/features/frontend/account_management/authentication/controllers/logout.controller').default['handle']>>>
    }
  }
  'frontend.account_management.password.forgot': {
    methods: ["POST"]
    pattern: '/frontend/account-management/password/forgot'
    types: {
      body: ExtractBody<InferInput<(typeof import('#src/features/frontend/account_management/password/controllers/forgot.controller').default)['payloadSchema']>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#src/features/frontend/account_management/password/controllers/forgot.controller').default)['payloadSchema']>>
      response: ExtractResponse<Awaited<ReturnType<import('#src/features/frontend/account_management/password/controllers/forgot.controller').default['handle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#src/features/frontend/account_management/password/controllers/forgot.controller').default['handle']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'frontend.account_management.password.reset': {
    methods: ["POST"]
    pattern: '/frontend/account-management/password/reset'
    types: {
      body: ExtractBody<InferInput<(typeof import('#src/features/frontend/account_management/password/controllers/reset.controller').default)['payloadSchema']>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#src/features/frontend/account_management/password/controllers/reset.controller').default)['payloadSchema']>>
      response: ExtractResponse<Awaited<ReturnType<import('#src/features/frontend/account_management/password/controllers/reset.controller').default['handle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#src/features/frontend/account_management/password/controllers/reset.controller').default['handle']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'frontend.account_management.password.update': {
    methods: ["PUT"]
    pattern: '/frontend/account-management/password'
    types: {
      body: ExtractBody<InferInput<(typeof import('#src/features/frontend/account_management/password/controllers/update.controller').default)['payloadSchema']>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#src/features/frontend/account_management/password/controllers/update.controller').default)['payloadSchema']>>
      response: ExtractResponse<Awaited<ReturnType<import('#src/features/frontend/account_management/password/controllers/update.controller').default['handle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#src/features/frontend/account_management/password/controllers/update.controller').default['handle']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
}
