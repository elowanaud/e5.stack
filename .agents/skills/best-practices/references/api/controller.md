# API Controller Best Practices

## Scope
- INCLUDE: AdonisJS API controllers that handle one HTTP action per controller class.
- INCLUDE: request authorization, payload validation, service delegation, response shaping, route access expectations, Tuyau contract impact, and controller-level tests.
- EXCLUDE: domain business rules, persistence workflows, external side effects, mail or queue behavior, and presenter internals.
- EXCLUDE: general API architecture, route design outside the controller contract, and service implementation details that should use a different reference.

## Workflow
- Step 1: Confirm the route middleware contract first so the controller can assume the expected guest or authenticated access boundary.
- Step 2: Authorize the request before protected work or permission-dependent reads happen.
- Step 3: Validate only the payload fields the action needs with Vine.
- Step 4: Delegate business logic, writes, external calls, emails, queue work, and multi-step workflows to a narrow service method.
- Step 5: Return a well-formatted presenter-shaped response, status-specific response, or intentional `null` for no-content contracts.

## Required Rules
- A controller class MUST represent one action only; do not add multiple action methods to the same controller.
- Controllers MUST stay focused on request orchestration: authorize, validate, delegate, and return.
- Controllers MUST authorize before any protected write, permission-dependent read, or side effect happens.
- Controllers MUST validate payload input before passing data into business logic or persistence boundaries.
- Controllers MUST delegate write work, external calls, mail, queue jobs, and domain decisions to services.
- Controllers MUST return presenter-shaped responses or `null` only when no-content is the intended contract.
- Controllers MUST rely on route middleware for guest-only and authenticated-only access decisions.
- New or changed controller behavior MUST have controller-level Japa tests for the happy path, access failure, validation failure where applicable, response shape, and side-effect boundary.
- Do not skip checking route and Tuyau impact when changing an action signature, route name, response shape, or access contract.

## Key Considerations
- Authorization: use Bouncer for action-level or resource-level authorization, and keep authorization failures explicit in tests so the access boundary is visible.
- Validation: use Vine as the request contract, validate only the fields the action needs, and avoid custom parsing inside the controller.
- Service delegation: let the controller collect input and call a narrow service method; the service owns domain rules, persistence, and side effects.
- Responses and presenters: use presenters to control public payload shape and avoid exposing raw models or ad hoc objects.
- Route and Tuyau expectations: keep route names, action signatures, middleware, and response contracts stable because Tuyau turns them into the typed client surface.
- Testing: controller tests should assert status codes, response shape, delegation boundaries, and that failed authorization or validation prevents side effects.
- Failure order: access checks should fail before protected work begins, and validation failures should fail before service or persistence calls receive untrusted payload data.

## Examples
**Do**
```ts
import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import vine from "@vinejs/vine";
import { createPostValidator } from '#features/posts/validators/create_post_validator'
import { PostPresenter } from '#features/posts/presenters/post_presenter'
import { PostsService } from '#features/posts/services/posts_service'

@inject()
export default class CreatePostController {
	constructor(private readonly postsService: PostsService) {}

	async handle({ auth, bouncer, request, response }: HttpContext) {
		await bouncer.authorize('createPost')
		const payload = await request.validateUsing(CreatePostController.payloadSchema)

		const post = await this.postsService.create({
			...payload,
			userId: auth.user!.id,
		})

		return response.created(PostPresenter.from(post))
	}

  static payloadSchema = vine.create({
    ...
  })
}
```

**Don't**
```ts
import type { HttpContext } from '@adonisjs/core/http'
import { Post } from '#features/posts/models/post'
import { Mail } from '@adonisjs/mail'

export default class PostsController {
	async store({ request, response }: HttpContext) {
		const post = await Post.create(request.all())
		await Mail.sendLater(/* ... */)

		return response.json(post)
	}

	async update({ request, response }: HttpContext) {
		const post = await Post.findOrFail(request.param('id'))
		post.merge(request.all())
		await post.save()

		return response.json(post)
	}
}
```

## Anti-Patterns
- Adding multiple actions to one controller class instead of keeping one controller per action.
- Mixing authorization, validation, persistence, mail, queue work, and response shaping into one controller block.
- Calling models, mailers, queues, or external APIs directly from the controller instead of delegating to a service.
- Returning raw models, `request.all()`, or ad hoc response objects instead of presenter-shaped responses.
- Hiding guest or authenticated access rules inside the controller when route middleware should express the route contract.
- Changing route names, action signatures, or response shapes without considering Tuyau client impact.
- Adding or changing controller behavior without controller-level tests for success, access failure, validation failure, and side-effect boundaries.
