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
    }
  }
}
