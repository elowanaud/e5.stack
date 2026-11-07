---
title: "Resolve child records through an authorized parent"
impact: CRITICAL
tags: db, adonisjs-v7
---

# Resolve child records through an authorized parent

**Impact: CRITICAL**

**API baseline:** AdonisJS 7, Lucid 22.x; confirm installed Lucid APIs.

An existing ID is not evidence of ownership. Scope child reads and writes to an already-authorized parent or explicit tenant predicate before mutating data. This avoids updating another tenant's child merely because the caller knows its ID.

## Incorrect

```ts
const project = await Project.findOrFail(params.projectId)
const task = await Task.findOrFail(params.taskId)
task.merge(payload)
await task.save()
```

## Correct

```ts
import Project from '#models/project'

const project = await Project.query()
  .where('tenant_id', auth.user!.tenantId)
  .where('id', params.projectId)
  .firstOrFail()

const task = await project.related('tasks').query()
  .where('id', params.taskId)
  .firstOrFail()

task.merge(payload)
await task.save()
```

## Caveats

The example assumes tenant membership authorizes this action; invoke the existing Bouncer policy for finer permissions. Never accept `tenantId` or owner IDs from a generic writable payload. Relationship `onQuery` filters constrain reads, but current Lucid does not apply them to relationship create/save helpers; set trusted ownership values explicitly and back them with constraints.

## Official sources

- https://lucid.adonisjs.com/docs/has-many
- https://lucid.adonisjs.com/docs/relationships
- https://docs.adonisjs.com/guides/auth/authorization.md
