# API Mail Reference

## Scope
* INCLUDE: AdonisJS `BaseMail` classes, mail data objects, message recipients, subjects, template data, and mail unit tests.
* INCLUDE: The boundary between queued delivery, mail construction, and Edge or MJML template rendering.
* EXCLUDE: Queue dispatch ownership, service workflow order, and template design language.
* EXCLUDE: Generic email marketing or SMTP setup guidance.

## Workflow
* Accept a typed data object in the constructor. Keep it private unless tests or subclasses need direct access.
* Set the subject as a class property or in `prepare()` when it depends on the data object.
* In `prepare()`, set recipients first, then choose the HTML view, then pass a small template data object.
* Convert non string display values, such as `URL`, before passing them to the template.
* Test the mail class with Japa by preparing the message and asserting recipient, subject, view name, and important template data.

## Required Rules
* Mail classes build messages. They must not decide whether a domain event happened or whether a job should be dispatched.
* Keep delivery side effects outside the mail class. The job or service calls `mail.send()`, while the mail class describes the message.
* Template data must be explicit. Do not pass large objects unless the template actually needs them.
* Keep recipients derived from trusted domain data, not raw request payload.
* Keep template names stable enough for tests to catch accidental renames.
* Do not edit generated view or registry output to make mail work. Fix the mail class, template name, or source import.

## Key Considerations
* A mail class is a contract between domain data and template data. Keep that contract small and typed.
* If a template needs a formatted link, format it in the mail class so the template stays simple.
* If mail content changes with locale or product state, prefer explicit constructor data over hidden global reads.
* Mail tests should assert the behavior users receive, not the full rendered HTML when that would be brittle.
* Queue jobs are usually the right owner for delivery so HTTP requests do not wait on SMTP.

## Examples
**Do**
```ts
export default class ResetInstructionMail extends BaseMail {
  subject = 'Reset your password'

  constructor(private params: ResetInstructionMailDTO) {
    super()
  }

  prepare() {
    this.message.to(this.params.user.email)
    this.message.htmlView('mail.reset_instruction', {
      user: this.params.user,
      resetUrl: this.params.resetUrl.toString(),
    })
  }
}
```

**Don't**
```ts
prepare() {
  const token = createToken(this.params.user)
  SendResetInstruction.dispatch({ user: this.params.user, token })
}
```

## Anti-Patterns
* Generating tokens, updating models, or dispatching jobs from `prepare()`.
* Passing raw request payload directly into template data.
* Hiding recipient selection inside a template.
* Snapshotting a full rendered email when focused assertions would be clearer.
* Treating a mail class as a place to document mail server setup or generated artifact handling.
