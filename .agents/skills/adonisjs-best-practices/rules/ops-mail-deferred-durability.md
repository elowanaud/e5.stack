---
title: "Do not mistake sendLater for durable or completed delivery"
impact: HIGH
impactDescription: "The default mail messenger uses an in-memory queue"
tags: ops, mail
---

# Do not mistake sendLater for durable or completed delivery

**Impact: HIGH**

## Rationale

The default mail messenger uses an in-memory queue. Awaiting sendLater confirms queuing through that messenger, not mailbox delivery, and pending messages disappear if the process terminates. Use a persistent messenger where delivery must survive restarts.

## Incorrect

```ts
await mail.sendLater(new WelcomeEmail(user))
return { delivered: true } // Neither durable nor delivered with default messenger.
```

## Correct

```ts
// Current v7 start/mail.ts; SendMail is the job from the official mail guide.
import mail from '@adonisjs/mail/services/main'
import SendMail from '#jobs/send_mail'

mail.setMessenger((mailer) => ({
  async queue({ message, views }) {
    await SendMail.dispatch({ mailerName: mailer.name, message, views })
  },
}))

// In the action, after commit, with a persistent adapter and live worker:
await mail.sendLater(new WelcomeEmail(user))
return { queued: true }
```

## Applicability and caveats

Messenger payload shown follows the current v7 mail guide; verify the installed mail package signature before integrating it.

This is the messenger/dispatch portion, not a complete worker: register start/mail as a preload and use the official SendMail job with sendCompiled, which bypasses the messenger to avoid recursive enqueueing. Its payload and views must be JSON-serializable. The current Adonis queue option requires core >=7.6; BullMQ is another documented persistent messenger option. Queue retries may duplicate mail, and provider acceptance is not proof of final delivery.

## Sources

- https://docs.adonisjs.com/guides/digging-deeper/mail.md
- https://docs.adonisjs.com/guides/digging-deeper/queues.md
- https://nodemailer.com/smtp
